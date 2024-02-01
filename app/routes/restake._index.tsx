import { useState } from 'react'
import { useAccount, useReadContracts, useWriteContract } from 'wagmi'
import { zeroAddress, parseEther } from 'viem'

import { bigintToFloat } from '~/utils/bigint'

import {
  lrtOracleAbi,
  rsETHABI,
  oracleAbi,
  lrtDepositPoolAbi,
  lrtConfigAbi
} from '~/utils/abis'

const contracts = {
  rsETH: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7',
  ETHx: '0xa35b1b31ce002fbf2058d22f30f95d405200a15b',
  sfrxETH: '0xac3E018457B222d93114458476f3E3416Abbe38F',
  stETH: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  lrtOracle: '0x349A73444b1a310BAe67ef67973022020d70020d',
  lrtDepositPool: '0x036676389e48133B63a802f8635AD39E752D375D',
  lrtConfig: '0x947Cb49334e6571ccBFEF1f1f1178d8469D65ec7'
}

export default function Index() {
  const deposit = useWriteContract()
  const { address } = useAccount()

  console.log(deposit)

  const [asset, setAsset] = useState('ETHx') // ['ETHX', 'stETH', 'sfrxETH'
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
        functionName: 'totalSupply'
      },
      {
        abi: oracleAbi,
        address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
        functionName: 'latestAnswer'
      },
      {
        abi: lrtDepositPoolAbi,
        address: contracts.lrtDepositPool,
        functionName: 'getTotalAssetDeposits',
        args: [contracts.ETHx]
      },
      {
        abi: lrtDepositPoolAbi,
        address: contracts.lrtDepositPool,
        functionName: 'getTotalAssetDeposits',
        args: [contracts.stETH]
      },
      {
        abi: lrtDepositPoolAbi,
        address: contracts.lrtDepositPool,
        functionName: 'getTotalAssetDeposits',
        args: [contracts.sfrxETH]
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
    const tvl = (rsETHPrice * data[1].result) / 10n ** 18n
    const tvlUsd = (tvl * data[2].result) / 10n ** 8n

    const assetAllowance = data[9].result
    const assetBalance = data[10].result
    let depositAmountBI
    try {
      depositAmountBI = parseEther(depositAmount)
    } catch (e) {
      /* Ignore */
    }

    return (
      <>
        <div className="mt-6">
          {`TVL: ${bigintToFloat(tvl).toLocaleString(undefined, {
            maximumFractionDigits: 4
          })} ETH`}
        </div>
        <div>
          {`TVL USD: $${bigintToFloat(tvlUsd).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`}
        </div>
        <div className="mt-4">
          {`Restaked ETHx: ${bigintToFloat(data[3].result).toLocaleString(
            undefined,
            {
              maximumFractionDigits: 4
            }
          )}`}
        </div>
        <div>
          {`Restaked stETH: ${bigintToFloat(data[4].result).toLocaleString(
            undefined,
            {
              maximumFractionDigits: 4
            }
          )}`}
        </div>
        <div>
          {`Restaked sfrxETH: ${bigintToFloat(data[5].result).toLocaleString(
            undefined,
            {
              maximumFractionDigits: 4
            }
          )}`}
        </div>
        <div className="mt-4">
          {`My rsETH: ${bigintToFloat(data[6].result).toLocaleString(
            undefined,
            {
              maximumFractionDigits: 4
            }
          )}`}
        </div>
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
        <div className="mt-4">{`1 rsETH = ${bigintToFloat(
          (10n ** 18n * rsETHPrice) / data[7].result
        ).toLocaleString(undefined, {
          maximumFractionDigits: 4
        })} ${asset}`}</div>
        <div>
          {`${asset} restaking limit: ${bigintToFloat(
            data[8].result
          ).toLocaleString(undefined, {
            maximumFractionDigits: 4
          })}`}
        </div>
        <div>
          {`My ${asset} balance: ${bigintToFloat(assetBalance).toLocaleString(
            undefined,
            {
              maximumFractionDigits: 4
            }
          )}`}
        </div>
        <div>
          {`My ${asset} allowance: ${bigintToFloat(
            assetAllowance
          ).toLocaleString(undefined, {
            maximumFractionDigits: 4
          })}`}
        </div>
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
            onClick={() =>
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
            }
          >
            Deposit
          </button>
        </div>
        {depositAmountBI && depositAmountBI > assetBalance ? (
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
