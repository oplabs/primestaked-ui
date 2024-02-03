import { useState, useEffect } from 'react'
import type { MetaFunction } from '@remix-run/cloudflare'

import eigenPointsSrc from '~/assets/eigen-points.svg'
import primeTokenSrc from '~/assets/prime-eth-token-full.svg'
import primePointsSrc from '~/assets/prime-points.svg'
import { useAccount, useReadContracts } from 'wagmi'
import { contracts } from '~/utils/constants'
import { primeETHABI } from '~/utils/abis'
import { formatEth } from '~/utils/bigint'

import { NumberSpinner } from '~/components/NumberSpinner'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' },
  ]
}

export default function Index() {
  const { isConnected, address } = useAccount()

  const [points, setPoints] = useState(1234)

  useEffect(() => {
    setTimeout(() => {
      setPoints(points + 7)
    }, 1000)
  }, [points, setPoints])

  const connectedAddress =
    address || '0x1111111111111111111111111111111111111111'
  const { data, refetch } = useReadContracts({
    contracts: [
      {
        abi: primeETHABI,
        address: contracts.primeETH,
        functionName: 'balanceOf',
        args: [connectedAddress],
      },
    ],
  })

  let assetBalance = 0n

  if (data) {
    assetBalance = data[0].result as bigint
  }

  return (
    <>
      <div className="text-center text-2xl font-medium mb-12">Dashboard</div>
      <div className="grid grid-cols-3 gap-4 w-full max-w-[700px]">
        <div className="rounded-3xl border border-gray-border bg-white flex flex-col items-center py-5">
          <img src={eigenPointsSrc} alt="Eigen Points" />
          <div className="text-gray-500 text-sm mt-8 font-medium">
            EigenLayer Points
          </div>
          <div className="text-2xl font-medium mt-4">1,452</div>
        </div>
        <div className="rounded-3xl border border-gray-border bg-white flex flex-col items-center py-5">
          <img src={primePointsSrc} alt="Prime ETH Points" />
          <div className="text-gray-500 text-sm mt-8 font-medium">
            primeETH XP
          </div>
          <div className="text-2xl font-medium mt-4">
            <NumberSpinner num={points} />
          </div>
        </div>
        <div className="rounded-3xl border border-gray-border bg-white flex flex-col items-center py-5">
          <img src={primeTokenSrc} alt="Prime ETH" />
          <div className="text-gray-500 text-sm mt-8 font-medium">
            primeETH Balance
          </div>
          <div className="text-2xl font-medium mt-4">
            {formatEth(assetBalance)}
          </div>
        </div>
      </div>
      {/* <img
        src={dashboardSrc}
        alt="Dashboard"
        className="mx-auto max-w-[840px]"
      /> */}
    </>
  )
}
