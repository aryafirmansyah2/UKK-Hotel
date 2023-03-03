import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import PageLogin from '../components/Mixins/Login'

const login = () => {
  const router = useRouter()
  useEffect(() => {

    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role')
      const token = localStorage.getItem('token')

      if (token && role) {
        router.push('/beranda');
      } 
    }

  }, [])
  return (
    <div><PageLogin /></div>
  )
}

export default login