import React from 'react'
import { ColorModeContext, tokens } from '../../theme'
import { useContext } from 'react'
import { Box, IconButton, InputBase, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const colorMode = useContext(ColorModeContext)
  const navigate = useNavigate()

  return (
    <Box className='topbar' display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display='flex' backgroundColor={colors.primary[400]} borderRadius="3px">
        <Box className='search'>

          <InputBase sx={{ ml: 2 }} placeholder='Search' />
          <IconButton type='button' sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      {/* ICON SECTION */}
      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
        <IconButton
          onClick={() => {
            if (window.confirm("Are you sure, you want to logout ???")) {
              localStorage.removeItem('token')
              localStorage.removeItem('userId')
              navigate('/login')
            }
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default TopBar