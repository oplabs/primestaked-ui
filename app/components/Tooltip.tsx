import { useState, useRef, ReactNode } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
} from '@floating-ui/react'
import { animated, useTransition } from '@react-spring/web'

import { CircleInfo } from './Icons'

export function Tooltip({
  children,
  size = 14,
  placement = 'top',
  className = 'p-3 text-sm',
}: {
  children: ReactNode
  size?: number
  placement?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -5, scale: 0.95 },
    enter: { opacity: 1, y: 0, scale: 1 },
    leave: { opacity: 0, y: -5, scale: 0.95 },
  })

  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(7),
      flip({ fallbackAxisSideDirection: 'start' }),
      shift(),
      arrow({ element: arrowRef }),
    ],
  })

  // Event listeners to change the open state
  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  // Role props for screen readers
  const role = useRole(context, { role: 'tooltip' })

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        <CircleInfo size={size} />
      </button>
      <FloatingPortal>
        {transitions(
          (styles, item) =>
            item && (
              <animated.div
                className={`bg-white border border-gray-border shadow-xl rounded-lg relative leading-tight max-w-[300px] z-20 ${className}`}
                ref={refs.setFloating}
                style={{ ...floatingStyles, ...styles }}
                {...getFloatingProps()}
              >
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  className="fill-white [&>path:first-of-type]:stroke-gray-border"
                />
                {children}
              </animated.div>
            ),
        )}
      </FloatingPortal>
    </>
  )
}
