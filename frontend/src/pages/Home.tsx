import HotelPresentationPicture from "../assets/image/hotel_pre.jpg";
import PalaisImg from "../assets/image/palais.jpg";
import SaharaOasisImg from "../assets/image/sahara_oasis.jpg";
import SaharaImg from "../assets/image/sahara.jpg";
import { Button } from "@mui/material";
import { ImageSlider } from "../components/Slider/Slider";
import { Link } from "../components/Link/Link";

const Home = () => {
    return (
        <div>
            <h1 style={{ 
                textAlign: 'center', 
                position: 'absolute', 
                top: '25%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                margin: 0,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 400,
                color: '#ffffff',
                fontSize: '3.5rem',
                letterSpacing: '2px',
                lineHeight: 1.2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                zIndex: 2
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

            {/* Reservation Container */}
            <div style={{
                position: 'absolute',
                bottom: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                zIndex: 10,
                minWidth: '800px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
                {/* Date d'arrivée */}
                <div style={{
                    flex: 1,
                    borderRight: '1px solid #e0e0e0',
                    paddingRight: '20px'
                }}>
                    <label style={{
                        display: 'block',
                        color: '#666666',
                        fontSize: '14px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 300,
                        marginBottom: '8px',
                        letterSpacing: '0.5px'
                    }}>
                        Date d'arrivée
                    </label>
                    <div style={{
                        color: '#8B7355',
                        fontSize: '18px',
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 400,
                        letterSpacing: '1px'
                    }}>
                        13 Juin 2025
                    </div>
                </div>

                {/* Date de départ */}
                <div style={{
                    flex: 1,
                    borderRight: '1px solid #e0e0e0',
                    paddingRight: '20px'
                }}>
                    <label style={{
                        display: 'block',
                        color: '#666666',
                        fontSize: '14px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 300,
                        marginBottom: '8px',
                        letterSpacing: '0.5px'
                    }}>
                        Date de départ
                    </label>
                    <div style={{
                        color: '#8B7355',
                        fontSize: '18px',
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 400,
                        letterSpacing: '1px'
                    }}>
                        14 Juin 2025
                    </div>
                </div>

                {/* Chambres & Personnes */}
                <div style={{
                    flex: 1,
                    borderRight: '1px solid #e0e0e0',
                    paddingRight: '20px'
                }}>
                    <label style={{
                        display: 'block',
                        color: '#666666',
                        fontSize: '14px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 300,
                        marginBottom: '8px',
                        letterSpacing: '0.5px'
                    }}>
                        Chambres & Pers.
                    </label>
                    <div style={{
                        color: '#8B7355',
                        fontSize: '18px',
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 400,
                        letterSpacing: '1px'
                    }}>
                        1 Chambre / 2 Pers.
                    </div>
                </div>

                {/* Réserver Button */}
                <Button style={{
                    backgroundColor: '#8B7355',
                    color: '#ffffff',
                    padding: '16px 32px',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minWidth: '180px',
                    boxShadow: 'none'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6B5A47';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 115, 85, 0.3)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#8B7355';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => window.location.href = '/reservations'}
                >
                    RÉSERVEZ<br />MAINTENANT
                </Button>
            </div>

            {/* Section for the hotel description and image slider */}
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
                    Niché entre les dunes dorées et les palmiers ondoyants du légendaire royaume d'Alabasta, Aladdin's Hotel vous accueille dans un écrin de raffinement et de magie orientale. Inspiré des contes des Mille et Une Nuits, cet hôtel 5 étoiles offre une expérience unique mêlant confort royal, hospitalité chaleureuse et décor féérique.
                    </p>
                    <Link 
                        href="/reservations" ariaLabel="Réserver une chambre">
                        Réserver une chambre
                    </Link>
                </div>
            </div>

            {/* Section for services and experiences */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '80px',
                    padding: '80px 40px',
                    background: 'linear-gradient(135deg, #deb887 0%, #cd853f 50%, #8b4513 100%)',
                    borderRadius: '0',
                    overflow: 'hidden',
                    position: 'relative',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}>

                {/* Animated background elements - desert themed */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '100px',
                    height: '100px',
                    background: 'rgba(255, 215, 0, 0.15)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: '0s',
                    zIndex: 2
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    right: '15%',
                    width: '80px',
                    height: '80px',
                    background: 'rgba(184, 134, 11, 0.1)',
                    borderRadius: '50%',
                    animation: 'float 8s ease-in-out infinite',
                    animationDelay: '2s',
                    zIndex: 2
                }}></div>

                <h2 style={{ 
                    textAlign: 'center', 
                    marginBottom: '60px', 
                    color: '#2c1810',
                    fontSize: '42px',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: '400',
                    letterSpacing: '3px',
                    lineHeight: '1.2',
                    opacity: '0',
                    transform: 'translateY(30px)',
                    animation: 'slideInUp 1s ease forwards',
                    animationDelay: '0.2s',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    position: 'relative',
                    zIndex: 3
                }}>
                    Services & Expériences
                </h2>
                
                <p style={{ 
                    textAlign: 'center', 
                    color: '#3d2914', 
                    fontSize: '20px',
                    maxWidth: '700px',
                    lineHeight: '1.8',
                    marginBottom: '80px',
                    fontFamily: 'Crimson Text, serif',
                    fontWeight: '400',
                    opacity: '0',
                    transform: 'translateY(30px)',
                    animation: 'slideInUp 1s ease forwards',
                    animationDelay: '0.4s',
                    position: 'relative',
                    zIndex: 3
                }}>
                    Plongez dans un univers où le luxe du désert rencontre l'hospitalité orientale. 
                    Chaque expérience est conçue pour éveiller vos sens et vous transporter dans 
                    les fastueux palais des mille et une nuits.
                </p>

                {/* Service cards remain the same */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '60px',
                    width: '100%',
                    marginTop: '40px',
                    position: 'relative',
                    zIndex: 3
                }}>
                    {/* Service cards code remains the same as in your original */}
                </div>

                <style>
                    {`
                        @keyframes slideInUp {
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        
                        @keyframes slideInScale {
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }
                        
                        @keyframes float {
                            0%, 100% {
                                transform: translateY(0px);
                            }
                            50% {
                                transform: translateY(-20px);
                            }
                        }
                    `}
                </style>
            </div>
        </div>
    );
};

export default Home;