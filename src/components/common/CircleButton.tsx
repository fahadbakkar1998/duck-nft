const CircleButton = (props) => {
  return (
    <div className="relative flex justify-center w-full select-none">
      <div
        className={`
          z-10 absolute           
          border-2           
          -top-[3px]  border-gray-600 h-[52px]  w-[52px] rounded-full bg-black `}
      />
      <div
        className="relative z-20 circle-button w-11 rounded-full"
        onClick={props.onClick}
      >
        <div className="flex justify-center items-center">          
          <img className="mt-1 w-6 h-6" alt="" src={props.image} />        
        </div>
        {props.name}
        {props.children}
      </div>
    </div>
  );
};

export default CircleButton;
