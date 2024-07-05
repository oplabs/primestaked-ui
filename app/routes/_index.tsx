import type { MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

import { RedBox } from '~/components/landing/RedBox'
import { FaqQuestion } from '~/components/landing/FaqQuestion'
import { Footer } from '~/components/landing/Footer'

import Logo from '~/assets/prime-staked.svg'
import Cow from '~/assets/landing/cow.svg'
import EthStakingSrc from '~/assets/landing/eth-staking.svg'

import HowItWorksSrc from '~/assets/landing/how-it-works.png'
import OethSrc from '~/assets/landing/tokens/oeth_token.svg'
import EthSimpleSrc from '~/assets/landing/eth-simple.svg'
import LimitedTime from '~/assets/landing/limited-time.svg'
import EigenStar2 from '~/assets/landing/eigen-star2.svg'
import PrimeBonusSrc from '~/assets/landing/prime-bonus.svg'

import currencyExchangeSrc from '~/assets/landing/currency_exchange.svg'
import waterDropSrc from '~/assets/landing/water_drop.svg'
import noCheckSrc from '~/assets/landing/no_check.svg'
import { Tooltip } from '~/components/Tooltip'
import { YieldNestBanner } from '~/components/YieldNestBanner'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' },
  ]
}

export const loader = async () => {
  const dataRaw = await fetch(
    'https://api.originprotocol.com/api/v2/primestaked',
  )
  const data = await dataRaw.json()
  return {
    tvl: data.tvl.toLocaleString(undefined, { maximumFractionDigits: 0 }),
    tvlUsd: data.tvlUsd.toLocaleString(undefined, { maximumFractionDigits: 0 }),
    apy: data.apy,
  }
}

