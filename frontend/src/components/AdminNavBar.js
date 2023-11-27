import React from 'react'
import { signOut, useSession } from 'next-auth/react';

const NavBar = () => {
  return (
    <>
      <div className='w-[16rem] h-[100vh] p-8 mr-4 flex flex-col justify-start items-start space-y-5 bg-gray-300'>
        <h2 className='text-semibold text-2xl text-start'>Home</h2>
        <ul className='text-lg space-y-3'>
          <li className='cursor-pointer'>Activities</li>
          <li className='cursor-pointer'>Reports</li>
        </ul>
        <div className='border-b-1'></div>
        <ul className='text-lg space-y-3'>
          <li className='cursor-pointer'>Instruction pdf</li>
          <li className='cursor-pointer'>About</li>
          <li onClick={signOut} className='cursor-pointer'>Log out</li>
        </ul>
      </div>
    </>
  )
}

export default NavBar