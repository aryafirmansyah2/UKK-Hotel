import React from 'react'
import Detail_Kamar from '../../../components/Containers/Cari_Kamar/Detail_Kamar'
import Layout from '../../../components/Mixins/Layout/Layout'
import ProtectPage from '../../../components/utils/ProtectPage'

const detail_kamar = () => {
  ProtectPage()
  return (
    <Layout>
      <Detail_Kamar/>
    </Layout>
  )
}

export default detail_kamar