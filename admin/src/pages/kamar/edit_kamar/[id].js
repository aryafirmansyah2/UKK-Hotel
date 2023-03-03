import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/Common/NotFound'
import EditKamar from '../../../components/Containers/Kamar/EditKamar'
import Layout from '../../../components/Mixins/Layout/Layout'
import { Middleware } from '../../../components/utils/middleware'

const editkamar = () => {
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
          <EditKamar />
        </Layout>
        :
        <NotFound />
      }
    </div>
  )
}

export default editkamar