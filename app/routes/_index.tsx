import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'

import landingSrc from '~/assets/landing.jpg'
import { Segment } from '~/components/landing/Segment'
import { RedBox } from '~/components/landing/RedBox'
import { Token } from '~/components/landing/Token'
import { FaqQuestion } from '~/components/landing/FaqQuestion'
import { AcquireStep } from '~/components/landing/AcquireStep'
import { LearnStep } from '~/components/landing/LearnStep'
import { Footer } from '~/components/landing/Footer'

import { useTVL } from '~/utils/hooks/useTVL'

import Logo from '~/assets/prime-staked.svg'
import Cow from '~/assets/landing/cow.svg'
import Pan from '~/assets/landing/pan.svg'
import AlarmSrc from '~/assets/landing/alarm.svg'
import WhaleSrc from '~/assets/landing/whale.svg'
import TripleRewards from '~/assets/landing/earnTripleRewards.svg'

import GobigSrc from '~/assets/landing/goBig.png'
import BearlySrc from '~/assets/landing/beEarly.png'
import OethSrc from '~/assets/landing/tokens/oeth_token.png'
import StethSrc from '~/assets/landing/tokens/steth_token.png'
import SfrxSrc from '~/assets/landing/tokens/frxeth_token.png'
import MethSrc from '~/assets/landing/tokens/meth_token.svg'
import EthxSrc from '~/assets/landing/tokens/ethx_token.png'
import RethSrc from '~/assets/landing/tokens/reth_token.png'
import SwethSrc from '~/assets/landing/tokens/sweth_token.svg'
import WbethSrc from '~/assets/landing/tokens/wbeth_token.png'
import OsethSrc from '~/assets/landing/tokens/oseth_token.svg'
import AnkrethSrc from '~/assets/landing/tokens/ankreth_token.png'
import CbethSrc from '~/assets/landing/tokens/cbeth_token.png'
import LsethSrc from '~/assets/landing/tokens/lseth_token.png'
import EthSrc from '~/assets/landing/tokens/eth_token.png'

import currencyExchangeSrc from '~/assets/landing/currency_exchange.svg'
import waterDropSrc from '~/assets/landing/water_drop.svg'
import noCheckSrc from '~/assets/landing/no_check.svg'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' }
  ]
}

