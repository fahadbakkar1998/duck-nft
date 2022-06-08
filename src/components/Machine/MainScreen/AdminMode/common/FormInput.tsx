import { FC, ChangeEvent } from 'react';

interface FormInputProps {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  overlay?: string;
  className?: string;
  placeholder?: string;
}

const FormInput: FC<FormInputProps> = ({ value, overlay, onChange, className, placeholder }) => {
  return (
    <div className={`flex space-x-2 items-center relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        className={`
          py-1
          focus:outline-none focus:border-2
          w-full h-full border border-opacity-20 bg-transparent text-xl text-left px-2
          ${overlay ? 'pr-10' : ''}
        `}
        onChange={onChange}
        value={value}
      />
      { overlay && <div className="absolute text-xl opacity-50 right-2">{overlay}</div> }
    </div>
  );
};

export default FormInput;
