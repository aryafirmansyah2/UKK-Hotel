import React from 'react'
import ListPemesanan from '../../components/Containers/Pemesanan/ListPemesanan'
import Layout2 from '../../components/Mixins/Layout/Layout2'
import ProtectPage from '../../components/utils/ProtectPage'

const index = () => {
    ProtectPage()

    return (
        <Layout2>
            <div className='flex '>
                <ListPemesanan />
            </div>
        </Layout2>
    )
}

export default index