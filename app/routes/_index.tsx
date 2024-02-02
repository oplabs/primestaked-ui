import type { MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    { title: 'Prime Staked ETH' },
    { name: 'description', content: 'Welcome to Prime Staked ETH!' }
  ]
}

export default function Index() {
  return (
    <>
      <h1 className="font-medium text-xl text-center mb-12">Dashboard</h1>
      <div className="border border-gray-border rounded-lg max-w-[600px] mx-auto py-6 px-6">
        <div className="grid grid-cols-3">
          <div className="py-6 flex flex-col items-center border-r border-gray-border">
            <div className="text-sm mb-4 leading-snug">Total ETH Deposited</div>
            <div className="text-2xl font-medium leading-snug">100</div>
          </div>
          <div className="py-6 flex flex-col items-center border-r border-gray-border">
            <div className="text-sm mb-4 leading-snug">OIEGEN Balance</div>
            <div className="text-2xl font-medium">99</div>
          </div>
          <div className="py-6 flex flex-col items-center">
            <div className="text-sm mb-4 leading-snug">Eigen Layer Points</div>
            <div className="text-2xl font-medium leading-snug">1,452</div>
          </div>
        </div>
        <div className="bg-gray-bg4 py-2 px-4 mt-8 grid grid-cols-[auto,auto,auto,auto]">
          <div className="p-2 border-b-2 border-off-black text-xs text-gray-500">
            Restaked Asset
          </div>
          <div className="p-2 border-b-2 border-off-black text-xs text-gray-500">
            Total Deposited
          </div>
          <div className="p-2 border-b-2 border-off-black text-xs text-gray-500">
            USD Value
          </div>
          <div className="p-2 border-b-2 border-off-black text-xs text-gray-500">
            Points Earned
          </div>

          <div className="p-2 text-sm">stETH</div>
          <div className="p-2 text-sm">100 ETH</div>
          <div className="p-2 text-sm">$339,257.19</div>
          <div className="p-2 text-sm">523</div>
        </div>
      </div>
    </>
  )
}
