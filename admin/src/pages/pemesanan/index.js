import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Pemesanan from '../../components/Containers/Pemesanan/Pemesanan'
import Layout from '../../components/Mixins/Layout/Layout'
import { Middleware } from '../../components/utils/middleware'

const index = () => {
    const router = useRouter()
    useEffect(() => {
      Middleware(router)
    }, [])
    return (
        <Layout>
            <Pemesanan />
        </Layout>
    )
}

export default index