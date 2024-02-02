import type { MetaFunction } from '@remix-run/cloudflare'

import dashboardSrc from '~/assets/dashboard.jpg'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' }
  ]
}

export default function Index() {
  return (
    <>
      <img
        src={dashboardSrc}
        alt="Dashboard"
        className="mx-auto max-w-[840px]"
      />
    </>
  )
}
