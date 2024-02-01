import type { MetaFunction } from '@remix-run/cloudflare'
// import { useAccount } from 'wagmi'
// import { ConnectButton } from '@rainbow-me/rainbowkit'

export const meta: MetaFunction = () => {
  return [
    { title: 'OEigen' },
    { name: 'description', content: 'Welcome to OEigen!' }
  ]
}

export default function Index() {
  // const { address } = useAccount()
  return <>Dashboard</>
}
