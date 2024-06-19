// import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'PrimeStakedETH',
  projectId: 'b6187205b37dc9d704772f16dca5b71e',
  chains: [mainnet],
  ssr: true,

  // transports: {
  //   [mainnet.id]: http(
  //     `URL`
  //   ),
  //   // [mainnet.id]: http('http://localhost:8545')
  // },
})
