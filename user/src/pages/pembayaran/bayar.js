import React from 'react'
import Bayar from '../../components/Containers/Pembayaran/Bayar'
import Layout from '../../components/Mixins/Layout/Layout'
import ProtectPage from '../../components/utils/ProtectPage'

const bayar = () => {
    ProtectPage()
    return (
        <Layout>
            <Bayar />
        </Layout>
    )
}

export default bayar