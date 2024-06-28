import Logo from '~/assets/prime-eth-token.svg'
import YieldNest from '~/assets/yieldnest.svg'
import YNSeed from '~/assets/yn-seed.svg'
import Airdrop from '~/assets/airdrop.svg'
import YNToken from '~/assets/yn-token.svg'
import ExternalArrow from '~/assets/external-arrow.svg'

const cards = [
  {
    icon: Airdrop,
    title: 'Participate in the YieldNest Airdrop',
    description:
      'Mint primeETH with OETH and get whitelisted for the upcoming YieldNest Airdrop.',
  },
  {
    icon: YNSeed,
    title: '5% bonus on YieldNest Seeds',
    description:
      'primeETH holders who migrate to ynLSD will receive a 5% Seeds (points) boost for Season 1 airdrop',
  },
  {
    icon: YNToken,
    title: 'YieldNest Pioneer NFT',
    description:
      'Migrate at least 5 primeETH to receive the Pioneer NFT which gives you a permanent 15% Seeds (points) boost for all airdrop seasons',
  },
]

export const YieldNestBanner = () => {
  return (
    <div className="flex flex-col align-middle bg-black py-16 px-8">
      <div className="flex flex-row items-center justify-center pb-8">
        <img className="w-[80px] sm:w-[120px]" alt="primeETH" src={Logo} />
        <img
          className="w-[80px] sm:w-[120px] ml-[-30px]"
          alt="Yield-nest"
          src={YieldNest}
        />
      </div>
      <span className="text-white text-5xl text-center font-medium pb-8">
        PrimeStaked is merging with YieldNest!
        <br />
        Migration coming soon.
      </span>
      <span className="text-white text-2xl text-center font-medium pb-8">
        PrimeStaked XP holders are eligible for an exclusive YND airdrop.
      </span>
      <div className="flex flex-col md:flex-row align-middle justify-center w-full gap-8 pb-16">
        {cards.map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-8 px-28">
        <a
          href="https://www.yieldnest.finance/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row flex-flex-nowrap items-center gap-1 btn px-20 py-5 text-lg hover:cursor-pointer whitespace-nowrap"
        >
          Learn more&nbsp;
          <img src={ExternalArrow} alt="external" className="w-4" />
        </a>
        <a
          href="https://www.yieldnest.finance/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row flex-flex-nowrap items-center gap-1 btn-alert px-20 py-5 text-lg hover:cursor-pointer whitespace-nowrap"
        >
          Visit YieldNest&nbsp;
          <img src={ExternalArrow} alt="external" className="w-4" />
        </a>
      </div>
    </div>
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
      <img className="w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] mx-auto" alt={title} src={icon} />
      <span className="text-white text-center text-2xl">{title}</span>
      <span className="text-white text-center">{description}</span>
    </div>
  )
}
