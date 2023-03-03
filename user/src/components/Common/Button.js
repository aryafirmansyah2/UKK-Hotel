
const Button = ({ children, className, onClick }) => {
    return (
      <button type="submit"
        className={`p-2 rounded-md hover:ring-2 hover:ring-gray-300 ${className}`}
        onClick={onClick}
      >{children}</button>
    )
  }
  
  export default Button