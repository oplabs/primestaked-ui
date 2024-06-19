import { captureRemixErrorBoundaryError } from '@sentry/remix'
import type { LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

import './tailwind.css'
import { useReferrerTracker } from './utils/useReferrerTracker'
import { DepositsCountdown } from '~/components/DepositsCountdown'

globalThis.process = globalThis.process ?? { env: {} }
const queryClient = new QueryClient()

export const links: LinksFunction = () => [
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
        <QueryClientProvider client={queryClient}>
          <DepositsCountdown />
          <Outlet />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
