import React from 'react'
import { useLocation , Link } from 'react-router-dom'
const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x)=>x);
    const filteredPathnames = pathnames.filter((x)=>x==='venues')
    console.log(filteredPathnames)
  return (
    <div className=''>
      <nav>
        <ul className='flex text-base'>
            <li>
                <Link to='/'>Home</Link>
            </li>
            {filteredPathnames.map((item, idx)=>{
                const path = `/${pathnames.slice(0, idx+1).join('/')}`
                return(
                    <li key={idx} className='flex ml-2 items-center'>
                        <span className='mx-2 text-gray-500'>›</span>
                        <Link to={path}>
                            {item.replace('/-/g')}
                        </Link>
                    </li>
                )
            })}
        </ul>
        
      </nav>
    </div>
  )
}

export default Breadcrumb
