import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'

import { Countdown } from '~/components/Countdown'
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
import eigenLogoSrc from '~/assets/eigen-logo.svg'

import GobigSrc from '~/assets/landing/goBig.png'
import BearlySrc from '~/assets/landing/beEarly.png'
import UniswapSrc from '~/assets/landing/uniswap_logo.svg'
import OethSrc from '~/assets/landing/tokens/oeth_token.svg'
import StethSrc from '~/assets/landing/tokens/steth_token.svg'
import SfrxSrc from '~/assets/landing/tokens/frxeth_token.svg'
import MethSrc from '~/assets/landing/tokens/meth_token.svg'
import EthxSrc from '~/assets/landing/tokens/ethx_token.svg'
import RethSrc from '~/assets/landing/tokens/reth_token.svg'
import SwethSrc from '~/assets/landing/tokens/sweth_token.svg'
import WbethSrc from '~/assets/landing/tokens/wbeth_token.png'
import OsethSrc from '~/assets/landing/tokens/oseth_token.svg'
import AnkrethSrc from '~/assets/landing/tokens/ankreth_token.png'
import CbethSrc from '~/assets/landing/tokens/cbeth_token.png'
import LsethSrc from '~/assets/landing/tokens/lseth_token.svg'
import EthSrc from '~/assets/landing/tokens/eth_token.svg'

import currencyExchangeSrc from '~/assets/landing/currency_exchange.svg'
import waterDropSrc from '~/assets/landing/water_drop.svg'
import noCheckSrc from '~/assets/landing/no_check.svg'
import { useAPY } from '~/utils/useAPY'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' },
  ]
}

const countdownTo = new Date()
countdownTo.setUTCHours(20, 0, 0, 0)

