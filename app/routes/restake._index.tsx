import { useState } from 'react'
import { useAccount, useReadContracts, useWriteContract } from 'wagmi'
import { zeroAddress, parseEther } from 'viem'

import { formatEth } from '~/utils/bigint'
import { contracts } from '~/utils/constants'

import {
  lrtOracleAbi,
  rsETHABI,
  oracleAbi,
  lrtDepositPoolAbi,
  lrtConfigAbi
} from '~/utils/abis'

export default function Index() {
  const deposit = useWriteContract()
  const { address } = useAccount()

  console.log(deposit)

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

  if (data) {
    console.log(data)
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
        <div className="mt-4">{`My rsETH: ${formatEth(data[1].result)}`}</div>
        <div className="flex items-center gap-2 mt-4">
          Select asset:
          <select
            className="text-black"
            value={asset}
            onChange={(e) => setAsset(e.currentTarget.value)}
          >
            <option>ETHx</option>
            <option>stETH</option>
            <option>sfrxETH</option>
          </select>
        </div>
        <div className="mt-4">
          {`1 rsETH = ${formatEth(assetPrice)} ${asset}`}
        </div>
        <div>{`${asset} restaking limit: ${formatEth(data[3].result)}`}</div>
        <div>{`My ${asset} balance: ${formatEth(assetBalance)}`}</div>
        <div>{`My ${asset} allowance: ${formatEth(assetAllowance)}`}</div>
        <div className="flex items-center gap-2 mt-4">
          {`Deposit ${asset}: `}
          <input
            type="text"
            className="text-black px-1 w-20 rounded"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.currentTarget.value)}
          />
          <button
            className="btn px-3 py-1 text-sm"
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
              : 'Deposit'}
          </button>
        </div>
        {!depositAmountBI ? null : depositAmountBI > assetBalance ? (
          <div className="mt-4 text-xs break-all">Not enough balance</div>
        ) : null}
        {deposit.error ? (
          <div className="mt-4 text-xs break-all">{deposit.error.message}</div>
        ) : null}
      </>
    )
  }

  return <div>Loading...</div>
}

