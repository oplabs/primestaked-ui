import type { MetaFunction } from '@remix-run/cloudflare'

import eigenPointsSrc from '~/assets/eigen-points.svg'
import primeTokenSrc from '~/assets/prime-eth-token-full.svg'
import primePointsSrc from '~/assets/prime-points.svg'
import { useAccount, useReadContracts } from 'wagmi'
import { contracts } from '~/utils/constants'
import { primeETHABI } from '~/utils/abis'
import { formatEth, formatPercentage, formatPoints } from '~/utils/bigint'

import { useQuery } from '@tanstack/react-query'
import { graphqlClient } from '~/utils/graphql'
import { useNavigate } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' },
  ]
}

export default function Index() {
  const { isConnected, address } = useAccount()
  const navigate = useNavigate()

  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'
  const { data: primeEthData } = useReadContracts({
    contracts: [
      {
        abi: primeETHABI,
        address: contracts.primeETH,
        functionName: 'balanceOf',
        args: [connectedAddress],
      },
    ],
  })

  const userStats = useQuery({
    queryKey: [`dashboard-user-stats-${connectedAddress}`],
    queryFn: graphqlClient<
      {
        lrtPointRecipientStats: { elPoints: string; points: string }
        lrtSummaries: { points: string }[]
        totalEigenLayerPoints: string
      },
      { address: string }
    >(
      `
      query PointRecipientStats($address: String!) {
        lrtPointRecipientStats(address: $address) {
          elPoints
          points
        }
        lrtSummaries(limit: 1, orderBy: id_DESC) {
          points
        }
        totalEigenLayerPoints
      }
    `,
      { address: connectedAddress },
    ),
  })

  const isLoading = userStats.isLoading

  let assetBalance = 0n

  if (primeEthData) {
    assetBalance = primeEthData[0].result as bigint
  }

  const lrtPointRecipientStats = userStats.data?.lrtPointRecipientStats
  const lrtSummaries = userStats.data?.lrtSummaries
  const totalEigenLayerPoints = userStats.data?.totalEigenLayerPoints
  const totalPrimeXP = lrtSummaries?.[0]?.points
    ? BigInt(lrtSummaries?.[0]?.points)
    : undefined

  const formatDashboardPoints = (val?: string) =>
    val ? formatPoints(val) : isLoading ? '...' : '-'

  const calculatePercentage = (
    portion: string | bigint | undefined,
    total: string | bigint | undefined,
  ) =>
    portion && total && BigInt(total) > 0
      ? (BigInt(portion) * eth1) / BigInt(total)
      : undefined

  const eth1 = 1_000000000_000000000n
  const percentTotalXp = calculatePercentage(
    lrtPointRecipientStats?.points,
    totalPrimeXP,
  )
  const percentTotalELPoints = calculatePercentage(
    lrtPointRecipientStats?.elPoints,
    totalEigenLayerPoints,
  )

  // https://app.eigenlayer.xyz/api/trpc/price.getPrices,nativeStaking.getNativeStakingSummaryByEigenpod?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%2C%221%22%3A%7B%22json%22%3A%7B%22podOwnerAddress%22%3A%220x0000000000000000000000000000000000000000%22%7D%7D%7D

  return (
    <>
      <div className="text-2xl font-medium mb-12 text-center">Dashboard</div>
      <div className="flex flex-col gap-4 w-full max-w-[700px]">
        <div className="rounded-3xl border border-gray-border bg-white flex gap-2 flex-col md:flex-row justify-between items-center py-5 px-10">
          <img className="mt-2" src={primeTokenSrc} alt="Prime ETH" />
          <div className="flex flex-col gap-2 items-center py-5 md:py-0">
            <div className="text-gray-500 text-center text-sm font-medium">
              primeETH Balance
            </div>
            <div className="text-2xl font-bold align-middle">
              {formatEth(assetBalance)}
            </div>
          </div>
          <button
            className="btn gpx-3 px-4 py-2"
            onClick={() => {
              navigate('/app/restake')
            }}
          >
            Restake {assetBalance === 0n ? 'now' : 'more'}
          </button>
        </div>
      </div>
      <div className="text-2xl font-medium text-center my-12">Your rewards</div>
      <div className="flex flex-col gap-4 w-full max-w-[700px]">
        <div className="rounded-3xl border border-gray-border bg-white flex gap-2 flex-col md:flex-row justify-between items-center py-5 px-10">
          <img className="mt-2" src={eigenPointsSrc} alt="Eigen Points" />
          <div className="flex flex-col gap-2 items-center py-5 md:py-0">
            <div className="text-gray-500 text-center text-sm font-medium">
              EigenLayer Points
            </div>
            <div className="text-2xl font-medium ">
              {formatDashboardPoints(lrtPointRecipientStats?.elPoints)}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="text-gray-500 text-center text-sm font-medium">
              % of total
            </div>
            <div className="font-medium ">
              {percentTotalELPoints
                ? formatPercentage(percentTotalELPoints)
                : '-'}
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-border bg-white flex flex-col md:flex-row justify-between items-center py-5 px-10">
          <img className="mt-2" src={primePointsSrc} alt="Prime ETH Points" />
          <div className="flex flex-col gap-2 items-center py-5 md:py-0">
            <div className="text-gray-500 text-center text-sm font-medium">
              primeETH XP
            </div>
            <div className="text-2xl font-medium ">
              {formatDashboardPoints(lrtPointRecipientStats?.points)}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="text-gray-500 text-center text-sm font-medium">
              % of total
            </div>
            <div className="font-medium ">
              {percentTotalXp ? formatPercentage(percentTotalXp) : '-'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
