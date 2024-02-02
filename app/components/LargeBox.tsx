import { ReactNode } from 'react'

export const LargeBox = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className="border border-gray-border rounded-3xl bg-gray-bg1 w-full max-w-[540px]">
      <div className="py-6 px-6 border-b border-gray-border">{title}</div>
      {children}
    </div>
  )
}
