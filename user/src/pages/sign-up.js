import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import PageRegistrasi from '../components/Mixins/sign-up'

const login = () => {
  const router = useRouter()
  useEffect(() => {

    if (typeof window !== 'undefined') {
      const role = sessionStorage.getItem('role')
      const token = sessionStorage.getItem('token')

      if (token && role) {
        router.push('/beranda');
      } 
    }

  }, [])
  return (
    <div><PageRegistrasi /></div>
  )
}

export default login