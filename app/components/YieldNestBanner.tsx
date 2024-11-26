import Logo from '~/assets/prime-eth-token.svg'
import YieldNest from '~/assets/yieldnest.svg'
import YNSeed from '~/assets/yn-seed.svg'
import Airdrop from '~/assets/airdrop.svg'
import YNToken from '~/assets/yn-token.svg'
import Parastar from '~/assets/parastar.svg'
import { ExternalLink } from './Icons'

const cards = [
  {
    icon: Airdrop,
    title: 'Participate in the YieldNest Airdrop',
    description:
      'Migrate primeETH to ynSLDe and get whitelisted for the upcoming YND airdrop.',
  },
  {
    icon: YNSeed,
    title: '60% YND Allocation',
    description:
      'YieldNest plans to distribute at least 60% of the total YND token supply to its community.',
  },
  {
    icon: YNToken,
    title: 'Exclusive Boosts',
    description:
      'Earn 5% to 15% boosts on YieldNest Seeds for being part of the PrimeStaked community.',
  },
]

export const YieldNestBanner = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center px-8 py-8 bg-red-500 gap-2">
        <img src={Parastar} alt="YN-icon" className="w-[80px] sm:w-[120px]" />
        <span className="text-center text-balance text-xl sm:text-3xl text-white">
          Migrate your primeETH to ynLSDe <b>before December 15</b> to be
          eligible for the exclusive YieldNest PrimeStaked YND Airdrop.
        </span>
      </div>
      <div className="flex flex-col align-middle bg-black py-16 px-8">
        <div className="flex flex-row items-center justify-center pb-8">
          <img className="w-[80px] sm:w-[120px]" alt="primeETH" src={Logo} />
          <img
            className="w-[80px] sm:w-[120px] ml-[-30px]"
            alt="Yield-nest"
            src={YieldNest}
          />
        </div>
        <span className="text-white text-2xl sm:text-5xl text-center font-medium pb-8 leading-snug">
          PrimeStaked is merging with YieldNest!
          <br />
          Migration is live!
        </span>
        <span className="text-white text-2xl text-center font-medium pb-8">
          PrimeStaked XP holders are eligible for an exclusive YND airdrop.
        </span>
        <div className="flex flex-col md:flex-row align-middle justify-center w-full gap-8 pb-16">
          {cards.map((c) => (
            <Card key={c.title} {...c} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-8 px-28 mb-8">
          <a
            href="https://app.primestaked.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row flex-flex-nowrap items-center gap-1 btn px-16 py-5 text-lg hover:cursor-pointer whitespace-nowrap"
          >
            Migrate to ynLSDe Now
          </a>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 px-28">
          <a
            href="https://www.originprotocol.com/primestaked-yieldnest-airdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row flex-flex-nowrap items-center gap-1 btn-outline px-12 py-3 text-lg hover:cursor-pointer whitespace-nowrap"
          >
            Learn more
            <ExternalLink />
          </a>
          <a
            href="https://yieldnest.finance/primestaked"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row flex-flex-nowrap items-center gap-1 btn-alert px-12 py-3 text-lg hover:cursor-pointer whitespace-nowrap"
          >
            Visit YieldNest&nbsp;
            <ExternalLink />
          </a>
        </div>
      </div>
    </>
  )
}

type CardProps = {
  icon: string
  title: string
  description: string
}

const Card = ({ icon, description, title }: CardProps) => {
  return (
    <div className="flex flex-col align-middle p-5 border border-gray-750 rounded-xl bg-gray-850 bg-opacity-50 gap-2 w-full md:w-[300px]">
      <img
        className="w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] mx-auto mb-4"
        alt={title}
        src={icon}
      />
      <span className="text-white text-center text-2xl">{title}</span>
      <span className="text-white text-center">{description}</span>
    </div>
  )
}
