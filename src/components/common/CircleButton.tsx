



const CircleButton = ({onClick}) => {
  return (
    <div className="relative flex justify-center w-full">
      <div 
        className={`
          z-10 absolute 
          border-opacity-30 
          border-2 
          
          -top-[2px]  border-white h-[56px]  w-[55px] rounded-full bg-black bg-opacity-50`} />
      <div
        className="relative z-20 myButton w-11 glowy"
        onClick={onClick}
      >
        {/* <img className="btn-img" alt="" src="/assets/images/pencil.png" /> */}
      </div>
    </div>
  )
}

export default CircleButton;