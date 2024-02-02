import { useState } from 'react'
import { useAccount, useReadContracts, useWriteContract } from 'wagmi'
import { zeroAddress, parseEther } from 'viem'

import { formatEth } from '~/utils/bigint'
import { contracts } from '~/utils/constants'
import { ArrowDown } from '~/components/Icons'

import primeEthSVG from '~/assets/prime-eth-token.svg'

import {
  lrtOracleAbi,
  rsETHABI,
  lrtDepositPoolAbi,
  lrtConfigAbi
} from '~/utils/abis'

export default function Index() {
  const deposit = useWriteContract()
  const { address } = useAccount()

  const [asset, setAsset] = useState<keyof typeof contracts>('ETHx')
  const [depositAmount, setDepositAmount] = useState('')
  const { data } = useReadContracts({
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

  if (!data) {
    return <div>Loading...</div>
  }

  const rsETHPrice = data[0].result

  const assetAllowance = data[4].result
  const assetBalance = data[5].result
  const assetPrice = (10n ** 18n * rsETHPrice) / data[2].result
  let depositAmountBI
  try {
    depositAmountBI = parseEther(depositAmount)
  } catch (e) {
    /* Ignore */
  }

  return (
    <>
      <div className="border border-gray-border rounded-2xl bg-gray-bg1 w-full max-w-[540px] mt-12">
        <div className="py-6 px-6 border-b border-gray-border">Restake LST</div>
        <div className="p-6 flex flex-col gap-6 bg-white border-b border-gray-border relative">
          <div className="flex items-center justify-between">
            <select
              className="border border-gray-border text-xl px-3 py-1 rounded-full"
              value={asset}
              onChange={(e) => setAsset(e.currentTarget.value)}
            >
              <option>ETHx</option>
              <option>stETH</option>
              <option>sfrxETH</option>
            </select>

            <div className="text-sm text-gray-500 flex items-center gap-3">
              {`Balance: ${formatEth(assetBalance)}`}
              <button className="border border-gray-500 px-1 text-xs rounded-full hover:bg-gray-500 hover:text-white">
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
              {`Balance: ${formatEth(data[1].result)}`}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex-1 text-2xl font-bold">{'9'}</div>
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
            className="btn px-3 py-4 text-xl"
            onClick={() => {
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
            {depositAmountBI && depositAmountBI > assetAllowance
              ? 'Set allowance'
              : 'Swap'}
          </button>

          {!depositAmountBI ? null : depositAmountBI > assetBalance ? (
            <div className="text-center text-xs break-all">
              Not enough balance
            </div>
          ) : null}
          {deposit.error ? (
            <div className="text-center text-xs break-all">
              {deposit.error.message}
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-6">
        {`${asset} restaking limit: ${formatEth(data[3].result)}`}
      </div>
      <div className="text-xs text-gray-500">
        {`My ${asset} allowance: ${formatEth(assetAllowance)}`}
      </div>
    </>
  )
}
