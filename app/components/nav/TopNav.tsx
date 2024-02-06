import { useEffect, useState } from 'react'
import { Link, NavLink } from '@remix-run/react'

import Logo from '~/assets/prime-staked.svg'
import MenuIcon from '~/assets/menu.svg'
import LogoMobile from '~/assets/prime-staked-nav.svg'
import { ConnectButton } from './ConnectButton'
import { DocsLink } from './DocsLink'
import { SideNav } from './SideNav'
import { ArrowUpRight } from '~/components/Icons'

import { useLocation } from 'react-router-dom'

export const TopNav = () => {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="px-3 sm:px-3 mx-auto flex items-center md:gap-12 py-6">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="w-[125px] hidden md:inline sm:w-[175px]"
          />
          <img src={LogoMobile} alt="logo" className="md:hidden w-[33px]" />
        </Link>

        <MobileMenu />
        <DesktopMenu />
      </div>
    </div>
  )
}

const DesktopMenu = () => {
  const baseClass = 'text-sm font-medium'
  const activeClass = `${baseClass} text-black`
  const inactiveClass = `${baseClass} text-gray-500 hover:text-black`
  return (
    <>
      {/* <NavTabs className="hidden sm:flex justify-between" /> */}
      <div className="hidden sm:flex justify-between items-center text-lg gap-8">
        <NavLink
          to="/app/restake"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Restake
        </NavLink>
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Dashboard
        </NavLink>
        <a
          href="https://docs.primestaked.com"
          target="_blank"
          rel="noreferrer"
          className={`${inactiveClass} flex items-center gap-2`}
        >
          Docs
          <ArrowUpRight size={11} />
        </a>
      </div>
      <div className="hidden md:flex items-center justify-between gap-4 ml-auto">
        <ConnectButton />
      </div>
    </>
  )
}

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  useEffect(() => {
    document
      .querySelector('body')
      ?.setAttribute('style', showMenu ? 'overflow: hidden' : '')
    document
      .querySelector('[data-rk]')
      ?.setAttribute('style', showMenu ? 'overflow: hidden' : '')
  }, [showMenu])

  return (
    <div className="md:hidden ml-auto flex flex-row gap-2">
      <ConnectButton />

      <button
        type="button"
        className="btn-secondary px-1.5 py-1.5 text-sm flex justify-center items-center gap-2 font-medium self-stretch text-gray-500 w-[44px]"
        onClick={(e) => {
          e.preventDefault()
          setShowMenu(!showMenu)
        }}
      >
        <img src={MenuIcon} width={20} />
      </button>

      <div
        className={`${
          showMenu ? 'opacity-90 z-50' : 'z-[-1] opacity-0'
        } transition-opacity ease-in duration-300 delay-100 fixed top-0 bottom-0 left-0 right-0 cursor-pointer bg-gray-950`}
        onClick={() => {
          setShowMenu(false)
        }}
      />
      <div
        className={`${
          showMenu ? 'left-0 z-50' : 'z-[-1] left-[-100%]'
        } ease-in duration-300 delay-100 absolute w-[300px] top-0 left-0 bottom-0 bg-white flex flex-col px-4 py-4`}
        style={{
          transitionProperty: 'left',
        }}
      >
        <Link to="/" className="mb-8">
          <img src={Logo} alt="logo" className="w-[175px]" />
        </Link>
        <SideNav />
        <div className="mt-auto mr-auto">
          <DocsLink />
        </div>
      </div>
    </div>
  )
}
