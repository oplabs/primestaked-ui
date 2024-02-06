import alarmSrc from '~/assets/alarm.svg'
import { Tooltip } from '../Tooltip'

export const SideNav = () => {
  return (
    <div>
      <div className="border border-gray-border rounded-3xl p-6 flex flex-col items-center justify-center w-full">
        <img src={alarmSrc} alt="alarm" className="w-8 h-8" />
        <div className="font-bold">Be early!</div>
        <div className="text-gray-500 text-sm text-center">
          Early depositers will earn an XP multiplier on their deposit
        </div>
        <Tooltip>
          <div className="p-6">Blah</div>
        </Tooltip>
      </div>
      <Multiplier />
    </div>
  )
}

const Multiplier = () => {
  const boxSize = 'h-6'
  const boxClass = `${boxSize} bg-blue-500`
  return (
    <div>
      <div className="text-xs text-gray-500 text-center">Bonus multiplier</div>
      <div className="inline-block">
        <div className="grid grid-cols-5 gap-x-2 gap-y-1">
          <div className="font-medium text-gray-500 text-center">5x</div>
          <div className="font-medium text-gray-500 text-center">4x</div>
          <div className="font-medium text-gray-500 text-center">3x</div>
          <div className="font-medium text-gray-500 text-center">2x</div>
          <div className="font-medium text-gray-500 text-center">1x</div>
          <div className={boxClass} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxSize} />
          <div className={boxSize} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxSize} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className={boxClass} />
          <div className="text-xs text-gray-500 text-center">Day 1</div>
          <div className="text-xs text-gray-500 text-center">Day 2</div>
          <div className="text-xs text-gray-500 text-center">Day 3</div>
          <div className="text-xs text-gray-500 text-center">Day 4</div>
          <div className="text-xs text-gray-500 text-center">Day 5</div>
        </div>
        <div className="text-xs text-gray-500 text-center mt-3">Deposit day</div>
      </div>
    </div>
  )
}
