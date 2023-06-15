import React from 'react'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './screens/dashboard'
import Library from './screens/library'
import Users from './screens/users'
import UserProfile from './screens/profile/UserProfile'
import AdminLibrary from './screens/library/AdminLibrary'
import Register from './screens/global/Register'

import Protected from './Protected'

import Layout from './screens/global/Layout'
import Login from './screens/global/Login'
import EditLibrary from './screens/library/EditLibrary'



const App = () => {
    const [theme, colorMode] = useMode()
    const userId = localStorage.getItem('userId')
    const userType = localStorage.getItem('userType')
    const navigate = useNavigate()
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    {/* {(userId === null) ? (<Route path='/' element={<Login />} />) : ((userType === 'admin') ? navigate('/admin/dashboard') : navigate('/user/profile'))} */}

                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    <Route element={<Protected />}>
                        <Route element={<Layout />}>
                            <Route path="/admin/dashboard" element={<Dashboard />} />
                            <Route path="/admin/users" element={<Users />} />
                            <Route path="/admin/library" element={<AdminLibrary />} />
                            <Route path="/admin/library/edit" element={<EditLibrary />} />
                            <Route path="/user/profile" element={<UserProfile />}></Route>
                            <Route path="/user/library" element={<Library />}></Route>
                            <Route path="/user/favorites" element={<Library />}></Route>
                        </Route>
                    </Route>

                    {/* <Route path='/dashboard' element={
                        <Protected childern={
                            <Layout component={<Dashboard />} />
                        } />
                    } />
                    <Route path='/library' element={
                        <Protected childern={
                            <Layout component={<AdminLibrary />} />
                        } />
                    } />
                    <Route path='/users' element={
                        <Protected childern={
                            <Layout component={<Users />} />
                        } />
                    } /> */}
                </Routes>

            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App