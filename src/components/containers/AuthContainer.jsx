import React from 'react'

function AuthContainer({children, inup}) {
  return (
    <div className=' sm:w-96 min-h-screen flex items-center flex-col text-white  py-10 gap-5'>
    <div className='underline underline-offset-4'>
      
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight">
        Sign {inup} to your account
      </h2>
      {children}
    </div>
  )
}

export default AuthContainer