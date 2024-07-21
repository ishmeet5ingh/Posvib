import React,{useId} from 'react'

const Input = React.forwardRef(({
    label,
    type="text",
    className='',
    InputCss='',
    labelColor='',
    ...props
},ref)=>{
    const id = useId()
    return (
       <div className='flex flex-col'>
        {label && <label
        className={`text-sm mb-1 font-medium ${labelColor}`}
        htmlFor={id}>
            {label}
        </label>}
        <input 
        type={type} 
        className={`text-gray-200 text-sm
        focus:outline-none border mb-1 border-teal-950 focus:bg-[#121212]  bg-[#121212]  p-2 rounded-md ${InputCss}`}
        ref={ref} // ref pass from there and give state's access to that component
        {...props}
        id={id}
        />
       </div>
    )
})

export default Input