export default function Marketing() {
  const { tvl, tvlUsd } = useTVL()
  const apy = useAPY()

  return (
    <>
      {/* Top liquid staking segment */}
      <div className="bg-black py-4 sm:py-8 w-full text-white flex px-4 md:px-8 lg:px-12 flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <div className="min-w-0">
          <img src={eigenLogoSrc} alt="eigenLayer" className="w-8 sm:w-12" />
        </div>
        <div className="flex-1 flex flex-col items-center sm:items-start">
          <div className="text-lg sm:text-2xl font-medium leading-relaxed text-center sm:text-left">
            EigenLayer Deposits Close Soon
          </div>
          <div className="text-sm sm:text-lg text-balance leading-snug text-center sm:text-left">
            Don’t miss your chance to earn primeETH XP in addition to earning
            EigenLayer points. The window for deposits is short! Act now!
          </div>
        </div>
        <div className="">
          <Countdown to={countdownTo} />
        </div>
      </div>
      <Segment
        isWhite={false}
        hideOverflow={true}
        width="normal"
        isRelative={true}
        className={`bg-[bottom_-105%_right_125%] sm:bg-[bottom_-102%_right_-2%] bg-no-repeat`}
        style={{ backgroundImage: `url(${Cow})` }}
      >
        {/* <img
          src={Cow}
          alt="cow"
          className="absolute right-[-240px] sm:right-[-120px] md:right-0 bottom-[-206px] z-0"
        /> */}
        <div className="flex justify-between items-center pt-8">
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
        <div className="mt-16 text-4.5xl md:text-7xl text-gray-950 z-10 md:leading-[1.1] font-medium">
          Liquid restaking with
          <br className="hidden sm:block" />{' '}
          <span className="text-red-500 font-black">primeETH</span>
        </div>
        <div className="text-gray-500 text-lg md:text-3xl mt-[11px] md:mt-[22px] max-w-[1086px] z-10 text-balance font-heading">
          Stack ETH staking yield, EigenLayer points, and primeETH XP Points all
          while remaining liquid.
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center mt-8 sm:mt-20 gap-4 sm:gap-20">
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
            <div className="mt-1 sm:mt-2 text-gray-600 font-medium flex items-center gap-3 text-sm sm:text-base">
              <div className="text-gray-200 text-lg sm:text-2xl font-medium">
                +
              </div>
              <div>EigenLayer Points</div>
              <div className="text-gray-200 text-lg sm:text-2xl font-medium">
                +
              </div>
              <div>PrimeETH XP</div>
            </div>
          </div>
        </div>
        <div className="btn px-7 py-4 text-xl mr-0 md:mr-auto mt-[50px] mb-[90px] z-10 text-center hover:cursor-pointer">
          <Link to="/app/restake">Restake now</Link>
        </div>
      </Segment>
      {/* Earn Triple Rewards segment */}
      <Segment isWhite={true} width={'normal'} alignCenter={true}>
        <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[74px] md:mt-[54px] flex content-center">
          Earn Triple Rewards
        </div>
        <img
          className="ml-[-43px] md:ml-[-90px] mt-[0px] md:mt-[-70px]"
          src={TripleRewards}
          alt="Triple Rewards"
        />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 gap-y-5 xl:gap-x-7 mt-[55px] xl:mt-[121px] mb-[40px] xl:mb-[96px]">
          <RedBox iconSrc={waterDropSrc} text="Stay liquid" />
          <RedBox iconSrc={noCheckSrc} text="No need to run a validator" />
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
        <img
          src={Pan}
          alt="cow"
          className="absolute right-[-240px] sm:right-[-120px] md:right-0 bottom-[-300px] z-0"
        />
        <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[74px] md:mt-[54px] flex content-left w-full z-10">
          Which tokens are supported?
        </div>
        <div className="text-lg md:text-2xl text-gray-600 mt-[26px] md:mt-[40px] text-left md:mr-[142px] z-10">
          In addition to popular LSTs, we support{' '}
          <a
            href="https://oeth.com"
            className="font-bold text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            OETH
          </a>{' '}
          which is currently the highest yielding LST on the market which is
          providing a 2% higher APR than the rest of the market right now.
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-5 gap-x-[50px] gap-y-[30px] xl:gap-x-[140px] xl:gap-y-[50px] mt-[36px] xl:mt-[76px] mb-[60px] xl:mb-[52px] z-10">
          <Token iconSrc={OethSrc} text="OETH" isActive={true} />
          <Token iconSrc={StethSrc} text="stETH" isActive={true} />
          <Token iconSrc={SfrxSrc} text="sfrxETH" isActive={true} />
          <Token iconSrc={MethSrc} text="mEth" isActive={true} />
          <Token iconSrc={EthxSrc} text="ETHx" isActive={true} />
          <Token iconSrc={RethSrc} text="rEth" isActive={true} />
          <Token iconSrc={SwethSrc} text="swETH" isActive={true} />
          <Token iconSrc={WbethSrc} text="wBETH" isActive={false} />
          <Token iconSrc={OsethSrc} text="osETH" isActive={false} />
          <Token iconSrc={AnkrethSrc} text="ankrETH" isActive={false} />
          <Token iconSrc={CbethSrc} text="cbETH" isActive={false} />
          <Token iconSrc={LsethSrc} text="LsETH" isActive={false} />
          <Token iconSrc={EthSrc} text="ETH" isActive={false} />
        </div>
        <div className="text-4xl font-bold text-off-black mb-[79px] xl:mb-[110px] text-center z-10">
          More EigenLayer assets coming soon...
        </div>
      </Segment>
      {/* How do I earn segment */}
      <Segment isWhite={true} width={'normal'} alignCenter={true}>
        <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[48px] md:mt-[118px] flex content-center mb-16 xl:mb-0">
          How do I earn?
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-[0px] gap-y-[20px] xl:gap-x-[17px] xl:gap-y-[0px] xl-[64px] xl:mt-[75px] mb-[20px] xl:mb-[103px]">
          <div className="flex flex-col items-center justify-start border-solid border-[1px] border-blue-500 rounded-3xl py-[36px] px-[20px] xl:py-[44px] xl:px-[53px] bg-blue-500">
            <img
              src={OethSrc}
              className="w-[115px] h-[115px] xl:w-[180px] xl:h-[180px]"
            />
            <div className="text-2.66xl text-white mt-[35px] xl:mt-[61px] xl:max-w-[270px] text-center leading-tight">
              Deposit with{' '}
              <a
                href="https://oeth.com"
                className="font-bold"
                target="_blank"
                rel="noreferrer"
              >
                OETH
              </a>{' '}
              and earn
            </div>
            <div className="xl:text-5xl text-3xl text-white text-center font-bold mt-4">
              2X REWARDS*
            </div>
            <div className="text-sm xl:text-lg text-white text-center xl:mt-[15px] mt-[10px]">
              *2x bonus applies only to primeETH minted with{' '}
              <a
                href="https://oeth.com"
                className="font-bold"
                target="_blank"
                rel="noreferrer"
              >
                OETH
              </a>{' '}
              and held in the same wallet
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-[0px] gap-y-[20px] xl:gap-x-[17px] xl:gap-y-[0px] mt-[64px] xl:mt-[75px]">
          <AcquireStep
            step={1}
            description="Choose from the most trusted LSTs on the market."
          >
            Obtain one of the supported assets
          </AcquireStep>
          <AcquireStep
            step={2}
            description="You won't lose your Ethereum staking yield."
          >
            Go to{' '}
            <Link to="/app/restake" className="text-red-500">
              our app
            </Link>{' '}
            and select your asset
          </AcquireStep>
          <AcquireStep
            step={3}
            description="Our platform will handle the rest, providing you with three types of yield from restaking."
          >
            Approve and stake
          </AcquireStep>
        </div>
        <div className="pt-[40px] mb-[40px] xl:mb-[103px]">
          <img src={UniswapSrc} className="h-[68px] m-auto mb-[20px]" />
          <div className="md:text-2xl text-lg">
            You can also{' '}
            <a
              href="https://app.uniswap.org/swap?outputCurrency=0x6ef3D766Dfe02Dc4bF04aAe9122EB9A0Ded25615&inputCurrency=ETH"
              className="text-red-500"
              target="_blank"
              rel="noreferrer"
            >
              buy primeETH on Uniswap
            </a>
            .
          </div>
        </div>
      </Segment>
      {/* Faq segment */}
      <Segment isWhite={false} width={'normal'} alignCenter={true}>
        <div className="w-full mb-[57px] md:mb-[169px]">
          <div className="text-4xl md:text-6xl font-bold text-gray-950 mt-[74px] md:mt-[54px] text-center w-full">
            FAQ
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
            answer="Withdrawals are not yet supported, but we're committed to enabling them prior to introducing any fees. You can also sell primeETH at any time via Uniswap where there is ample exit liquidity."
          />
        </div>
      </Segment>
      <Footer />
    </>
  )
}
