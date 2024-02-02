import type { MetaFunction } from '@remix-run/cloudflare'

import eigenPointsSrc from '~/assets/eigen-points.svg'
import primeTokenSrc from '~/assets/prime-eth-token-full.svg'
import primePointsSrc from '~/assets/prime-points.svg'
import ethTokenSrc from '~/assets/ETH.svg'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' }
  ]
}

export default function Index() {
  return (
    <>
      <div className="text-center text-2xl font-medium mb-12">Dashboard</div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-[700px]">
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
          <div className="text-2xl font-medium mt-4">1,452</div>
        </div>
        <div className="rounded-3xl border border-gray-border bg-white flex flex-col items-center py-5">
          <img src={ethTokenSrc} alt="ETH Logo" />
          <div className="text-gray-500 text-sm mt-8 font-medium">
            Total ETH Deposited
          </div>
          <div className="text-2xl font-medium mt-4">100</div>
        </div>
        <div className="rounded-3xl border border-gray-border bg-white flex flex-col items-center py-5">
          <img src={primeTokenSrc} alt="Prime ETH" />
          <div className="text-gray-500 text-sm mt-8 font-medium">
            primeETH Balance
          </div>
          <div className="text-2xl font-medium mt-4">99</div>
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
