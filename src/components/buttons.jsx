export default function MyButton({ color="CCF32F", children, className = "" }) {
    return(
        <button 
            style={{ backgroundColor: `#${color}` }}
            className={`p-3 px-6 rounded-3xl text-black font-semibold hover:opacity-70 transition delay-50 ease-in ${className}`}
        >
            {children}
        </button>
    )
}