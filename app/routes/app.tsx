import { Outlet } from '@remix-run/react'
import { Nav } from '~/components/Nav'

import type { MetaFunction } from '@remix-run/cloudflare'
import { useReadContracts } from 'wagmi'

import {
  lrtOracleAbi,
  rsETHABI,
  oracleAbi,
  lrtDepositPoolAbi
} from '~/utils/abis'
import { contracts, assets } from '~/utils/constants'
import { formatEth, formatUSD } from '~/utils/bigint'

import { StatBox, StatBoxItem } from '~/components/StatBox'
import { Tabs } from '~/components/Tabs'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' }
  ]
}

export default function Index() {
  const { data } = useReadContracts({
    contracts: [
      {
        abi: lrtOracleAbi,
        address: contracts.lrtOracle,
        functionName: 'rsETHPrice'
      },
      {
        abi: rsETHABI,
        address: contracts.rsETH,
        functionName: 'totalSupply'
      },
      {
        abi: oracleAbi,
        address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
        functionName: 'latestAnswer'
      },
      ...assets.map(({ symbol }) => ({
        abi: lrtDepositPoolAbi,
        address: contracts.lrtDepositPool,
        functionName: 'getTotalAssetDeposits',
        args: [contracts[symbol]]
      }))
    ]
  })

  if (!data) return null

  const rsETHPrice = data[0].result
  const tvl = (rsETHPrice * data[1].result) / 10n ** 18n
  const tvlUsd = (tvl * data[2].result) / 10n ** 8n

  return (
    <>
      <Nav />
      <div className="w-full flex px-6 items-start">
        <Tabs
          tabs={[
            { label: 'Restake', href: '/app/restake' },
            { label: 'Dashboard', href: '/app/dashboard' }
          ]}
        />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Outlet />
        </div>
        <div className="w-[300px] flex flex-col gap-8 pb-12">
          <StatBox title="primeETH Stats">
            <StatBoxItem
              label="TVL"
              value={`${formatEth(tvl)} ETH`}
              description={`$${formatUSD(tvlUsd)}`}
            />
            <StatBoxItem label="EigenLayer Points" value="-" />
            <StatBoxItem label="PrimeStaked Points" value="-" />
          </StatBox>
          <StatBox title="Assets Deposited">
            {assets.map(({ symbol }, i) => (
              <StatBoxItem
                key={i}
                label={symbol}
                value={formatEth(data[i + 3].result)}
              />
            ))}
          </StatBox>
        </div>
      </div>
    </>
  )
}
