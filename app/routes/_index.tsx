import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'

import landingSrc from '~/assets/landing.jpg'
import { Segment } from '~/components/landing/Segment'
import { RedBox } from '~/components/landing/RedBox'
import { Token } from '~/components/landing/Token'
import Logo from '~/assets/prime-staked.svg'
import Cow from '~/assets/landing/cow.svg'
import Pan from '~/assets/landing/pan.svg'
import TripleRewards from '~/assets/landing/earnTripleRewards.svg'

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
        <div className="mt-[76px] text-7xl text-gray-950 z-10">
          Liquid restaking with <span className="text-red-500 font-black">primeETH</span>
        </div>
        <div className="text-gray-500 text-3xl mt-[22px] max-w-[1086px] tracking-wide leading-relaxed z-10">
          Stack ETH staking yield, EigenLayer points, and primeETH XP Points all while remaining liquid.
        </div>
        <div className="text-gray-600 text-3xl mt-[34px] z-10">
          <span className="font-bold">2720.43 ETH</span> ASSETS RESTAKED
        </div>
        <div className="text-gray-600 text-2xl mt-3 z-10">
          $6,251,430.43
        </div>
        <div
          className="btn px-7 py-4 text-xl mr-0 md:mr-auto mt-[50px] mb-[90px] z-10 text-center"
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
        width={'large'}
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
    </>
  )
}
