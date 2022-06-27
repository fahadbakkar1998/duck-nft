/* eslint-disable react/prop-types */
const CircleButton = (props) => {
  return (
    <div className="relative flex justify-center w-full select-none">
      <div
        className={`
          z-10 absolute           
          border        
          -top-[3px]  border-gray-600 h-[52px]  w-[52px] rounded-full bg-gray-900`}
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

export const SmallCircleButton = (props) => {
  return (
    <div className="relative select-none mb-[1px]">
      <div
        className={`
          z-10 absolute           
          border      
          -top-[1px]
          -left-[1px]  border-gray-600 h-[29px]  w-[30px] rounded-md bg-gray-900`}
      />
      <div
        className="relative z-20 circle-button small w-11 rounded"
        onClick={props.onClick}
      >
        <div className="flex justify-center items-center">
          <img className="mt-[1px] opacity-90 w-4 h-4" alt="" src={props.image} />
        </div>
      </div>
    </div>
  );
};

export default CircleButton;
