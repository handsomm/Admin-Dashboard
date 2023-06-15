import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, useTheme } from "@mui/material";
import Header from './Header';
import { tokens } from "../theme";
// import { userData } from '../data/userData'



export default function DataTable({ row, column }) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="30px 0 0 0" height="65vh" sx={{
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: 'none'
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400]
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: colors.blueAccent[700],
                borderTop: 'none'
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`
            },
            "& .MuiDataGrid-panelWrapper .MuiButton-text": {
                color: `${colors.grey[100]}`
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300]
            },
        }}>
            <DataGrid
                getRowId={(row) => row._id}
                rows={row}
                columns={column}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 15]}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
            />
        </Box>
    );
}