import React from 'react'
import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import Header from '../../components/Header'
import { tokens } from '../../theme'

const UserProfile = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box m='20px'>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROFILE" subtitle="Welcome to your Profile" />
      </Box>

      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Box mt='20px'>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <img
              alt='User Profile'
              width="110px"
              height="110px"
              src='../../profile_user.jpg'
              style={{ borderRadius: "50%" }}
            />
          </Box>
          <Box textAlign='center'>
            <Typography variant='h3'>Soumya Ranjan Behera</Typography>
          </Box>
          <Box textAlign='center' mt='10px'>
            <Button variant="contained" sx={{ color: colors.grey[200], backgroundColor: colors.greenAccent[700], marginRight: '10px' }}>Favorites</Button>
            <Button variant="contained" sx={{ color: colors.grey[200], backgroundColor: colors.greenAccent[700] }}>Update</Button>
          </Box>
        </Box>
        <Paper elevation={3} sx={{padding:'10px', border:`2px solid ${colors.blueAccent[400]}`, borderRadius:'18px', backgroundColor:colors.blueAccent[400],width:'300px'}}>
          <Box p='16px' >
            <Typography variant='h4' fontWeight='bold'>Email: </Typography><span style={{ marginLeft: '10px' }}>soumyaranjan@gmail.com</span>
            <Typography variant='h4' fontWeight='bold'>Phone: </Typography><span style={{ marginLeft: '10px' }}>79416523514</span>
          </Box>
        </Paper>
      </Box>

    </Box>
  )
}

export default UserProfile