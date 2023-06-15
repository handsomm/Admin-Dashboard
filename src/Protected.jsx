import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// const Protected = ({ childern }) => {
//     const token = localStorage.getItem('token')
//     return token ? childern : <Navigate to='/login' />
// }

const Protected = () => {
    const token = localStorage.getItem('token')
    return token ? <Outlet /> : <Navigate to='/login' />
}

export default Protected