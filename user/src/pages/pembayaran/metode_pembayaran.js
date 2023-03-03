import React from 'react'
import Layout from '../../components/Mixins/Layout/Layout'
import MetodePembayaran from '../../components/Containers/Pembayaran/MetodePembayaran'
import ProtectPage from '../../components/utils/ProtectPage'
const metode_pembayaran = () => {
    ProtectPage()
    return (
        <Layout>
            <MetodePembayaran />
        </Layout>
    )
}

export default metode_pembayaran