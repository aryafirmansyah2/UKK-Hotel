import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NotFound from '../../../components/Common/NotFound'
import EditUser from '../../../components/Containers/User/EditUser'
import Layout from '../../../components/Mixins/Layout/Layout'
import { Middleware } from '../../../components/utils/middleware'

const editkamar = () => {
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
          <EditUser />
        </Layout>
        :
        <NotFound />
      }
    </div>
  )
}

export default editkamar