import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { TooltipToast } from './Tooltip'
import { hexToBase62 } from '~/utils/base62'

export const CopyReferrerLink = ({
  className = 'btn-outline text-sm py-3 px-4',
}: {
  className?: string
}) => {
  const { isConnected, address } = useAccount()
  const [urlOrigin, setUrlOrigin] = useState('')
  useEffect(() => {
    if (typeof window === 'undefined') return
    setUrlOrigin(window.location.origin)
  }, [])

  const referralLink = address
    ? `${urlOrigin}/app/restake?r=${hexToBase62(address)}`
    : ''

  return (
    <TooltipToast
      text={isConnected ? 'Link copied!' : 'Please connect your wallet first'}
      placement="bottom"
      className="p-2 text-xs"
    >
      <button
        className={className}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(referralLink)
          } catch (err) {
            console.error('Failed to copy text: ', err)
          }
        }}
      >
        Copy Referral Link
      </button>
    </TooltipToast>
  )
}
