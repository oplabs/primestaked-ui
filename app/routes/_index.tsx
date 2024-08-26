import type { MetaFunction } from '@remix-run/cloudflare'

import { Footer } from '~/components/landing/Footer'
import { YieldNestBanner } from '~/components/YieldNestBanner'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' },
  ]
}

export default function Marketing() {
  return (
    <>
      <YieldNestBanner />

      <Footer />
    </>
  )
}
