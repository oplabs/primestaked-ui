import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { Link } from '@remix-run/react'
import { useAccount } from 'wagmi'

import Logo from '~/assets/prime-staked.svg'
import { ProfileIcon, ArrowUpRight } from '~/components/Icons'
import { truncateAddress } from '~/utils/string'

export const Nav = () => {
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()

  return (
    <div className="mb-8 sm:mb-10">
      <div className="px-3 sm:px-6 mx-auto flex items-center gap-12 py-6">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[125px] sm:w-[175px]" />
        </Link>
        {/* <NavTabs className="hidden sm:flex justify-between" /> */}
        <div className="hidden sm:flex items-center justify-between gap-4 ml-auto">
          {/* <button className="btn-secondary px-6 py-3">
            <span className="hidden sm:inline">{'View on '}</span>IPFS
          </button> */}
          <a
            href="https://docs.primestaked.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary px-4 py-1.5 text-sm flex items-center gap-2 font-medium self-stretch text-gray-500"
          >
            Docs
            <ArrowUpRight size={11} />
          </a>

          {isConnected ? (
            <button
              className="btn-secondary pl-1.5 pr-4 py-1.5 text-sm flex items-center gap-3 font-medium self-stretch text-gray-500"
              onClick={openAccountModal}
            >
              <div className="rounded-full overflow-hidden">
                <ProfileIcon />
              </div>
              <div>{truncateAddress(address)}</div>
            </button>
          ) : (
            <button className="btn px-6 py-3" onClick={openConnectModal}>
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
