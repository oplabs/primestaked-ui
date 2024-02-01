import { Outlet } from '@remix-run/react'
import { Tabs } from '~/components/Tabs'

export default function Index() {
  return (
    <div className="flex flex-col items-center">
      <Tabs
        small
        tabs={[
          { label: 'Stake', href: '/restake' },
          { label: 'Unstake', href: '/restake/unstake' },
          { label: 'Withdraw', href: '/restake/withdraw' }
        ]}
      />
      <Outlet />
    </div>
  )
}
