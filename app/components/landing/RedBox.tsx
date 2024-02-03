import { ReactNode } from 'react'

export const RedBox = ({
  iconSrc,
  text
}: {
  iconSrc: string,
  text: string
}) => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row bg-red-500 py-[29px] md:py-[62px] px-[37px] md:px-[48px] rounded-[30px] shadow-[0px_2px_5px_0px_#00000012]">
      <img src={iconSrc}/>
      <div className="mt-[18px] md:mt-0 md:ml-[22px] font-bold text-2xl md:text-3xl text-white text-center md:text-left">{text}</div>
    </div>
  )
}
