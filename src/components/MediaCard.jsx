import * as React from 'react';
import { tokens } from '../theme';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function MediaCard({title, category, description}) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    // const [medias, setMedias] = React.useState({
    //     name:'',
    //     category:""
    // })

    // React.useEffect(() => {
    //     setMedias({
    //         name:media.name
    //     })
    // }, [])

    // console.log(data.name);
    
    // console.log(medias)
    // console.log(media.name);
    // console.log(media._id);
    // console.log(media.category.name);

    return (
        <Card sx={{
            maxWidth: 280,
            backgroundColor: colors.blueAccent[900],
            "& .MuiCardActions-root": {
                paddingTop: '0px'
            }
        }}>

            <CardHeader
                // avatar={
                //     <Avatar sx={{ bgcolor: colors.blueAccent[300] }} aria-label="recipe">
                //         S
                //     </Avatar>
                // }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={`${category.name} ${category.type}`}
            />
            <CardMedia
                component="img"
                height="194"
                image="../media.jpg"
                alt="Media Image"
            />
            <CardContent>
                <Typography variant="body2" color={colors.grey[400]}>
                    {/* This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like. */}
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}