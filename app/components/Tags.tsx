import { Tooltip } from './Tooltip'

import type { Tag } from '~/utils/constants'

export const Tags = ({ tags }: { tags?: Tag[] }) => {
  if (!tags) return null
  return (
    <>
      {tags.map((tag, idx) => {
        const color =
          tag.color === 'red'
            ? 'border-red-500 bg-red-500 text-white'
            : 'text-green-500 border-green-500/30'
        return (
          <div
            key={idx}
            className={`rounded border font-medium ${color} text-xs px-1 py-px flex gap-1`}
          >
            {tag.title}
            {!tag.tooltip ? null : (
              <Tooltip className="p-2 text-xs text-gray-500" placement="right">
                {tag.tooltip}
              </Tooltip>
            )}
          </div>
        )
      })}
    </>
  )
}
