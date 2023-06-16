import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import 'react-pro-sidebar/dist/css/styles.css'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CollectionsIcon from '@mui/icons-material/Collections';
import PeopleIcon from '@mui/icons-material/People';

import axios from 'axios';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100]
            }}
            icon={icon}
            onClick={() => setSelected(title)}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}


const Sidebar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [selected, setSelected] = useState('Dashboard')
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
        <Box marginRight={isCollapsed ? '80px' : '270px'} style={{ transition: 'all 0.2s ease-in-out' }} sx={{
            "& .pro-sidebar": {
                position: 'fixed',
            },
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important"
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important"
            },
            "& .pro-inner-item:hover": {
                color: "#868dfb !important"
            },
            // height:'100vh'
            // "& .pro-sidebar" :{
            //     position:"fixed",
            //     width:'270px'
            // },
            // "& .pro-sidebar.collapsed": {
            //     width: '50px'
            // }
        }} >
            <ProSidebar collapsed={isCollapsed} id='sidebar' height='100vh'>
                <Menu iconShape='square'>
                    {/* LOGO AND MENU ITEMS */}
                    <MenuItem
                        onClick={() => { setIsCollapsed(!isCollapsed) }}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100]
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml='15px'
                            >
                                <Typography variant='h3' color={colors.grey[100]}>ADMINS</Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {/* USER PROFILE */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt='Profile-user'
                                    width="100px"
                                    height="100px"
                                    src='../../profile_user.jpg'
                                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                                />
                            </Box>
                            <Box textAlign='center'>
                                <Typography
                                    variant='h3'
                                    color={colors.grey[100]}
                                    fontWeight='bold'
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography variant='h5' color={colors.greenAccent[500]}>{user.type}</Typography>
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title='Dashboard'
                            to='/admin/dashboard'
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Library'
                            to='/admin/library'
                            icon={<CollectionsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Users'
                            to='/admin/users'
                            icon={<PeopleIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>

                </Menu>

            </ProSidebar>
        </Box>
    )
}

export default Sidebar