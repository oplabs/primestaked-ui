import { ReactNode } from 'react'

export const Token = ({
  iconSrc,
  text,
  isActive
}: {
  iconSrc: string,
  text: string,
  isActive: bool
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${!isActive ? 'opacity-10' : ''}`}>
      <img src={iconSrc}/>
      <div className="text-sm mt-2 md:text-4.5xl text-black text-center">{text}</div>
    </div>
  )
}
