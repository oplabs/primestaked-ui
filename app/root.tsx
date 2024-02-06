import { captureRemixErrorBoundaryError } from '@sentry/remix'
import type { LinksFunction } from '@remix-run/cloudflare'
import {
  Links, // LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import rainbowStyles from '@rainbow-me/rainbowkit/styles.css'

import styles from './tailwind.css'
import { config } from '~/utils/wagmi'
import { useReferrerTracker } from './utils/useReferrerTracker'

globalThis.process = globalThis.process ?? { env: {} }
const queryClient = new QueryClient()

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: rainbowStyles },
  { rel: 'icon', href: '/favicon.png', type: 'image/png' },
]

export const ErrorBoundary = () => {
  const error = useRouteError()
  captureRemixErrorBoundaryError(error)
  return <div>Something went wrong</div>
}

export default function App() {
  useReferrerTracker('Origin')
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Outlet />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  )
}
