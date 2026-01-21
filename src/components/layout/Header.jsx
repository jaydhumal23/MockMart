import React from 'react'
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const toSignin = () => {
        navigate("/signin")
    }

    const toHome = () => {
        navigate("/")
    }

    return (
        <nav className='flex  justify-between bg-gray-400/10 w-full m-h-xl p-2 px-6 sticky top-0 backdrop-blur-sm cursor-pointer select-none'>
            <div className='flex justify-center items-center gap-3 select-none' onClick={toHome} ><img src='/shopping.png' className='h-8 '></img ><span className='text-xl font-bold'>MockMart</span></div>
            <div className='flex gap-10  justify-center items-center'>
                <div className='flex gap-6 text-xl text-gray-500 font-semibold justify-center items-center select-none'>
                    <div className=''>All Products</div>
                    <div>Categories</div>


                </div>
                <div className='  text-xl font-semibold flex gap-1 justify-center items-center'>

                    <input className='bg-white text-sm font-medium font-mono p-2 px-3 w-sm rounded-md h-xl select-none' placeholder='  &#x1F50D; search a product'
                        type="text"
                    />


                </div></div>
            <div className='flex justify-center items-center select-none gap-6'>
                <ShoppingCart />

                <div>
                    <Button className="hover:bg-amber-600  bg-gray-600 cursor-pointer" onClick={toSignin}>Sign in</Button>
                </div>
            </div>
        </nav >
    )
}

export default Header