import React from 'react'
import { png } from '../../assets/Assets'
const TurfAmen = ({venue}) => {
  return (
    <div className='mt-5'>
      <span className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 my-4 border-b-2 border-emerald-800'>Amenities</span>
      <div  className='outline-none h-[2px] w-full bg-slate-300 border-none'></div>

      <div className='grid grid-cols-2 p-3'>
        {
            venue.amenities.map((item, idx)=>{
                const elem = png.find((e)=>e.title.toLowerCase() === item.toLowerCase())
                return(
                    <div key={idx} className='flex gap-3 mt-3 text-lg'>
                        {elem && <img src={elem.image} alt=""  className='w-6 h-6'/>}
                        <span>{item}</span>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default TurfAmen
