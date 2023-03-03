import React from 'react'
import PrintInvoice from '../../../../components/Containers/Pemesanan/PrintInvoice'
import ProtectPage from '../../../../components/utils/ProtectPage'
import Layout2 from '../../../../components/Mixins/Layout/Layout2'

const invoice = () => {
  ProtectPage()
  return (
    <div className='w-full h-screen'>
      <Layout2 >
        <div className='px-52'>
          <PrintInvoice />
        </div>
      </Layout2>
    </div>
  )
}

export default invoice