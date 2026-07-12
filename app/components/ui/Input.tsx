

const Input = ({
     name, type,
     placeholder,
     value, disabled,
     fullwidth } : 
     {
     name: string
     type: string
     placeholder?: string
     value?: string
     disabled?: boolean
     fullwidth?: boolean 
}) => {
    return (
        <input name={name} type={type} placeholder={placeholder} value=
        {value} className={`h-20 bg-transparent border-b text-lg
        sm:text-xl w-4/5 focus:outline-none
        ${disabled && 'opacity-50 cursor-default'}
        ${fullwidth && 'w-full'} self-center`} required/>
    );
};

export default Input