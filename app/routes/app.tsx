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
import { Tooltip } from '~/components/Tooltip'

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
      <div className="w-full flex flex-col sm:flex-row px-3 md:px-6 items-start gap-8 sm:gap-0">
        <div className="hidden md:block w-full max-w-[250px]">
          <SideNav />
        </div>
        <div className="w-full sm:w-auto sm:flex-1 flex flex-col items-center px-2 sm:px-8">
          <Outlet />
        </div>
        <div className="w-full sm:w-[250px] flex flex-col gap-6 pb-12 px-2 sm:px-0">
          <StatBox title="Global Stats" cols={1}>
            <div className="px-2">
              <div className="text-gray-500 text-sm flex items-center gap-1 leading-relaxed">
                TVL
                <Tooltip size={16}>Total Value Locked</Tooltip>
              </div>
              <div className="mt-1 text-xl">
                {`${formatEth(tvl, true)} ETH`}
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {`$${formatUSD(tvlUsd, 0)}`}
              </div>
            </div>
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
    </>
  )
}
