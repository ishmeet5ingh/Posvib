import React from 'react'

function AuthContainer({children, inup, pb=""}) {
  return (
    <div className={`w-full pb-20  ${inup === "in" ? "pt-28": "pt-10"}  sm:pb-0  flex items-center justify-center sm:justify-start sm:items-start  sm:pl-24 aflex-col`}>
    <div className="border py-4 px-5 arounded-lg border-teal-900 w-9/12 xs:w-8/12 sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
    <h2 className="text-center text-2xl font-bold leading-tight text-white pb-4">
        Sign {inup} to your account
      </h2>
      <div className='rounded-md'>
      {children}
      </div>
    </div>
    </div>
  )
}

export default AuthContainer