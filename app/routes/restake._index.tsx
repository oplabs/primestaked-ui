import { useState, useEffect } from 'react'
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt
} from 'wagmi'
import { zeroAddress, parseEther } from 'viem'

import { formatEth } from '~/utils/bigint'
import { contracts, assets } from '~/utils/constants'
import { ArrowDown } from '~/components/Icons'
import { Modal } from '~/components/Modal'

import primeEthSVG from '~/assets/prime-eth-token.svg'

import {
  lrtOracleAbi,
  rsETHABI,
  lrtDepositPoolAbi,
  lrtConfigAbi
} from '~/utils/abis'

export default function Index() {
  const [isOpen, setIsOpen] = useState(false)
  const deposit = useWriteContract()
  const { address } = useAccount()

  const [asset, setAsset] = useState<keyof typeof contracts>(assets[0].symbol)
  const [depositAmount, setDepositAmount] = useState('')
  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: lrtOracleAbi,
        address: contracts.lrtOracle,
        functionName: 'rsETHPrice'
      },
      {
        abi: rsETHABI,
        address: contracts.rsETH,
        functionName: 'balanceOf',
        args: [address || zeroAddress]
      },
      {
        abi: lrtOracleAbi,
        address: contracts.lrtOracle,
        functionName: 'getAssetPrice',
        args: [contracts[asset]]
      },
      {
        abi: lrtConfigAbi,
        address: contracts.lrtConfig,
        functionName: 'depositLimitByAsset',
        args: [contracts[asset]]
      },
      {
        abi: rsETHABI,
        address: contracts[asset],
        functionName: 'allowance',
        args: [address || zeroAddress, contracts.lrtDepositPool]
      },
      {
        abi: rsETHABI,
        address: contracts[asset],
        functionName: 'balanceOf',
        args: [address || zeroAddress]
      }
    ]
  })

  const txReceipt = useWaitForTransactionReceipt({ hash: deposit.data })

  useEffect(() => {
    if (deposit.status === 'pending') {
      setIsOpen(true)
    } else if (deposit.status === 'error') {
      setIsOpen(false)
    }
  }, [deposit.status, txReceipt.data, refetch])

  let rsETHPrice = 0n

  let assetAllowance = 0n
  let assetBalance = 0n
  let assetPrice = 0n
  let rawAssetPrice = 0n
  let lrtBalance = 0n
  let depositLimit = 0n

  if (data) {
    rsETHPrice = data[0].result
    lrtBalance = data[1].result
    rawAssetPrice = data[2].result
    depositLimit = data[3].result

    assetAllowance = data[4].result
    assetBalance = data[5].result
    assetPrice = (10n ** 18n * rsETHPrice) / rawAssetPrice
  }

  let depositAmountBI = 0n
  let youWillGet = 0n
  try {
    depositAmountBI = parseEther(depositAmount)
    youWillGet = (rawAssetPrice * depositAmountBI) / rsETHPrice
  } catch (e) {
    /* Ignore */
  }

  let btnDisabled = false
  let btnText = 'Swap'
  if (!depositAmountBI || depositAmountBI <= 0n) {
    btnDisabled = true
    btnText = 'Enter an amount'
  } else if (depositAmountBI > assetBalance) {
    btnDisabled = true
    btnText = 'Not enough balance'
  } else if (depositAmountBI > assetAllowance) {
    btnText = `Approve ${asset}`
  }

  let modalStatus = 'loading'
  let modalTitle = 'Transaction in process'
  if (deposit.status === 'pending') {
    modalTitle = 'Please check your wallet'
  } else if (deposit.status === 'success' && txReceipt.data) {
    modalTitle = 'Transaction successful'
    modalStatus = 'success'
  }

  return (
    <>
      <Modal
        status={modalStatus}
        txLink={deposit.data ? `https://etherscan.io/tx/${deposit.data}` : ''}
        title={modalTitle}
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false)
          refetch()
        }}
      />
      <div className="border border-gray-border rounded-2xl bg-gray-bg1 w-full max-w-[540px] mt-12">
        <div className="py-6 px-6 border-b border-gray-border">Restake LST</div>
        <div className="p-6 flex flex-col gap-6 bg-white border-b border-gray-border relative">
          <div className="flex items-center justify-between">
            <select
              className="border border-gray-border text-xl px-3 py-1 rounded-full"
              value={asset}
              onChange={(e) => setAsset(e.currentTarget.value)}
            >
              {assets.map(({ symbol }) => (
                <option key={symbol}>{symbol}</option>
              ))}
            </select>

            <div className="text-sm text-gray-500 flex items-center gap-3">
              {`Balance: ${formatEth(assetBalance)}`}
              <button
                onClick={() => setDepositAmount(formatEth(assetBalance))}
                className="border border-gray-500 px-1 text-xs rounded-full hover:bg-gray-500 hover:text-white"
              >
                max
              </button>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <input
              type="text"
              className="flex-1 text-2xl font-bold"
              placeholder="Enter amount..."
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.currentTarget.value)}
            />
            <div className="text-sm text-gray-500">$100,000</div>
          </div>
          <div className="rounded-full w-12 h-12 border bg-gray-bg1 absolute -bottom-px border-[#B5BECA] left-1/2 -translate-x-1/2 translate-y-1/2 text-red-500 flex items-center justify-center">
            <ArrowDown />
          </div>
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
            <div className="text-sm text-gray-500">$100,000</div>
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
        <div className="p-6 flex flex-col gap-6 bg-white rounded-b-2xl">
          <button
            className={`${
              btnDisabled ? 'btn-disabled' : 'btn'
            } px-3 py-4 text-xl`}
            onClick={() => {
              if (btnDisabled) {
                return
              }
              if (depositAmountBI < assetAllowance) {
                deposit.writeContract({
                  abi: lrtDepositPoolAbi,
                  address: contracts.lrtDepositPool,
                  functionName: 'depositAsset',
                  args: [
                    contracts[asset],
                    parseEther(depositAmount),
                    0n,
                    'Origin'
                  ]
                })
              } else {
                deposit.writeContract({
                  abi: rsETHABI,
                  address: contracts[asset],
                  functionName: 'approve',
                  args: [contracts.lrtDepositPool, 10n ** 32n]
                })
              }
            }}
          >
            {btnText}
          </button>

          {deposit.error ? (
            <div className="text-center text-xs break-all">
              {deposit.error.message}
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-6">
        {`${asset} restaking limit: ${formatEth(depositLimit)}`}
      </div>
      <div className="text-xs text-gray-500">
        {`My ${asset} allowance: ${formatEth(assetAllowance)}`}
      </div>
    </>
  )
}
