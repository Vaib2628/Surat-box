import React from 'react'

const Navbar = () => {
    return (
            <div className="flex w-full body-font items-center absolute z-[100] ">
                <div className="w-full xs:w-[85%] mx-auto flex p-5 flex-col sm:flex-row items-center justify-between ">
                    <div>
                            <span className="title-font font-medium sm:ml-3 text-xl text-gray-white">Cricketify</span>
                    </div>
                    
                    <div className='flex text-white items-center h-full'>
                        <div className="md:ml-auto flex items-center justify-center max-xs:text-[14px]">
                            <a className="mr-5 hover:text-gray-900 hover:cursor-pointer ">About Us</a>
                            <a className="mr-5 hover:text-gray-900 hover:cursor-pointer ">Contact Us</a>
                        
                            <button className="flex items-center bg-gray-100 border-0 py-1 px-2 sm:px-3 focus:outline-none text-gray-600 hover:bg-gray-200 rounded">Book Now
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                            </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default Navbar
