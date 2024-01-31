import type { MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    { title: 'OEigen' },
    { name: 'description', content: 'Welcome to OEigen!' }
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>OEigen! test - test</h1>
    </div>
  )
}
