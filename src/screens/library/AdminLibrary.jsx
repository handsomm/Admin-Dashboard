import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTables'
import { userData } from '../../data/userData'
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const AdminLibrary = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const navigate = useNavigate()

    const [media, setMedia] = useState([])
    const mediaUrl = 'http://localhost:5000/media'

    const fetchUserData = async () => {
        return await fetch(mediaUrl).then((data) => data.json())
            .then((data) => setMedia(data))
    }
    // console.log(user[0]);

    useEffect(() => {
        fetchUserData();
    }, [])

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Name',
            // width: 130,
            flex: 1,
            cellClassName: 'name-column--cell',
            renderCell: (cellValues) => {
                return <Link style={{ textDecoration: 'none', color: colors.greenAccent[200] }} to={`/media/${cellValues.row._id}`}>{cellValues.row.name}</Link>;
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1
        },
        {
            field: 'id',
            headerName: 'Action',
            flex: 1,
            renderCell: (cellValues) => {
                return (
                    <Box>
                        <Button
                            variant="contained"
                            onClick={() => { navigate('edit', { state: { id: cellValues.row._id } }) }}
                            sx={{
                                color: colors.grey[200],
                                backgroundColor: colors.greenAccent[700],
                                marginRight: '10px',
                                ":hover": {
                                    bgcolor: colors.greenAccent[600]
                                }
                            }}>
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                color: colors.grey[200],
                                backgroundColor: colors.redAccent[700],
                                marginRight: '10px',
                                ":hover": {
                                    bgcolor: colors.redAccent[600]
                                }
                            }}>
                            Delete
                        </Button>
                    </Box>
                )
            }
        },

    ]

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="MEDIA" subtitle="All Media" />
            </Box>
            {/* {console.log(media)} */}

            <DataTable row={media} column={columns} />
        </Box>
    )
}

export default AdminLibrary