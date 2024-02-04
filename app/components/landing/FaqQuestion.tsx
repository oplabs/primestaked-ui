import { ReactNode } from 'react'

export const FaqQuestion = ({
  question,
  answer
}: {
  question: string,
  answer: string
}) => {
  return (
    <>
      <div className="text-off-black font-medium text-2xl md:text-5xl mt-[50px] md:mt-[90px] text-left w-full">
        {question}
      </div>
      <div className="text-off-black font-medium tracking-[0.14px] text-sm md:text-2.66xl mt-[16px] md:mt-[25px] text-left w-full leading-normal">
        {answer}
      </div>
    </>
  )
}
