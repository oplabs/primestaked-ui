import { Link } from '@remix-run/react'
import ethLogoSrc from '~/assets/ETH.svg'

export const DepositsCountdown = () => {
  return (
    <div className="bg-black py-6 sm:py-8 w-full text-white flex px-4 md:px-8 lg:px-12 flex-col sm:flex-row items-center gap-4 sm:gap-8">
      <div className="min-w-0">
        <img src={ethLogoSrc} alt="eigenLayer" className="w-8 sm:w-12" />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start sm:gap-x-4">
        <div className="text-lg sm:text-xl font-medium leading-relaxed text-center sm:text-left">
          Native ETH Restaking is Live!
        </div>
        <div className="text-sm sm:text-lg text-balance leading-snug text-center sm:text-left">
          Earn more EigenLayer points and get a{' '}
          <span className="font-bold">1.5X boost</span> on your{' '}
          <span className="text-red-500">primeETH</span> XP.
        </div>
      </div>
      <Link
        to="/app/stake"
        className="px-4 sm:px-8 py-2 sm:py-3 rounded-full leading-tight font-medium hover:bg-white hover:text-black transition-all duration-200 ease-in-out border border-white flex items-center gap-2"
      >
        Start Earning
      </Link>
    </div>
  )
}
