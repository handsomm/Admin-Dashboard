import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTables'
import { userData } from '../../data/userData'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const EditLibrary = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const navigate = useNavigate()

    const location = useLocation()

    const [mediaName, setMediaName] = useState('')
    const [mediaDesc, setMediaDesc] = useState('')

    const mediaUrl = `http://localhost:5000/media?id=${location.state.id}`


    const fetchMediaData = async () => {
        return await axios.get(mediaUrl).then(res => {
            setMediaName(res.data.name)
            setMediaDesc(res.data.description)
        })
    }

    useEffect(() => {
        fetchMediaData();
    }, [])


    // console.log(location.state);
    const submitHandle = async (e) => {
        e.preventDefault()
        const media = {
            name: mediaName,
            description: mediaDesc
        }
        try {
            const response = await axios.put(`http://localhost:5000/media/${location.state.id}`, media)
            if (response.status === 200) {
                alert('Data Updated Successfully')
                navigate('/admin/library')
            } else {
                alert('Data Updated Failed')
            }
        } catch (err) {
            alert(err)
        }
    }

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="MEDIA EDIT" subtitle="Edit Media" />
            </Box>
            <form
                noValidate
                style={{ width: '290px' }}
                onSubmit={submitHandle}
            >
                <input
                    className={`form-control`}
                    type="text"
                    id="name"
                    name='name'
                    placeholder="Enter Media Name"
                    autoComplete="off"
                    onChange={(e) => setMediaName(e.target.value)}
                    value={mediaName}
                    required
                />
                <input
                    className={`form-control`}
                    type="text"
                    id="description"
                    name='description'
                    placeholder="Enter Media Description"
                    autoComplete="off"
                    onChange={(e) => setMediaDesc(e.target.value)}
                    value={mediaDesc}
                    required
                />
                <button className='btn btn-success'>Update</button>
            </form>
        </Box>
    )
}

export default EditLibrary