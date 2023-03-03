import React from 'react'
import Cari_Kamar from '../../components/Containers/Cari_Kamar/Cari_Kamar'
import Layout from '../../components/Mixins/Layout/Layout'
import ProtectPage from '../../components/utils/ProtectPage'

const cari_kamar = () => {
  ProtectPage()
  return (
    <Layout>
      <Cari_Kamar/>
    </Layout>
  )
}

export default cari_kamar