import { Outlet } from '@remix-run/react'

import { TopNav } from '~/components/nav/TopNav'
import { SideNav } from '~/components/nav/SideNav'

import type { MetaFunction } from '@remix-run/cloudflare'
import { useReadContracts } from 'wagmi'
import { parseAbi } from 'viem'

import { primeETHABI, oracleAbi, lrtDepositPoolAbi } from '~/utils/abis'
import { contracts, assets, lrtOraclePriceMethod } from '~/utils/constants'
import { formatEth, formatPoints, formatUSD } from '~/utils/bigint'

import { StatBox, StatBoxItem } from '~/components/StatBox'
import { useQuery } from '@tanstack/react-query'
import { graphqlClient } from '~/utils/graphql'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' },
  ]
}

export default function Index() {
  const { data } = useReadContracts({
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
        functionName: 'totalSupply',
      },
      {
        abi: oracleAbi,
        address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
        functionName: 'latestAnswer',
      },
      ...assets.map(({ symbol }) => ({
        abi: lrtDepositPoolAbi,
        address: contracts.lrtDepositPool,
        functionName: 'getTotalAssetDeposits',
        args: [contracts[symbol]],
      })),
    ],
  })

  // const pointSummary = useQuery({
  //   queryKey: ['prime-eth-point-summary'],
  //   queryFn: graphqlClient<{
  //     lrtSummaries: [{ elPoints: string; points: string }]
  //   }>(`
  //     query PointSummary {
  //       lrtSummaries(limit: 1, orderBy: id_DESC) {
  //         points
  //         elPoints
  //       }
  //     }
  //   `),
  // })

  if (!data) return null

  let rsETHPrice = 0n
  let tvl = 0n
  let tvlUsd = 0n

  try {
    rsETHPrice = data[0].result
    tvl = (rsETHPrice * data[1].result) / 10n ** 18n
    tvlUsd = (tvl * data[2].result) / 10n ** 8n
  } catch (e) {
    /* Ignore */
  }

  // const formatPointEL = (val?: string) =>
  //   val ? formatPoints(val) : pointSummary.isLoading ? '...' : '-'
  //
  // const formatPointXP = (val?: string) =>
  //   val ? formatPoints(BigInt(val)) : pointSummary.isLoading ? '...' : '-'

  return (
    <>
      <TopNav />
      <div className="w-full flex px-3 md:px-6 items-start">
        <div className="hidden md:block w-full max-w-[300px]">
          <SideNav />
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-8 ">
          <div className="flex-1 flex flex-col items-center">
            <Outlet />
          </div>
          <div className="md:w-[230px] lg:w-[300px] flex flex-col gap-8 pb-12">
            <StatBox title="primeETH Stats" cols={1}>
              <StatBoxItem
                label="TVL"
                tooltip="Total Value Locked"
                value={`${formatEth(tvl, true)} ETH`}
                description={`$${formatUSD(tvlUsd)}`}
              />
              {/*
              <StatBoxItem
                label="EigenLayer Points"
                value={formatPointEL(
                  pointSummary.data?.lrtSummaries[0]?.elPoints,
                )}
              />
              <StatBoxItem
                label="PrimeStaked Points"
                value={formatPointXP(
                  pointSummary.data?.lrtSummaries[0]?.points,
                )}
              />
              */}
            </StatBox>
            <StatBox title="Assets Deposited" cols={2}>
              {assets.map(({ symbol, src }, i) => (
                <StatBoxItem
                  key={i}
                  label={symbol}
                  logo={src}
                  value={formatEth(data[i + 3].result, true)}
                />
              ))}
            </StatBox>
          </div>
        </div>
      </div>
    </>
  )
}
