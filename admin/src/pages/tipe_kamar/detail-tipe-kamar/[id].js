import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/Common/NotFound'
import DetailTipeKamar from '../../../components/Containers/Tipe_Kamar/DetailTipeKamar'
import Layout from '../../../components/Mixins/Layout/Layout'
import { Middleware } from '../../../components/utils/middleware'

const detailTipeKamar = () => {
    const router = useRouter()
    const [role, setRole] = useState()
    useEffect(() => {
      Middleware(router)
      if (typeof window !== 'undefined') {
        setRole(localStorage.getItem('role'))
      }
    }, [])
    useEffect(() => {
      Middleware(router)
    }, [])
    return (
      <div>
        {role === "manager" ?
          <Layout>
            <DetailTipeKamar />
          </Layout>
          :
          <NotFound />
        }
      </div>
  )
}

export default detailTipeKamar