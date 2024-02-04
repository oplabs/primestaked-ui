import { Tabs } from '../Tabs'

export const SideNav = () => {
  return (
    <Tabs
      tabs={[
        { label: 'Restake', href: '/app/restake' },
        { label: 'Dashboard', href: '/app/dashboard' }
      ]}
    />
  )
}
