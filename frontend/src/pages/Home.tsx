import HotelPresentationPicture from "../assets/image/hotel_pre.jpg";
import PalaisImg from "../assets/image/palais.jpg";
import SaharaOasisImg from "../assets/image/sahara_oasis.jpg";
import SaharaImg from "../assets/image/sahara.jpg";
// import RoomCard from "../components/RoomCard/RoomCard.tsx";
import { Button } from "@mui/material";
import { ImageSlider } from "../components/Slider/Slider";


const Home = () => {
    return (

        <div>
            <h1 style={{ 
                textAlign: 'center', 
                position: 'absolute', 
                top: '25%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                margin: 0 
            }}>
                Welcome to Aladdin's Hotel
            </h1>

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
                height: '60px', 
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            }}
            >
                <span style={{ fontSize: '20px' }}>↓</span>
            </Button>

            {/* Section for the hotel description and image slider */}
            {/* Under the presentation image */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: '50px',
                    padding: '20px',
                    gap: '20px',
                }}>
                <ImageSlider
                    images={[PalaisImg, SaharaOasisImg, SaharaImg]}
                    autoPlay={true}
                    autoPlayInterval={3000}
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
                    <p style={{textAlign: 'center', color:'black', fontSize:'25px'}}>
                    Niché entre les dunes dorées et les palmiers ondoyants du légendaire royaume d’Alabasta, Aladdin’s Hotel vous accueille dans un écrin de raffinement et de magie orientale. Inspiré des contes des Mille et Une Nuits, cet hôtel 5 étoiles offre une expérience unique mêlant confort royal, hospitalité chaleureuse et décor féérique.
                    </p>
                    <a 
                        className="reservation-button"
                        aria-label="Réserver une chambre"
                        href="/reservations"
                        style={{
                            textDecoration: 'none',
                            color: '#705816',
                            padding: '10px 20px',
                            borderBottom: '2px solid transparent',
                            transition: 'border-bottom 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderBottom = '2px solid #705816';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderBottom = '2px solid transparent';
                        }}
                    >
                        Réserver une chambre
                    </a>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '50px',
                    padding: '20px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>

                <h2 style={{ textAlign: 'center', marginTop: '20px', color:'black'}}>Explorez nos chambres</h2>
                <p style={{ textAlign: 'center', color:'black', fontSize:'25px' }}>Découvrez nos chambres luxueuses et réservez votre séjour dès maintenant.</p>
            </div>
















        </div>


    );
};

export default Home;