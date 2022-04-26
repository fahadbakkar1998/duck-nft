const PillButton = (props) => {
  return (
    <div className="relative flex justify-center w-full select-none">
      <div
        className={`
          z-10 absolute 
          border-opacity-40 
          border-2           
          -top-[3px]  p-[2px] border-white  rounded-xl bg-black bg-opacity-50`}
      >
        <div          
          className="relative z-20 text-sm py-1 px-2 bg-gray-400 rounded-lg cursor-pointer active:bg-gray-500"
          onClick={props.onClick}
        >        
          {props.name}        
        </div>
      </div>
    </div>
  );
};

export default PillButton;
