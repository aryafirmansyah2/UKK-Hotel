import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NotFound from '../../components/Common/NotFound'
import TipeKamar from '../../components/Containers/Tipe_Kamar/TipeKamar'
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
  useEffect(() => {
    Middleware(router)
  }, [])
  return (
    <div>
      {role === "manager" ?
        <Layout>
          <TipeKamar />
        </Layout>
        :
        <NotFound />
      }
    </div>
    )
}

export default index