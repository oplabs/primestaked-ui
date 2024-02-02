import { Outlet } from '@remix-run/react'
import { Toggle } from '~/components/Toggle'

export default function Index() {
  return (
    <>
      <Toggle
        tabs={[
          { label: 'Stake', href: '/app/restake' },
          { label: 'Unstake', href: '/app/restake/unstake' },
          { label: 'Withdraw', href: '/app/restake/withdraw' }
        ]}
      />
      <Outlet />
    </>
  )
}
