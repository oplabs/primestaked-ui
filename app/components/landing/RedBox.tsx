export const RedBox = ({
  iconSrc,
  text,
}: {
  iconSrc: string
  text: string
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-red-500 rounded-[30px] shadow-[0px_2px_5px_0px_#00000012] h-[150px]">
      <div className="w-1/3 flex items-center justify-end pr-6">
        <img src={iconSrc} alt="Icon" className="h-[62px]" />
      </div>
      <div className="flex-1 font-bold text-2xl text-white pl-3 pr-6">{text}</div>
    </div>
  )
}
