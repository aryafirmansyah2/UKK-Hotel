
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ProtectPage = () => {
    const router = useRouter()
    useEffect(() => {

        if (typeof window !== 'undefined') {
            const role = sessionStorage.getItem('role')
            const token = sessionStorage.getItem('token')

            if (!token && !role) {
                router.push('/login');
            }
        }

    }, [])

}

export default ProtectPage
