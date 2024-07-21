import React,{useId} from 'react'

const UserEditInput = React.forwardRef(({
    label,
    type="text",
    ...props
},ref)=>{
    const id = useId()
    return (
       <div className='flex flex-col'>
        {label && <label
        className={`text-xs font-medium text-gray-400`}
        htmlFor={id}>
            {label}
        </label>}
        <input 
        type={type} 
        className={`p-2 bg-black text-white border-b rounded-none focus:outline-none`}
        ref={ref} // ref pass from there and give state's access to that component
        {...props}
        id={id}
        />
       </div>
    )
})

export default UserEditInput