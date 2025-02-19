import { X } from 'lucide-react'
import React from 'react'

const MobileNav = () => {
  return (
    <div className='h-screen w-[100vw] bg-white fixed top-0 left-0 '>
      <div className='flex h-full w-full justify-between w-full'>
        <div className='flex flex-col gap-3 pl-4 pt-10 w-[60%]'>
            <div className='flex flex-col gap-3 items-start'>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Cricketify
                </span>
                <hr className='bg-gray outline-none h-0.5 w-full'/>
                <a href=''>Venue</a>
                <a>About Us</a>
                <a>Contact Us</a>
                <hr className='bg-gray outline-none h-0.5 w-full'/>
            </div>
            <button className='px-3 py-1 bg-emerald-800 rounded-lg text-emerald-100'>Book Now</button>
            
        </div>

        <div className='absolute right-3 top-7'>
            <X />
        </div>
      </div>
    </div>
  )
}

export default MobileNav
