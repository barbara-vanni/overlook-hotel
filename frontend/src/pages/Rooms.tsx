import RoomCard from "../components/RoomCard/RoomCard.tsx";
import JasminSuitePicture from "../assets/image/JasminSuitePicture.jpg";
import {Grid} from "@mui/material";

const Rooms = () => {
    const rooms = [
        {
            title: "Jasmin's Suite",
            image: JasminSuitePicture,
            description: "A luxurious suite with a beautiful view of the city."
        },
        {
            title: "Rose's Room",
            image: JasminSuitePicture,
            description: "A cozy room with modern amenities. A cozy room with modern amenities.A cozy room with modern amenities."
        },
        {
            title: "Lily's Loft",
            image: JasminSuitePicture,
            description: "A spacious loft with a contemporary design."
        },
        {
            title: "Tulip's Terrace",
            image: JasminSuitePicture,
            description: "A charming room with a private terrace."
        }
    ];
    return (
        <div className="rooms-page">
            <h1>Rooms available</h1>
            <p>Les différentes rooms dispo dans l'hôtel.</p>
            <Grid container spacing={5} alignItems={"stretch"} justifyContent="center">
                {rooms.map((room, index) => (
                    <Grid key={index}>
                        <RoomCard
                            title={room.title}
                            image={room.image}
                            description={room.description}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Rooms;