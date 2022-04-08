



const RectButton = ({onClick, children}) => {
  return (
    <div className="relative flex justify-center items-center text-center w-full">      
      <div
        className="relative z-20 rectButton"
        onClick={onClick}
      >        
        {children}
      </div>
    </div>
  )
}

export default RectButton;