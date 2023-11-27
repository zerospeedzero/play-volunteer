'use client';
import { useEffect } from 'react'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();  
  useEffect(() => {
    if (session == null) return;
    console.log('session.jwt', session.jwt);
  }, [session]);

  return (
    <>
      <div className='h-22 p-4 flex flex-row justify-between items-center'>
        <div>
          <img className='h-12' src='/images/logo.png' alt='logo'/>
        </div>
        {session && (
            <div> Hello {session.user.email}</div>
         )}
         {session && (
          <span className='w-[2rem] h-[2rem] rounded-full bg-gray-400 text-center align-middle'>P</span>
         )} 
      </div>
    </>
  )
}

export default Header