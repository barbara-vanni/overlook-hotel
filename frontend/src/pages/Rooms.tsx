import RoomCard from "../components/RoomCard/RoomCard.tsx";
import JasminSuitePicture from "../assets/image/JasminSuitePicture.jpg";

const Rooms = () => {
    return (
        <div className="rooms-page">
            <h1>Rooms available</h1>
            <p>Les différentes rooms dispo dans l'hotel.</p>
            <RoomCard
                title="Jasmin's Suite"
                image= {JasminSuitePicture}
                description="A luxurious suite with a beautiful view of the city."
            />
            <RoomCard
                title="Rose's Room"
                image= {JasminSuitePicture}
                description="A cozy room with modern amenities."
            />
        </div>
    );
}

export default Rooms;