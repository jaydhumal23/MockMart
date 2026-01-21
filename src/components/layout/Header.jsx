import React from 'react'

const Header = () => {
    return (
        <nav className='flex  justify-between  bg-gray-400/20 w-full m-h-xl p-2 sticky top-0 backdrop-blur-sm'>
            <div className='flex justify-center items-center gap-3 select-none'><img src='public/shopping.png' className='h-8 '></img ><span className='text-xl font-bold'>MockMart</span></div>
            <div>
                Product
            </div>
            <div>
                Profile
            </div>

        </nav>
    )
}

export default Header