import React,{useId} from 'react'

const Input = React.forwardRef(({
    label,
    type="text",
    className='',
    ...props
},ref)=>{
    const id = useId()
    return (
       <div className='flex flex-col'>
        {label && <label
        className=' text-xs font-medium '
        htmlFor={id}>
            {label}
        </label>}
        <input 
        type={type} 
        className={`text-black p-2   border border-blue  rounded-md bg-blue-200 active:bg-blue-200`}
        ref={ref} // ref pass from there and give state's access to that component
        {...props}
        id={id}
        />
       </div>
    )
})

export default Input