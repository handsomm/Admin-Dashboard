import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import axios from 'axios'
import UserSidebar from './UserSidebar'

const Layout = () => {
    const [user, setUser] = useState({})

    const userId = localStorage.getItem('userId')

    const userUrl = `http://localhost:5000/users?id=${userId}`
    const fetchUserData = async () => {
        return await axios.get(userUrl).then(res => {
            setUser(res.data)
        })
    }


    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <>
            <div className='app'>
                {user.type === 'admin' ? (
                    <>
                        <Sidebar />
                        <main className='content' id='content' >
                            <TopBar />
                            <Outlet />
                        </main>
                    </>
                ) : (
                    <>
                        <UserSidebar />
                        <main className='content' id='content'>
                            <TopBar />
                            <Outlet />
                        </main>
                    </>
                )}

            </div>
            {/* <Outlet /> */}
        </>
    )
}

export default Layout