import React from 'react'
import DetailPemesanan from '../../../components/Containers/Pemesanan/DetailPemesanan'
import Layout from '../../../components/Mixins/Layout/Layout2'
import ProtectPage from '../../../components/utils/ProtectPage'

const index = () => {
  ProtectPage()
  return (
    <Layout>
      <DetailPemesanan />
    </Layout>
  )
}

export default index