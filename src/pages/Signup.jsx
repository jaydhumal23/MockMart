import React from 'react'
import { SignupForm } from "@/components/signup-form"

const Signup = () => {
    return (
        <div className='min-h-screen w-full bg-blue-100'>


            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}

export default Signup