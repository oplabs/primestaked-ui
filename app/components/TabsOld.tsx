import { useRef, useState } from 'react'

import { animated, useSpring } from '@react-spring/web'
import { Link, useLocation } from 'react-router-dom'

const underlineClass = `absolute left-0 right-0 h-[2px] bg-blue-gradient -bottom-px rounded-full`
const underlineHoverClass = `absolute left-0 right-0 h-[2px] bg-blue-gradient opacity-0 group-hover:opacity-100 brightness-50 -bottom-px rounded-full transition-all duration-200 ease-in-out`

interface TabsProps {
  tabs: {
    label: string
    href: string
  }[]
  className?: string
  small?: boolean
}

export const Tabs = (props: TabsProps) => {
  const location = useLocation()
  const activeTab = props.tabs.findIndex((tab) =>
    location.pathname.startsWith(tab.href)
  )

  const ref = useRef<HTMLDivElement>(null)
  const [springProps, setSpringProps] = useState({
    from: { left: 0, width: 0 },
    to: { left: 0, width: 0 }
  })
  const [interacted, setInteracted] = useState(false)

  const style = useSpring(springProps)

  function setActive(idx: number) {
    if (!ref.current) {
      return
    }
    setInteracted(true)
    const parentRect = ref.current.getBoundingClientRect()
    const childEl = ref.current.childNodes[idx] as HTMLElement
    const rect = childEl?.getBoundingClientRect()
    const activeEl = ref.current.childNodes[activeTab] as HTMLElement
    const activeRect = activeEl?.getBoundingClientRect()
    if (rect && activeRect) {
      setSpringProps({
        from: { left: activeRect.x - parentRect.x, width: activeRect.width },
        to: { left: rect.x - parentRect.x, width: rect.width }
      })
    }
  }

  return (
    <div
      ref={ref}
      className={`${props.className || 'flex'} items-center ${
        props.small ? 'gap-12' : 'gap-10'
      } relative`}
    >
      {props.tabs.map((tab, idx) => (
        <Link
          key={idx}
          to={tab.href}
          className={`${
            props.small ? 'py-3 text-xs font-medium' : 'py-6'
          } relative transition-all duration-200 ease-in-out group${
            activeTab === idx ? '' : ' text-gray-500 hover:text-off-white'
          }`}
          onClick={() => setActive(idx)}
        >
          {tab.label}
          {interacted || activeTab !== idx ? null : (
            <div className={underlineClass} />
          )}
          {activeTab === idx ? null : <div className={underlineHoverClass} />}
        </Link>
      ))}
      {!interacted ? null : (
        <animated.div style={style} className={underlineClass} />
      )}
    </div>
  )
}
