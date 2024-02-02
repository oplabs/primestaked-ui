import { ReactNode } from 'react'

export const StatBox = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className="border border-gray-border rounded-xl bg-gray-bg1 font-medium">
      <div className="py-6 px-6 border-b border-gray-border">{title}</div>
      <div className="p-6 flex flex-col gap-6">{children}</div>
    </div>
  )
}

export const StatBoxItem = ({
  label,
  value,
  description
}: {
  label: string
  value: ReactNode
  description?: ReactNode
}) => {
  return (
    <div>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="">{value}</div>{' '}
      {description && (
        <div className="text-gray-500 text-sm">{description}</div>
      )}
    </div>
  )
}
