
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ProtectPage = () => {
    const router = useRouter()
    useEffect(() => {

        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('role')
            const token = localStorage.getItem('token')

            if (!token && !role) {
                router.push('/login');
            }
        }

    }, [])

}

export default ProtectPage
