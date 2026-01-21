import React from 'react'

import { LoginForm } from "@/components/login-form"


const Login = () => {
    return (
        <div className='min-h-screen w-full bg-blue-100'>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div></div>
    )
}

export default Login