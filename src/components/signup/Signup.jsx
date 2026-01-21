import React from 'react'
import { SignupForm } from "@/components/signup-form"
import Layout from '@/components/layout/Layout'
const Signup = () => {
    return (
        <Layout>
            <div className='w-full' >


                <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-sm">
                        <SignupForm />
                    </div>
                </div>
            </div></Layout >

    )
}

export default Signup