export default function Marketing() {
  const { tvl, tvlUsd, apy } = useLoaderData<typeof loader>()

  return (
    <>
      <YieldNestBanner />
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-8 lg:px-12 py-8">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[147px]" />
        </Link>
        <a
          href="https://docs.primestaked.com"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:block ml-auto text-gray-950 hover:underline"
        >
          Docs
        </a>
        <Link
          to="/app/restake"
          className="hidden sm:block ml-8 btn-outline px-7 py-3 leading-snug"
        >
          Restake now
        </Link>
      </div>

      <div
        className={`bg-[bottom_-230px_right_130%] sm:bg-[bottom_-137%_right_0%] bg-no-repeat`}
        style={{ backgroundImage: `url(${Cow})` }}
      >
        <div className="mt-4 sm:mt-10 mx-auto w-full max-w-7xl pb-8 sm:pb-32 px-8 lg:px-12">
          <div className="text-4.5xl md:text-7xl text-gray-950 md:leading-[1.1] font-medium">
            Liquid restaking with
            <br className="hidden sm:block" />{' '}
            <span className="text-red-500 font-black">primeETH</span>
          </div>
          <div className="text-gray-500 text-lg md:text-3xl mt-6 md:mt-6 max-w-[1086px] z-10 text-balance font-heading">
            Stack ETH staking yield, EigenLayer points, and primeETH XP Points
            all while remaining liquid.
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center mt-8 sm:mt-16 mb-12 sm:mb-20 sm:pt-2 gap-x-4 gap-y-8 sm:gap-20">
            <div>
              <div className="text-gray-500 text-lg sm:text-2xl">
                Assets restaked
              </div>
              <div className="sm:mt-1 text-2xl sm:text-4.5xl font-bold text-gray-600">{`${tvl} ETH`}</div>
              <div className="mt-1 sm:mt-2 text-gray-600 font-medium text-sm sm:text-base">{`$${tvlUsd}`}</div>
            </div>
            <div className="border-r border-gray-border h-20 hidden sm:block" />
            <div>
              <div className="text-gray-500 text-lg sm:text-2xl">APY</div>
              <div className="sm:mt-1 text-2xl sm:text-4.5xl font-bold text-gray-600">
                {`${apy.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}%`}
              </div>
              <div className="mt-1 sm:mt-2 text-gray-600 font-medium flex items-center gap-3 text-sm sm:text-base flex-wrap">
                <div className="flex gap-3 items-center">
                  <div className="text-gray-200 text-lg sm:text-2xl font-medium">
                    +
                  </div>
                  <div>EigenLayer Points</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-gray-200 text-lg sm:text-2xl font-medium">
                    +
                  </div>
                  <div>PrimeETH XP</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-gray-200 text-lg sm:text-2xl font-medium">
                    +
                  </div>
                  <div>10% SSV Bonus</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link
              to="/app/restake"
              className="block sm:inline text-center sm:w-auto btn sm:px-20 py-5 text-xl sm:text-2.66xl hover:cursor-pointer"
            >
              Restake now
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12 flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-14 md:mt-[105px] flex content-center">
            Earn Triple Rewards
          </div>
          <div className="w-full flex justify-between mt-8 sm:mt-24 pt-2 sm:px-4">
            <div className="flex flex-col gap-4 sm:gap-8 flex-1">
              <div className="relative flex justify-center">
                <img
                  alt="ETH Staking"
                  src={EthStakingSrc}
                  className="h-20 sm:h-36"
                />
                <div className="h-[1ex] flex items-center absolute right-0 bottom-1/2 translate-x-1/2 translate-y-1/2 leading-0 sm:w-8 text-3xl sm:text-8xl font-medium font-heading text-gray-400">
                  +
                </div>
              </div>
              <div className="text-sm sm:text-4xl text-center text-balance leading-snug sm:leading-relaxed sm:mt-5">
                <span className="font-medium">ETH staking rewards</span>
                {' (3-5% APY)'}
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-8 flex-1">
              <div className="relative flex justify-center">
                <img
                  alt="ETH Staking"
                  src={EigenStar2}
                  className="h-20 sm:h-36"
                />
                <div className="h-[1ex] flex items-center absolute right-0 bottom-1/2 translate-x-1/2 translate-y-1/2 leading-0 sm:w-8 text-3xl sm:text-8xl font-medium font-heading text-gray-400">
                  +
                </div>
              </div>
              <div className="text-sm sm:text-4xl text-center text-balance leading-snug sm:leading-relaxed sm:mt-5">
                EigenLayer <br />
                points
              </div>
            </div>
            <div className="relative flex flex-col gap-4 sm:gap-8 flex-1">
              <img
                alt="ETH Staking"
                src={PrimeBonusSrc}
                className="h-20 sm:h-36"
              />
              <div className="text-sm sm:text-4xl text-center text-balance leading-snug sm:leading-relaxed sm:mt-5">
                <div className="text-red-500">primeETH</div>
                XP
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-24 mx-auto w-full max-w-8xl pb-28 px-4 md:px-8 lg:px-12 flex flex-col items-center">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-7 w-full px-3">
            <RedBox iconSrc={waterDropSrc} text="Stay liquid" />
            <RedBox iconSrc={noCheckSrc} text="No need to run a validator" />
            <RedBox
              iconSrc={currencyExchangeSrc}
              text="Get rewarded automatically"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-8xl py-10 sm:py-20 px-8 lg:px-16 flex flex-col md:flex-row md:align-middle gap-8">
        <div className="w-full md:w-2/3">
          <div className="text-4xl sm:text-6xl font-bold text-gray-950 text-balance pb-8">
            <span className="text-red-500">primeETH</span>&nbsp;is backed by
            OETH
          </div>
          <div className="text-gray-500 text-lg sm:text-3xl text-balance font-heading pb-3">
            Stake ETH, Stay Liquid, Earn Superior Yield
          </div>
          <p className="w-full text-lg sm:text-3xl">
            Stake any amount of ETH and receive equivalent Origin Ether. Use
            OETH cross-chain across DeFi to compound returns, while still
            earning staking yield.
          </p>
        </div>
        <img
          src={OethSrc}
          alt="oeth"
          className="w-[150px] md:w-[300px] mx-auto"
        />
      </div>

      <div className="bg-white pt-16 sm:pt-28 pb-10 sm:pb-32">
        <div className="mx-auto w-full max-w-8xl px-8 lg:px-16">
          <div className="text-4xl sm:text-6xl font-bold text-gray-950 text-center">
            How do I acquire <span className="text-red-500">primeETH</span>?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-12 sm:mt-16 gap-8 pt-2">
            <div className="border border-gray-500 rounded-3xl p-8 sm:p-10 flex flex-col items-center gap-6">
              <div className="flex items-center justify-center bg-red-500 rounded-full h-16 w-16 sm:h-24 sm:w-24 mt-1">
                <img
                  src={EthSimpleSrc}
                  alt="ETH"
                  className="h-12 sm:h-[74px] sm:w-[74px]"
                />
              </div>
              <div className="sm:mt-2 text-2xl sm:text-4xl font-medium leading-relaxed text-center">
                Deposit OETH
              </div>
              <div className="sm:mt-3 text-lg sm:text-2xl leading-normal text-balance text-center mb-5">
                All deposits earn the same three layers of rewards from SSV,
                EigenLayer, and XP.
              </div>
              <Link
                to="/app/restake"
                className="btn-outline text-sm mt-auto w-full sm:w-auto sm:px-20 py-3 mb-2 text-center"
              >
                Deposit now
              </Link>
            </div>
            <div className="border border-gray-500 rounded-3xl py-10 px-8 sm:px-16 flex flex-col items-center gap-6">
              <div className="flex items-center justify-center bg-red-500 rounded-full h-16 w-16 sm:h-24 sm:w-24 mt-1">
                <img
                  src={EthSimpleSrc}
                  alt="ETH"
                  className="h-12 sm:h-[74px] sm:w-[74px]"
                />
              </div>
              <div className="sm:mt-2 text-2xl sm:text-4xl font-medium leading-relaxed text-center">
                Buy it on Uniswap
              </div>
              <div className="sm:mt-3 text-lg sm:text-2xl leading-normal text-balance text-center mb-5">
                Your primeETH will earn at the same rate whether you buy or
                deposit.
              </div>
              <a
                href="https://app.uniswap.org/swap?outputCurrency=0x6ef3D766Dfe02Dc4bF04aAe9122EB9A0Ded25615&inputCurrency=ETH"
                className="btn-outline text-sm mt-auto w-full sm:w-auto sm:px-20 py-3 mb-2 text-center"
                target="_blank"
                rel="noreferrer"
              >
                Visit Uniswap
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-8xl py-10 sm:py-20 px-8 lg:px-16 flex flex-col items-center">
        <div className="text-4xl sm:text-6xl font-bold text-gray-950 text-center mb-20">
          How it works
        </div>
        <div
          style={{ backgroundImage: `url(${HowItWorksSrc})` }}
          className="w-full h-[300px] max-w-[1122px] bg-contain bg-no-repeat bg-center relative"
        />
      </div>

      <div className="bg-white pt-12 sm:pt-28 pb-12 sm:pb-32">
        <div className="mx-auto w-full max-w-8xl px-4 md:px-8 lg:px-16 flex flex-col sm:flex-row">
          <div className="flex-1">
            <div className="text-4xl sm:text-6xl font-bold text-gray-950 text-balance">
              Refer your friends and earn extra{' '}
              <span className="text-red-500">primeETH</span>
              {' XP'}
            </div>
            <div className="mt-10 text-gray-500 text-lg sm:text-3xl text-balance font-heading">
              For a limited time only, earn 10% of the XP points accrued by your
              referrals. Anyone who uses a referral link also earns 10% more XP.{' '}
              <Tooltip size={24} className="p-4 text-gray-500">
                10% referral bonus only applies to base XP earned, not including
                other points multiplers.
              </Tooltip>
              <div className="mt-4 sm:mt-10">
                Launch our app to get the referral link.
              </div>
            </div>
            <div className="mt-12 sm:mt-20">
              <Link
                to="/app/restake"
                className="btn block sm:inline text-center px-20 py-5 text-2.66xl hover:cursor-pointer"
              >
                Launch App
              </Link>
            </div>
          </div>
          <div className="hidden sm:block sm:w-2/5">
            <img src={LimitedTime} alt="Limited Time" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-8xl sm:pt-10 pb-24 px-8 lg:px-16 flex flex-col items-center">
        <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[74px] md:mt-[54px] text-center w-full">
          FAQs
        </div>
        <FaqQuestion
          question="What is EigenLayer and Restaking?"
          answer="EigenLayer is a platform that enhances the security of various protocols by integrating them with Ethereum's security model through data availability services, eliminating the need for protocols to establish their own set of validators. It achieves this through a suite of smart contracts and enables Ethereum stakers to restake their tokens on EigenLayer. By doing so, stakers can earn extra yield while taking on the risk of slashing, using EigenLayer's Actively Validator Services (AVS) to secure multiple networks."
        />
        <FaqQuestion
          question="What type of fees do you charge?"
          answer="PrimeStaked does not charge any fees for now on EigenLayer Restaked points or XP. 100% of these rewards are passed onto the holder. More details on the fee model will be shared in the future. Rest assured, redemptions will be enabled before fees are turned on."
        />
      </div>
      <Footer />
    </>
  )
}
