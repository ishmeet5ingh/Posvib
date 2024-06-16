import React from 'react'

function AuthContainer({children, inup}) {
  return (
    <div className=' sm:w-96  pb-20 sm:pb-0 min-h-screen flex items-center flex-col  gap-5'>
    <div className='underline underline-offset-4'>
      
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight text-white">
        Sign {inup} to your account
      </h2>
      <div className='bg-white py-4 px-5 rounded-md'>
      {children}
      </div>
    </div>
  )
}

export default AuthContainer