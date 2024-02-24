import { Link } from '@remix-run/react'
import ethLogoSrc from '~/assets/ETH.svg'

export const DepositsCountdown = () => {
  return (
    <div className="bg-black py-6 sm:py-5 w-full text-white flex px-4 md:px-8 flex-col sm:flex-row items-center gap-4 sm:gap-8">
      <div className="min-w-0">
        <img src={ethLogoSrc} alt="eigenLayer" className="h-[70px]" />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row flex-wrap sm:items-baseline justify-center sm:justify-start sm:gap-x-12">
        <div className="text-lg sm:text-2xl font-medium leading-relaxed text-center sm:text-left">
          Native ETH Restaking is Live!
        </div>
        <div className="text-xs sm:text-lg text-balance leading-snug text-center sm:text-left mt-2 sm:mt-0">
          Earn more EigenLayer points and get a{' '}
          <span className="font-bold">1.5X boost</span> on your{' '}
          <span className="text-red-500">primeETH</span> XP.
        </div>
      </div>
      <Link
        to="/app/stake"
        className="mt-3 sm:mt-0 sm:mr-5 px-20 py-3 text-sm rounded-full leading-tight font-medium hover:bg-white hover:text-black transition-all duration-200 ease-in-out border border-white flex items-center gap-2"
      >
        Start Earning
      </Link>
    </div>
  )
}
