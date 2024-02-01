import { Tabs } from '~/components/Tabs'

export default function Index() {
  return (
    <div className="flex justify-center">
      <Tabs
        small
        tabs={[
          { label: 'Stake', href: '/restake' },
          { label: 'Unstake', href: '/restake/unstake' },
          { label: 'Withdraw', href: '/restake/withdraw' }
        ]}
      />
    </div>
  )
}
