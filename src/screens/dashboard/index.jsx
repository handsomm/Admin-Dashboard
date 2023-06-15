import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import StatBox from '../../components/StatBox'
import PersonIcon from '@mui/icons-material/Person';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import axios from 'axios'

const Dashboard = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	const userId = localStorage.getItem('userId')

	const [users, setUsers] = useState([])
	const [media, setMedia] = useState([])
	const [movies, setMovies] = useState([])
	const [songs, setSongs] = useState([])
	const [books, setBooks] = useState([])
	// const url = 'http://jsonplaceholder.typicode.com/users'
	const usersUrl = 'http://localhost:5000/users'
	const mediaUrl = `http://localhost:5000/media`

	const fetchUsersData = async () => {
		return await axios.get(usersUrl).then(res => {
			setUsers(res.data)
		})
	}
	const fetchMediaData = async () => {
		return await axios.get(mediaUrl).then(res => {
			setMedia(res.data)
		})
	}

	const frtchMovie = async () => {
		return await axios.get(mediaUrl + "/movie").then(res => {
			setMovies(res.data)
		})
	}
	const frtchSongs = async () => {
		return await axios.get(mediaUrl + "/song").then(res => {
			setSongs(res.data)
		})
	}
	const frtchBooks = async () => {
		return await axios.get(mediaUrl + "/book").then(res => {
			setBooks(res.data)
		})
	}

	useEffect(() => {
		fetchUsersData();
		fetchMediaData();
		frtchMovie();
		frtchSongs();
		frtchBooks();
	}, [])

	// console.log(media)

	return (
		<Box m="20px">
			<Box display="flex" justifyContent='space-between' alignItems='center'>
				<Header title='Dashboard' subtitle="Welcome to your dashboard" />
			</Box>

			{/* GRID & CHARTS */}
			<Box
				className='cards'
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="140px"
				gap="20px"
				mb='20px'
			>
				{/* ROW 1 */}
				<Box className='card' backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent='center'>
					<StatBox
						title={users.length}
						subtitle="Total Users"
						progress="0.75"
						increase="+14%"
						icon={
							<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />
						}
					/>
				</Box>
				<Box className='card' backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent='center'>
					<StatBox
						title={media.length}
						subtitle="Total Media"
						progress="0.55"
						increase="+14%"
						icon={
							<PermMediaIcon sx={{ color: colors.redAccent[600], fontSize: '26px' }} />
						}
					/>
				</Box>
			</Box>

			<Box
				className='cards'
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="140px"
				gap="20px"
			>
				{/* ROW 1 */}
				<Box className='card' backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent='center'>
					<StatBox
						title={movies.length}
						subtitle="Total Movies"
						progress="0.75"
						increase="+14%"
						icon={
							<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />
						}
					/>
				</Box>
				<Box className='card' backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent='center'>
					<StatBox
						title={songs.length}
						subtitle="Total Songs"
						progress="0.55"
						increase="+14%"
						icon={
							<PermMediaIcon sx={{ color: colors.redAccent[600], fontSize: '26px' }} />
						}
					/>
				</Box>
				<Box className='card' backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent='center'>
					<StatBox
						title={books.length}
						subtitle="Total Books"
						progress="0.55"
						increase="+14%"
						icon={
							<PermMediaIcon sx={{ color: colors.redAccent[600], fontSize: '26px' }} />
						}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default Dashboard