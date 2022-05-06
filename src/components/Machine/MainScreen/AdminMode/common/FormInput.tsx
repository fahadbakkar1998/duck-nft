import { FC, ChangeEvent } from 'react';


interface FormInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  overlay?: string;  
  className?: string;
}

const FormInput: FC<FormInputProps> = ({ value, overlay, onChange, className }) => {
  return (
    <div className={`flex space-x-2 items-center relative ${className}`}>
      <input 
        type="text"
        className={`
          focus:outline-none focus:border-2
          w-full h-full border border-opacity-20 bg-transparent text-xl text-right px-2
          ${overlay ? 'pr-10' : ''}
        `} 
        onChange={onChange}
        value={value}
      />
      { overlay && <div className="absolute text-xl opacity-50 right-2">{overlay}</div> }
    </div> 
  )
}

export default FormInput;