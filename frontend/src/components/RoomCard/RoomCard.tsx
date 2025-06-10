import Card from '@mui/material/Card';
        import CardActions from '@mui/material/CardActions';
        import CardContent from '@mui/material/CardContent';
        import CardMedia from '@mui/material/CardMedia';
        import Button from '@mui/material/Button';
        import Typography from '@mui/material/Typography';

        interface RoomCardProps {
            title: string;
            image: string;
            description: string;
        }

        const RoomCard = ({ title, image, description }: RoomCardProps) => {
            return (
                <Card sx={{ width: 450 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={image}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            );
        };

        export default RoomCard;