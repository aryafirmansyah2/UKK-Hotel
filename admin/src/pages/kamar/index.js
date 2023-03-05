import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NotFound from '../../components/Common/NotFound'
import Kamar from '../../components/Containers/Kamar/Kamar'
import Layout from '../../components/Mixins/Layout/Layout'
import { Middleware } from '../../components/utils/middleware'

const index = () => {
    const router = useRouter()
    const [role, setRole] = useState()
    useEffect(() => {
        Middleware(router)
        if (typeof window !== 'undefined') {
            setRole(sessionStorage.getItem('role'))
        }
    }, [])



    return (
        <div>
            {role === "manager" ?
                <Layout>
                    <Kamar />
                </Layout>
                :
                <NotFound />
            }

        </div>
    )
}

export default index