export default function Marketing() {
  const { tvl, tvlUsd } = useTVL()

  return (
    <>
      {/* Top liquid staking segment */}
      <Segment
        isWhite={false}
        hideOverflow={true}
        width={'normal'}
        isRelative={true}
      >
        <img src={Cow} alt="cow" className="absolute right-[-240px] sm:right-[-120px] md:right-0 bottom-[-206px] z-0" />
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[147px] pt-8" />
        </Link>
        <div className="mt-[76px] text-4.5xl md:text-7xl text-gray-950 z-10">
          Liquid restaking with <span className="text-red-500 font-black">primeETH</span>
        </div>
        <div className="text-gray-500 text-lg md:text-3xl mt-[11px] md:mt-[22px] max-w-[1086px] tracking-wide leading-relaxed z-10">
          Stack ETH staking yield, EigenLayer points, and primeETH XP Points all while remaining liquid.
        </div>
        <div className="text-gray-600 text-3xl mt-[34px] z-10">
          <span className="font-bold">{tvl} ETH</span> ASSETS RESTAKED
        </div>
        <div className="text-gray-600 text-2xl mt-3 z-10">
          ${tvlUsd}
        </div>
        <div
          className="btn px-7 py-4 text-xl mr-0 md:mr-auto mt-[50px] mb-[90px] z-10 text-center hover:cursor-pointer"
        >
          <Link
            to="/app/restake"
          >
            Restake now
          </Link>
        </div>
      </Segment>
      {/* Earn Triple Rewards segment */}
      <Segment
        isWhite={true}
        width={'normal'}
        alignCenter={true}
      >
        <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[74px] md:mt-[54px] flex content-center">
          Earn Triple Rewards
        </div>
        <img className="ml-[-43px] md:ml-[-90px] mt-[0px] md:mt-[-70px]" src={TripleRewards}/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 gap-y-5 md:gap-x-7 mt-[55px] md:mt-[121px] mb-[40px] md:mb-[96px]">
          <RedBox
            iconSrc={waterDropSrc}
            text="Stay liquid"
          />
          <RedBox
            iconSrc={noCheckSrc}
            text="No need to run a validator"
          />
          <RedBox
            iconSrc={currencyExchangeSrc}
            text="Get rewarded automatically"
          />
        </div>
      </Segment>
      {/* Tokens are supported segment */}
      <Segment
        isWhite={false}
        width={'normal'}
        alignCenter={true}
        hideOverflow={true}
        isRelative={true}
      >
        <img src={Pan} alt="cow" className="absolute right-[-240px] sm:right-[-120px] md:right-0 bottom-[-300px] z-0" />
        <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[74px] md:mt-[54px] flex content-left w-full z-10">
          Which tokens are supported?
        </div>
        <div className="text-lg md:text-2xl text-gray-600 mt-[26px] md:mt-[40px] text-left md:mr-[142px] z-10">
          In addition to popular LSTs, we support <span className="font-bold text-blue-500">OETH</span> which is currently the highest yielding LST on the market which is providing a 2% higher APR than the rest of the market right now.
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-x-[50px] gap-y-[30px] md:gap-x-[140px] md:gap-y-[50px] mt-[36px] md:mt-[76px] mb-[60px] md:mb-[52px] z-10">
          <Token
            iconSrc={OethSrc}
            text="OETH"
            isActive={true}
          />
          <Token
            iconSrc={StethSrc}
            text="stETH"
            isActive={true}
          />
          <Token
            iconSrc={SfrxSrc}
            text="sfrxETH"
            isActive={true}
          />
          <Token
            iconSrc={MethSrc}
            text="mEth"
            isActive={true}
          />
          <Token
            iconSrc={EthxSrc}
            text="ETHx"
            isActive={true}
          />
          <Token
            iconSrc={RethSrc}
            text="rEth"
            isActive={true}
          />
          <Token
            iconSrc={SwethSrc}
            text="swETH"
            isActive={true}
          />
          <Token
            iconSrc={WbethSrc}
            text="wBETH"
            isActive={false}
          />
          <Token
            iconSrc={OsethSrc}
            text="osETH"
            isActive={false}
          />
          <Token
            iconSrc={AnkrethSrc}
            text="ankrETH"
            isActive={false}
          />
          <Token
            iconSrc={CbethSrc}
            text="cbETH"
            isActive={false}
          />
          <Token
            iconSrc={LsethSrc}
            text="LsETH"
            isActive={false}
          />
          <Token
            iconSrc={EthSrc}
            text="ETH"
            isActive={false}
          />
        </div>
        <div className="text-4xl font-bold text-off-black mb-[79px] md:mb-[110px] text-center z-10">
          More EigenLayer assets coming soon...
        </div>
      </Segment>
      {/* How do I earn segment */}
      <Segment
        isWhite={true}
        width={'normal'}
        alignCenter={true}
      >
        <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[48px] md:mt-[118px] flex content-center">
          How do I earn?
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[0px] gap-y-[20px] md:gap-x-[17px] md:gap-y-[0px] mt-[64px] md:mt-75px] mb-[20px] md:mb-[103px]">
          <div className="flex flex-col items-center justify-start border-solid border-[1px] border-blue-500 rounded-3xl py-[36px] px-[20px] md:py-[44px] md:px-[53px] bg-blue-500">
            <img src={OethSrc} className="w-[115px] h-[115px] md:w-[180px] md:h-[180px]"/>
            <div className="text-2.66xl text-white mt-[35px] md:mt-[61px] md:max-w-[270px] text-center leading-tight">
              Deposit with OETH and earn
            </div>
            <div className="md:text-5xl text-3xl text-white text-center font-bold mt-4">
              2X REWARDS*
            </div>
            <div className="text-sm md:text-lg text-white text-center md:mt-[15px] mt-[10px]">
              *2x bonus applies only to primeETH minted with OETH and held in the same wallet
            </div>

          </div>

          <LearnStep
            icon={AlarmSrc}
            title="Be early!"
            description="Early depositors will earn an XP multiplier on their deposit:"
            bodyImage={BearlySrc}
          />
          <LearnStep
            icon={WhaleSrc}
            title="Go BIG!"
            description="Earn an XP multiplier for larger deposits for the duration of the campaign:"
            bodyImage={GobigSrc}
          />
        </div>

        <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[96px] md:mt-[162px] flex content-center">
          How do I acquire primeETH?
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[0px] gap-y-[20px] md:gap-x-[17px] md:gap-y-[0px] mt-[64px] md:mt-75px] mb-[20px] md:mb-[103px]">
          <AcquireStep
            step={1}
            description="OETH, stETH, mETH, sfrxETH, and ETHx. Stay tuned to our Twitter as we announce support for additional LSTs in the coming days."
          >
            Obtain one of the supported assets
          </AcquireStep>
          <AcquireStep
            step={2}
            description=""
          >
            Go to <span className="text-red-500">our app</span> and select the asset you obtained
          </AcquireStep>
          <AcquireStep
            step={3}
            description="Our platform will handle the rest, providing you with three types of yield as your assets are restaked."
          >
            Choose to restake
          </AcquireStep>
        </div>
      </Segment>
      {/* Faq segment */}
      <Segment
        isWhite={false}
        width={'normal'}
        alignCenter={true}
      >
        <div className="w-full mb-[57px] md:mb-[169px]">
          <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[74px] md:mt-[54px] text-center w-full">
            FAQs
          </div>
          <FaqQuestion
            question="What is EigenLayer and Restaking?"
            answer="EigenLayer is a platform that enhances the security of various protocols by integrating them with Ethereum's security model through data availability services, eliminating the need for protocols to establish their own set of validators. It achieves this through a suite of smart contracts and enables Ethereum stakers to restake their tokens on EigenLayer. By doing so, stakers can earn extra yield while taking on the risk of slashing, using EigenLayer's Actively Validator Services (AVS) to secure multiple networks."
          />
          <FaqQuestion
            question="What type of fees do you charge?"
            answer="PrimeStaked does not charge any fees for now on EigenLayer Restaked points or XP. 100% of these rewards are passed onto the holder. More details on the fee model will be shared in the future."
          />
          <FaqQuestion
            question="Can I withdraw my funds?"
            answer="Withdrawals won't be available at launch, but will be enabled in the near future. A liquidity pool will be setup on Curve to enable conversion of primeETH to ETH for those needing to exit."
          />
        </div>
      </Segment>
      <Footer />
    </>
  )
}
