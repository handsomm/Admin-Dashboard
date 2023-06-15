import React, { useEffect, useState } from 'react'
import MediaCard from '../../components/MediaCard'
import Header from '../../components/Header'
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from 'axios';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Favorites = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [filter, setFilter] = useState('');
  const [media, setMedia] = useState([])

  let mediaUrl = `http://localhost:5000/media/${filter}`


  const handleChange = (event) => {
    setFilter(event.target.value);
    mediaUrl = mediaUrl + event.target.value
  };

  const fetchMediaData = async () => {
    return await axios.get(mediaUrl).then(res => {
      setMedia(res.data)
    })
  }

  useEffect(() => {
    fetchMediaData();
  }, [mediaUrl])

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="FAVORITES" subtitle="Favorite Media" />

        {/* <Header title="LIBRARY" subtitle="Available Media" /> */}

        <Box minWidth='150px'>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='song'>Song</MenuItem>
              <MenuItem value='movie'>Movie</MenuItem>
              <MenuItem value='book'>Book</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </Box>

      {/* ALL MEDIA */}
      <Box
        className="cards"
        // display="flex"
        gridTemplateColumns="repeat(12, 1fr)"
        // gridTemplateRows="1fr"
        // gridAutoRows="140px"
        gap="20px"
      >

        {/* ROW 1 */}
        {media.map((data, index) => {
          return (
            <Box className="card" display="flex" alignItems="center" justifyContent='center'>
              <MediaCard title={data.name} description={data.description} category={data.category} />
            </Box>
          )
        })}
      </Box>

    </Box>
  )
}

export default Favorites