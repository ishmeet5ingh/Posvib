import React from 'react'
import posvibLogo from '../../public/PosvibText.png'

function Logo() {
  return (
    
    <div>
    {/* Logo */}
    <img 
      src={posvibLogo}
      className='w-16 xs:w-20 md:w-20 lg:w-24'
      alt="" />
    </div> 

  )
}

export default Logo