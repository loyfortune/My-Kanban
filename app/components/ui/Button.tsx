

const Button = ({text, type, onClick, disabled, regularButton, confirmButton, deleteButton}: {
    text: string
    type: "button" | "submit" | "reset"
    onClick?: () => void
    disabled?: boolean
    confirmButton?: boolean
    deleteButton?: boolean
    regularButton?: boolean
}) => {
    return (
        <>
            <button disabled={disabled} onClick={onClick} type={type} 
            className={`inline-flex h-10 rounded-md dark:bg-gray-800 dark:text-gray-200
            text-gray-700 px-8 shadow transition-colors duration-500 dark:hover:bg-gray-800 
            hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950
            items-center cursor-pointer ${disabled && 'opacity-50'}
            ${deleteButton && 'bg-red-500 text-white hover:bg-red-500/80'}
            ${confirmButton && 'bg-green-500 text-white hover:bg-green-500/80'}
            ${regularButton && 'bg-white'}`}>
                {text}
            </button>
        </>
    );
};

export default Button;