import { useTime } from 'react-time-sync'

import { Countdown } from '~/components/Countdown'
import { ArrowUpRight } from '~/components/Icons'
import { depositsEndDate } from '~/utils/constants'
import eigenLogoSrc from '~/assets/eigen-logo.svg'

export const DepositsCountdown = () => {
  const now = useTime() * 1000
  const ended = now >= depositsEndDate.getTime()
  return (
    <div className="bg-black py-6 sm:py-8 w-full text-white flex px-4 md:px-8 lg:px-12 flex-col sm:flex-row items-center gap-4 sm:gap-8">
      <div className="min-w-0">
        <img src={eigenLogoSrc} alt="eigenLayer" className="w-8 sm:w-12" />
      </div>
      {ended ? (
        <>
          <div className="flex-1 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start sm:gap-x-4">
            <div className="text-lg sm:text-xl font-medium leading-relaxed text-center sm:text-left">
              EigenLayer Deposits Have Closed
            </div>
            <div className="text-sm sm:text-lg text-balance leading-snug text-center sm:text-left">
              Follow us on social media to stay up to date on deposits.
            </div>
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/primestaked"
            className="px-4 sm:px-8 py-2 sm:py-3 rounded-full leading-tight font-medium hover:bg-white hover:text-black transition-all duration-200 ease-in-out border border-white flex items-center gap-2"
          >
            Visit PrimeStaked on X
            <span className="text-red-500">
              <ArrowUpRight size={11} />
            </span>
          </a>
        </>
      ) : (
        <>
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
            <Countdown to={depositsEndDate} />
          </div>
        </>
      )}
    </div>
  )
}
