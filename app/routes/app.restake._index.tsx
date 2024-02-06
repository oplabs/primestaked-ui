import { useState, useEffect } from 'react'
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  Config,
} from 'wagmi'
import { parseEther, parseAbi, formatEther } from 'viem'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { bigintToFloat, formatEth } from '~/utils/bigint'
import { contracts, assets, lrtOraclePriceMethod } from '~/utils/constants'
import { CaretDown } from '~/components/Icons'
import { Modal } from '~/components/Modal'
import { TokenChooser } from '~/components/TokenChooser'
import { getReferrerId } from '~/utils/useReferrerTracker'

import primeEthSVG from '~/assets/prime-eth-token.svg'

import {
  lrtOracleAbi,
  primeETHABI,
  lrtDepositPoolAbi,
  lrtConfigAbi,
} from '~/utils/abis'
import { LargeBox } from '~/components/LargeBox'

export default function Index() {
  const { openConnectModal } = useConnectModal()
  const [isOpen, setIsOpen] = useState(false)
  const [tokenChooserIsOpen, setTokenChooserIsOpen] = useState(false)
  /* stores token + connected address approvals issued this session.
   * Required for showing a disabled approval button after the approve
   * transaction is done.
   */
  const [approves, setApproves] = useState([])
  const contractWrite = useWriteContract()
  const deposit = useWriteContract()
  const { isConnected, address } = useAccount()

  const [asset, setAsset] = useState<keyof typeof contracts>(assets[0].symbol)
  const activeAsset = assets.find((a) => a.symbol === asset)
  const [depositAmount, setDepositAmount] = useState('')
  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'
  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: parseAbi([
          `function ${lrtOraclePriceMethod}() view returns (uint256)`,
        ]),
        address: contracts.lrtOracle,
        functionName: lrtOraclePriceMethod,
      },
      {
        abi: primeETHABI,
        address: contracts.primeETH,
        functionName: 'balanceOf',
        args: [connectedAddress],
      },
      {
        abi: lrtOracleAbi,
        address: contracts.lrtOracle,
        functionName: 'getAssetPrice',
        args: [contracts[asset]],
      },
      {
        abi: lrtConfigAbi,
        address: contracts.lrtConfig,
        functionName: 'depositLimitByAsset',
        args: [contracts[asset]],
      },
      {
        abi: primeETHABI,
        address: contracts[asset],
        functionName: 'allowance',
        args: [connectedAddress, contracts.lrtDepositPool],
      },
      {
        abi: primeETHABI,
        address: contracts[asset],
        functionName: 'balanceOf',
        args: [connectedAddress],
      },
      {
        abi: lrtDepositPoolAbi,
        address: contracts.lrtDepositPool,
        functionName: 'getTotalAssetDeposits',
        args: [contracts[asset]],
      },
    ],
  })

  // console.log(data)

  const txReceipt = useWaitForTransactionReceipt({ hash: contractWrite.data })

  /* refetch data on any transaction succeeding. Important to refresh data
   * and to enable Stake button (Modal or in-page) after approve succeeds.
   */
  useEffect(() => {
    if (contractWrite.status === 'success' && txReceipt.data) {
      refetch()
      /* It can happen that a wallet provider (say Metamask) will already
       * see a transaction processed and approval updated on a contract
       * while another provider (e.g. Infura) will still not have seen the
       * latest data. As a workaround to 2 more re-fetches 3 & 10 seconds later.
       */
      setTimeout(refetch, 3000)
      setTimeout(refetch, 10000)
    }
  }, [contractWrite.status, txReceipt.data, refetch])

  useEffect(() => {
    if (contractWrite.status === 'pending') {
      setIsOpen(true)
    }
  }, [contractWrite.status, txReceipt.data, refetch])

  let rsETHPrice = 0n
  let lrtBalance = 0n
  let rawAssetPrice = 0n
  let depositLimit = 0n
  let assetAllowance = 0n
  let assetBalance = 0n
  let assetPrice = 0n
  let depositAmountBI = 0n
  let youWillGet = 0n
  let assetDeposited = 0n

  if (data) {
    try {
      rsETHPrice = data[0]?.result || 10n ** 18n
      // if contract not connected balance is 0
      lrtBalance = data[1].result
      rawAssetPrice = data[2].result || 10n ** 18n
      depositLimit = data[3].result
      assetAllowance = isConnected ? data[4].result : 0n
      assetBalance = isConnected ? data[5].result : 0n
      assetDeposited = isConnected ? data[6].result : 0n
      assetPrice = (10n ** 18n * rsETHPrice) / rawAssetPrice
    } catch (e) {
      /* Ignore */
    }
    try {
      // remove commas from input
      depositAmountBI = parseEther(depositAmount.replaceAll(',', ''))
      youWillGet = (rawAssetPrice * depositAmountBI) / rsETHPrice
    } catch (e) {
      console.log(e)
      console.log(data)
      /* Ignore */
    }
  }

  // console.log({
  //   connectedAddress,
  //   rsETHPrice,
  //   lrtBalance,
  //   rawAssetPrice,
  //   depositLimit,
  //   assetAllowance,
  //   assetBalance,
  //   assetPrice,
  //   depositAmountBI,
  //   youWillGet,
  //   assetDeposited
  // })

  const assetApprovedThisSession = approves.includes(`${address}:${asset}`)

  let stakeBtnDisabled = false
  let approveBtnDisabled = true
  let stakeBtnText = 'Stake'
  let approveBtnText = `${asset} approved`
  // show approve button if we can stake and asset has been approved this session
  let approveBtnShow = assetApprovedThisSession
  if (!isConnected) {
    stakeBtnText = 'Connect wallet'
    approveBtnShow = false
  } else if (!depositAmountBI || depositAmountBI <= 0n) {
    stakeBtnText = 'Enter an amount'
    stakeBtnDisabled = true
    approveBtnShow = false
  } else if (depositAmountBI > assetBalance) {
    stakeBtnText = 'Not enough balance'
    stakeBtnDisabled = true
    approveBtnShow = false
  } else if (depositAmountBI > assetAllowance) {
    stakeBtnText = `Stake`
    approveBtnText = `Approve ${asset}`
    stakeBtnDisabled = true
    approveBtnDisabled = false
    approveBtnShow = true
  }

  const doStake = () => {
    if (stakeBtnDisabled) {
      return
    }
    if (!isConnected) {
      openConnectModal?.()
    } else if (depositAmountBI <= assetAllowance) {
      // reset stake form
      setDepositAmount('')
      contractWrite.writeContract({
        abi: lrtDepositPoolAbi,
        address: contracts.lrtDepositPool,
        functionName: 'depositAsset',
        args: [
          contracts[asset],
          parseEther(depositAmount),
          0n,
          getReferrerId(),
        ],
      })
    }
  }

  let modalTitle = 'Transaction in process'
  let modalStatus = 'loading'
  let modalDescription
  let modalButtonText
  let modalButtonHref
  let modalButtonAction
  // button not disabled except if action is stake and stake is disabled
  const modalButtonDisabled = modalButtonAction ? stakeBtnDisabled : false
  if (contractWrite.status === 'pending') {
    modalTitle = 'Please check your wallet'
  } else if (contractWrite.status === 'success' && txReceipt.data) {
    modalTitle = 'Transaction successful'
    if (contractWrite.variables.functionName == 'approve') {
      modalButtonText = 'Stake'
      modalButtonHref = null
      modalButtonAction = doStake
    }
    // else depositAssets was called
    else {
      modalButtonText = 'View Dashboard'
      modalButtonHref = '/app/dashboard'
      modalButtonAction = null
    }
    modalStatus = 'success'
  } else if (contractWrite.error) {
    modalTitle = 'Transaction failed'
    modalStatus = 'error'

    modalDescription =
      contractWrite.error.shortMessage || contractWrite.error.message
  }

  const pctOfLimit = Math.round(
    (bigintToFloat(assetDeposited) / bigintToFloat(depositLimit)) * 100,
  )

  return (
    <>
      <Modal
        status={modalStatus}
        description={modalDescription}
        txLink={
          contractWrite.data
            ? `https://etherscan.io/tx/${contractWrite.data}`
            : ''
        }
        title={modalTitle}
        buttonText={modalButtonText}
        buttonHref={modalButtonHref}
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false)
          refetch()
        }}
        modalButtonAction={modalButtonAction}
        modalButtonDisabled={modalButtonDisabled}
      />
      <TokenChooser
        isOpen={tokenChooserIsOpen}
        onChange={(newAsset) => {
          setDepositAmount('')
          setAsset(newAsset)
        }}
        setIsOpen={() => {
          setTokenChooserIsOpen(false)
        }}
      />
      <LargeBox title="Restake LST">
        <div className="p-6 flex flex-col gap-3 bg-white border-b border-gray-border relative">
          <div className="flex items-center justify-between">
            <button
              className="border border-gray-border bg-off-white hover:bg-white text-lg font-medium pl-1 pr-3 py-1 rounded-full flex items-center gap-2 shadow-[0px_8px_10px_0px_#00000012]                "
              onClick={() => setTokenChooserIsOpen(true)}
            >
              <img
                src={activeAsset.src}
                alt={asset}
                className="w-[28px] h-[28px]"
              />
              {asset}
              <div className="text-red-500 pr-1">
                <CaretDown />
              </div>
            </button>

            <div className="text-sm text-gray-500 flex items-center gap-3">
              {`Balance: ${formatEth(assetBalance)}`}
              <button
                onClick={() => {
                  if (assetBalance) {
                    setDepositAmount(formatEther(assetBalance))
                  }
                }}
                className="border border-gray-500 px-1 text-xs rounded-full hover:bg-gray-500 hover:text-white"
              >
                <span className="inline-block -translate-y-px">max</span>
              </button>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <input
              type="text"
              className="flex-1 text-2xl font-bold outline-none w-full"
              placeholder="0"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.currentTarget.value)}
            />
            {/* <div className="text-sm text-gray-500">$-</div> */}
          </div>
          {/*
          <div className="rounded-full w-12 h-12 border bg-gray-bg1 absolute -bottom-px border-[#B5BECA] left-1/2 -translate-x-1/2 translate-y-1/2 text-red-500 flex items-center justify-center">
            <ArrowDown />
          </div>
          */}
        </div>
        <div className="p-6 flex flex-col gap-6 border-b border-gray-border">
          <div className="flex items-center justify-between">
            <div className="border border-gray-border bg-off-white text-lg font-medium pl-1 pr-3 py-1 rounded-full flex items-center gap-2">
              <img src={primeEthSVG} alt="primeETH" />
              primeETH
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-3">
              {`Balance: ${formatEth(lrtBalance)}`}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex-1 text-2xl font-bold">
              {formatEth(youWillGet || '0')}
            </div>
            {/* <div className="text-sm text-gray-500">$-</div> */}
          </div>
        </div>
        <div className="p-6 flex flex-col gap-6 border-b border-gray-border">
          <div className="flex items-end justify-between">
            <div className="text-sm text-gray-500">Exchange Rate:</div>
            <div className="text-sm">
              {`1 primeETH = ${formatEth(assetPrice)} ${asset}`}
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-6 bg-white rounded-b-3xl border-b border-gray-border mb-[-1px]">
          {approveBtnShow && (
            <button
              className={`${
                approveBtnDisabled ? 'btn-disabled' : 'btn'
              } px-3 py-4 text-xl`}
              onClick={() => {
                if (approveBtnDisabled) {
                  return
                }
                if (depositAmountBI > assetAllowance) {
                  contractWrite.writeContract({
                    abi: primeETHABI,
                    address: contracts[asset],
                    functionName: 'approve',
                    args: [contracts.lrtDepositPool, depositAmountBI],
                  })
                  setApproves([...approves, `${address}:${asset}`])
                }
              }}
            >
              {approveBtnText}
            </button>
          )}
          <button
            className={`${
              stakeBtnDisabled ? 'btn-disabled' : 'btn'
            } px-3 py-4 text-xl`}
            onClick={() => doStake()}
          >
            {stakeBtnText}
          </button>
        </div>
        {/*
        <div className="p-6 bg-white rounded-b-3xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <div>Restaking limit</div>
            <div className="text-gray-500">
              {`${formatEth(assetDeposited)} / ${formatEth(
                depositLimit,
              )} ${asset}`}
            </div>
          </div>
          <div className="rounded-full bg-gray-500/20">
            <div
              className="rounded-full bg-red-500 h-[8px]"
              style={{ width: `${pctOfLimit}%` }}
            />
          </div>
        </div>
        */}
      </LargeBox>
    </>
  )
}
