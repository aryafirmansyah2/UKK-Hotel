import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/Common/NotFound'
import DetailKamar from '../../../components/Containers/Kamar/DetailKamar'
import Layout from '../../../components/Mixins/Layout/Layout'
import { Middleware } from '../../../components/utils/middleware'

const detaikamar = () => {
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
          <DetailKamar />
        </Layout>
        :
        <NotFound />
      }
    </div>
  )
}

export default detaikamar