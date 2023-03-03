import { useRouter } from 'next/router'
import React from 'react'

import PageLogin from '../components/Common/Login'
import { MiddlewareLogin } from '../components/utils/middlewareLogin'


const Login = () => {
    const router = useRouter()
    MiddlewareLogin(router)
    return (
        <div className='text-black bg-white'>
            <PageLogin />
        </div>
    )
}

export default Login