import React from 'react'
import { FaCheck } from 'react-icons/fa'

function UserEditButton({
    children,
    type="submit",
    onclick,
    loading,
    ...props
}, ref) {

  return (
    
    <button
    type={type}
    onClick={onclick}
    ref={ref}
    className={`absolute right-0 p-2 bg-black rounded-md top-[30%] text-blue-500 border border-blue-400 hover:bg-blue-900 hover:text-white transition-all duration-200 ${loading && "spinner w-8 h-8 hover:bg-black"}`}>
   {loading ? "" :  <FaCheck/>}
    </button>
  )
}

export default React.forwardRef(UserEditButton)
