import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'

import landingSrc from '~/assets/landing.jpg'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' }
  ]
}

export default function Marketing() {
  return (
    <Link to="/app/restake">
      <img
        src={landingSrc}
        alt="Landing page"
        className="max-w-[1700px] mx-auto"
      />
    </Link>
  )
}
