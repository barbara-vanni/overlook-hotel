import "./RoomCard.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

        interface RoomCardProps {
            title: string;
            image: string;
            description: string;@
        }

        const RoomCard = ({ title, image, description }: RoomCardProps) => {
            const navigate = useNavigate();
            return (
                <Card sx={{ width: 450, boxShadow:3, backgroundColor: "whitesmoke"}}>
                    <CardMedia
                        sx={{ height: 150 }}
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
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined" onClick={() => navigate("/reservations")}>Réserver</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            );
        };

        export default RoomCard;