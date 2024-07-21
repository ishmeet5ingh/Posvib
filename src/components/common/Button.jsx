import React from 'react'

function Button({
    children,
    type="button",
    className='',
    bgColor="text-white  bg-blue-600 hover:bg-blue-500",
    ...props
}) {
  return (
    <button
    type={type} 
    className={` text-white ${bgColor} duration-200 ${className}`}
    {...props}
    >{children}</button>
  )
}

export default Button