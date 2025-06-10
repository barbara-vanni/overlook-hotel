import HotelPresentationPicture from "../assets/image/hotel_pre.jpg";
import RoomCard from "../components/RoomCard/RoomCard.tsx";
import { Button } from "@mui/material";


const Home = () => {
    return (
        <div>
            <img 
            src={HotelPresentationPicture} 
            alt="Hotel Presentation" 
            style={{ 
                width: '100%', 
                height: 'auto', 
                margin: 0, 
                padding: 0 
            }} 
            />
            <Button
            variant="contained" 
            color="primary" 
            style={{ 
                position: 'absolute', 
                top: '80%',
                right: '47%',
                borderRadius: '90%', 
                width: '50px', 
                height: '60px' 
            }}
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            />
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                flexWrap: 'wrap', 
                gap: '350px', 
                position: 'relative', 
                top: '-70px' 
            }}>
            <RoomCard
                title="Rose's Room"
                image={HotelPresentationPicture}
                description="A cozy room with modern amenities."
            />
            <RoomCard 
                title="Rose's Room"
                image={HotelPresentationPicture}
                description="A cozy room with modern amenities."
            />
            </div>
            <p style={{width: '50%', margin: '0 auto', textAlign: 'center'}}>
            Niché entre les dunes dorées et les palmiers ondoyants du légendaire royaume d’Alabasta, Aladdin’s Hotel vous accueille dans un écrin de raffinement et de magie orientale. Inspiré des contes des Mille et Une Nuits, cet hôtel 5 étoiles offre une expérience unique mêlant confort royal, hospitalité chaleureuse et décor féérique.
            </p>
        </div>
    );
};

export default Home;