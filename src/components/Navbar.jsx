import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-center text-white py-2 bg-violet-800 '>
        <div className='flex justify-between w-[75%]'>
        <div>
        <span className='font-bold text-xl mx-8'>i-Task</span>
        </div>
       <ul className='flex gap-4 '>
        <li className='w-[50px] text-lg hover:font-bold cursor-pointer'>Home</li>
        <li className='w-[100px] text-lg hover:font-bold cursor-pointer'>Your Tasks</li>
        </ul> 
        </div>
    </nav>
  )
}

export default Navbar
