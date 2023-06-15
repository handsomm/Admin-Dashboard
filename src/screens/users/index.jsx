import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTables'
import { userData } from '../../data/userData'
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const Users = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [user, setUser] = useState([])
  const userUrl = 'http://localhost:5000/users'

  const fetchUserData = async () => {
    return await fetch(userUrl).then((data) => data.json())
    .then((data) => setUser(data))
  }
  // console.log(user[0]);

  useEffect(() => {
    fetchUserData();
  }, [])

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex:1
    },
    {
      field: 'name',
      headerName: 'Name',
      // width: 130,
      flex:1,
      cellClassName: 'name-column--cell',
      renderCell: (cellValues) => {
        return <Link style={{ textDecoration: 'none', color: colors.greenAccent[200] }} to={`/users/${cellValues.row._id}`}>{cellValues.row.name}</Link>;
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'phone',
      headerName: "Phone Number",
      flex: 1
    },
    {
      field: 'type',
      headerName: "Type",
      flex: 1,
      headerAlign:'center',
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            position='relative'
            width='70%'
            m="0 auto"
            p='5px'
            display='flex'
            justifyContent='center'
            backgroundColor={
              type === 'admin'
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {type === 'admin' && <AdminPanelSettingsOutlinedIcon sx={{ position: 'relative' }} />}
            {type === 'user' && <LockOpenOutlinedIcon sx={{ position: 'relative' }} />}
            <Typography position='relative' color={colors.grey[100]} sx={{ ml: "5px" }}>
              {type}
            </Typography>
          </Box>
        )
      }
    },
  ]

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="USERS" subtitle="All users" />
      </Box>
      {console.log(user)}
      
      <DataTable row={user} column={columns} />
    </Box>
  )
}

export default Users