import type { MetaFunction } from '@remix-run/cloudflare'

import friendsSrc from '~/assets/friends.svg'
import eigenPointsSrc from '~/assets/eigen-points.svg'
import primeTokenSrc from '~/assets/prime-eth-token-full.svg'
import primePointsSrc from '~/assets/prime-points.svg'
import { useAccount, useReadContracts } from 'wagmi'
import { contracts } from '~/utils/constants'
import { primeETHABI } from '~/utils/abis'
import { formatEth, formatPercentage, formatPoints } from '~/utils/bigint'
import { CopyReferrerLink } from '~/components/CopyReferrerLink'

import { useQuery } from '@tanstack/react-query'
import { graphqlClient } from '~/utils/graphql'
import { Link } from '@remix-run/react'
import { Tooltip } from '~/components/Tooltip'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' },
  ]
}

export default function Index() {
  const { address } = useAccount()

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
      }
    `,
      { address: connectedAddress },
    ),
  })

  const elStats = useQuery({
    queryKey: [`el-stats`],
    queryFn: graphqlClient<
      {
        totalEigenLayerPoints: string
      },
      { address: string }
    >(
      `
      query ELStats {
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
  const totalEigenLayerPoints = elStats.data?.totalEigenLayerPoints
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

  const headerClass = `font-medium text-center mt-4 text-xl leading-relaxed mb-2`
  const boxClass = `rounded-3xl border border-gray-border bg-white flex gap-2 flex-col md:flex-row justify-between items-center py-4 px-8`

  return (
    <>
      <div className="flex flex-col gap-4 w-full max-w-[700px]">
        <div className="rounded-3xl border border-gray-border flex gap-2 flex-col md:flex-row items-center py-6 sm:py-2 px-6">
          <div className="w-12 h-12">
            <img src={friendsSrc} alt="friends" />
          </div>
          <div className="flex-1 flex flex-col items-center sm:items-start sm:pt-4 pb-4 gap-3">
            <div className="leading-relaxed font-medium">
              Invite your friends
            </div>
            <div className="text-gray-500 text-balance max-w-64 text-xs leading-snug text-center sm:text-left">
              Get even more primeETH XP when you invite your friends
            </div>
          </div>
          <div>
            <CopyReferrerLink />
          </div>
        </div>
        <div className={headerClass}>Your Balance</div>
        <div className={boxClass}>
          <div className="w-1/4 flex justify-center">
            <img className="h-16" src={primeTokenSrc} alt="Prime ETH" />
          </div>
          <div className="w-1/2 flex flex-col gap-2 items-center py-6 md:pt-2 md:pb-1">
            <div className="text-gray-500 text-center text-sm font-medium leading-relaxed">
              primeETH
            </div>
            <div className="text-2xl font-medium align-middle leading-relaxed">
              {formatEth(assetBalance)}
            </div>
          </div>
          <div className="w-1/4 flex justify-center">
            <Link to="/app/restake" className="btn text-sm px-6 py-3">
              Restake {assetBalance === 0n ? 'now' : 'more'}
            </Link>
          </div>
        </div>
        <div className={headerClass}>Your Rewards</div>
        <div className={`${boxClass} mb-2`}>
          <div className="w-1/4 flex justify-center">
            <img className="h-16" src={primePointsSrc} alt="Prime ETH Points" />
          </div>
          <div className="w-1/2 flex flex-col gap-3 items-center py-6 md:pt-2 md:pb-2">
            <div className="text-gray-500 text-center text-sm font-medium flex items-center gap-2">
              primeETH XP
              <Tooltip placement="right">
                <div className="flex flex-col gap-2 text-gray-500 text-xs">
                  <div className="flex justify-between items-center gap-12">
                    <div>Deposits</div>
                    <div>
                      {formatDashboardPoints(lrtPointRecipientStats?.points)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-8">
                    <div>Referrals</div>
                    <div>Coming soon...</div>
                  </div>
                </div>
              </Tooltip>
            </div>
            <div className="text-2xl font-medium">
              {formatDashboardPoints(lrtPointRecipientStats?.points)}
            </div>
          </div>
          <div className="w-1/4 flex justify-center flex-col gap-3 items-center">
            <div className="text-gray-500 text-center text-sm font-medium">
              % of total
            </div>
            <div className="text-2xl font-medium">
              {percentTotalXp ? formatPercentage(percentTotalXp, 3) : '-'}
            </div>
          </div>
        </div>
        <div className={boxClass}>
          <div className="w-1/4 flex justify-center">
            <img className="h-16" src={eigenPointsSrc} alt="Eigen Points" />
          </div>
          <div className="w-1/2 flex flex-col gap-3 items-center py-6 md:pt-2 md:pb-2">
            <div className="text-gray-500 text-center text-sm font-medium">
              EigenLayer Points
            </div>
            <div className="text-2xl font-medium ">
              {formatDashboardPoints(lrtPointRecipientStats?.elPoints)}
            </div>
          </div>
          <div className="w-1/4 flex justify-center flex-col gap-3 items-center">
            <div className="text-gray-500 text-center text-sm font-medium">
              % of total
            </div>
            <div className="text-2xl font-medium">
              {percentTotalELPoints
                ? formatPercentage(percentTotalELPoints, 3)
                : '-'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
