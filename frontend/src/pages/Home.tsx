import HotelPresentationPicture from "../assets/image/hotel_pre.jpg";
import PalaisImg from "../assets/image/palais.jpg";
import SaharaOasisImg from "../assets/image/sahara_oasis.jpg";
import SaharaImg from "../assets/image/sahara.jpg";
// import RoomCard from "../components/RoomCard/RoomCard.tsx";
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
                    <Link 
                        href="/reservations" ariaLabel="Réserver une chambre">
                        Réserver une chambre
                    </Link>
                </div>

            </div>
            {/* Section for services and experiences */}
            {/* Under the hotel description and image slider */}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '80px',
                    padding: '80px 40px',
                    background: 'linear-gradient(135deg, #deb887 0%, #cd853f 50%, #8b4513 100%)',
                    borderRadius: '0',
                    // maxWidth: '1200px',
                    // margin: '80px auto 0',
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

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '60px',
                    width: '100%',
                    marginTop: '40px',
                    position: 'relative',
                    zIndex: 3
                }}>
                    <div style={{
                        background: 'rgba(255, 248, 220, 0.95)',
                        padding: '50px 40px',
                        borderRadius: '20px',
                        textAlign: 'center',
                        boxShadow: '0 20px 40px rgba(139, 69, 19, 0.2)',
                        border: '2px solid transparent',
                        backgroundClip: 'padding-box',
                        backgroundImage: 'linear-gradient(rgba(255, 248, 220, 0.95), rgba(255, 248, 220, 0.95)), linear-gradient(135deg, rgba(218, 165, 32, 0.3), rgba(205, 133, 63, 0.2), rgba(139, 69, 19, 0.1))',
                        backgroundOrigin: 'border-box',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        opacity: '0',
                        transform: 'translateY(50px) scale(0.9)',
                        animation: 'slideInScale 0.8s ease forwards',
                        animationDelay: '0.6s',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 30px 60px rgba(139, 69, 19, 0.3)';
                        e.currentTarget.style.backgroundImage = 'linear-gradient(rgba(255, 248, 220, 1), rgba(255, 248, 220, 1)), linear-gradient(135deg, rgba(218, 165, 32, 0.6), rgba(205, 133, 63, 0.4), rgba(139, 69, 19, 0.2))';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.2)';
                        e.currentTarget.style.backgroundImage = 'linear-gradient(rgba(255, 248, 220, 0.95), rgba(255, 248, 220, 0.95)), linear-gradient(135deg, rgba(218, 165, 32, 0.3), rgba(205, 133, 63, 0.2), rgba(139, 69, 19, 0.1))';
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #daa520 0%, #b8860b 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 30px',
                            fontSize: '28px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px rgba(218, 165, 32, 0.4)',
                            border: '3px solid rgba(255, 215, 0, 0.3)'
                        }}>🏺</div>
                        <h3 style={{ 
                            color: '#2c1810', 
                            margin: '0 0 20px 0', 
                            fontSize: '24px',
                            fontFamily: 'Playfair Display, serif',
                            fontWeight: '600',
                            letterSpacing: '1px'
                        }}>Hammam & Spa Oriental</h3>
                        <p style={{ 
                            color: '#5d4e37', 
                            fontSize: '16px', 
                            fontWeight: '400',
                            lineHeight: '1.6',
                            fontFamily: 'Crimson Text, serif'
                        }}>Rituels de beauté ancestraux dans un cadre authentique</p>
                    </div>
                    
                    <div style={{
                        background: 'rgba(255, 248, 220, 0.95)',
                        padding: '50px 40px',
                        borderRadius: '20px',
                        textAlign: 'center',
                        boxShadow: '0 20px 40px rgba(139, 69, 19, 0.2)',
                        border: '2px solid transparent',
                        backgroundClip: 'padding-box',
                        backgroundImage: 'linear-gradient(rgba(255, 248, 220, 0.95), rgba(255, 248, 220, 0.95)), linear-gradient(135deg, rgba(218, 165, 32, 0.3), rgba(205, 133, 63, 0.2), rgba(139, 69, 19, 0.1))',
                        backgroundOrigin: 'border-box',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        opacity: '0',
                        transform: 'translateY(50px) scale(0.9)',
                        animation: 'slideInScale 0.8s ease forwards',
                        animationDelay: '0.8s',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 30px 60px rgba(139, 69, 19, 0.3)';
                        e.currentTarget.style.backgroundImage = 'linear-gradient(rgba(255, 248, 220, 1), rgba(255, 248, 220, 1)), linear-gradient(135deg, rgba(218, 165, 32, 0.6), rgba(205, 133, 63, 0.4), rgba(139, 69, 19, 0.2))';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.2)';
                        e.currentTarget.style.backgroundImage = 'linear-gradient(rgba(255, 248, 220, 0.95), rgba(255, 248, 220, 0.95)), linear-gradient(135deg, rgba(218, 165, 32, 0.3), rgba(205, 133, 63, 0.2), rgba(139, 69, 19, 0.1))';
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #cd853f 0%, #a0522d 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 30px',
                            fontSize: '28px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px rgba(205, 133, 63, 0.4)',
                            border: '3px solid rgba(255, 215, 0, 0.3)'
                        }}>🍯</div>
                        <h3 style={{ 
                            color: '#2c1810', 
                            margin: '0 0 20px 0', 
                            fontSize: '24px',
                            fontFamily: 'Playfair Display, serif',
                            fontWeight: '600',
                            letterSpacing: '1px'
                        }}>Cuisine des Mille Épices</h3>
                        <p style={{ 
                            color: '#5d4e37', 
                            fontSize: '16px', 
                            fontWeight: '400',
                            lineHeight: '1.6',
                            fontFamily: 'Crimson Text, serif'
                        }}>Saveurs orientales authentiques et délices du désert</p>
                    </div>
                    
                    <div style={{
                        background: 'rgba(255, 248, 220, 0.95)',
                        padding: '50px 40px',
                        borderRadius: '20px',
                        textAlign: 'center',
                        boxShadow: '0 20px 40px rgba(139, 69, 19, 0.2)',
                        border: '2px solid transparent',
                        backgroundClip: 'padding-box',
                        backgroundImage: 'linear-gradient(rgba(255, 248, 220, 0.95), rgba(255, 248, 220, 0.95)), linear-gradient(135deg, rgba(218, 165, 32, 0.3), rgba(205, 133, 63, 0.2), rgba(139, 69, 19, 0.1))',
                        backgroundOrigin: 'border-box',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        opacity: '0',
                        transform: 'translateY(50px) scale(0.9)',
                        animation: 'slideInScale 0.8s ease forwards',
                        animationDelay: '1s',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 30px 60px rgba(139, 69, 19, 0.3)';
                        e.currentTarget.style.backgroundImage = 'linear-gradient(rgba(255, 248, 220, 1), rgba(255, 248, 220, 1)), linear-gradient(135deg, rgba(218, 165, 32, 0.6), rgba(205, 133, 63, 0.4), rgba(139, 69, 19, 0.2))';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.2)';
                        e.currentTarget.style.backgroundImage = 'linear-gradient(rgba(255, 248, 220, 0.95), rgba(255, 248, 220, 0.95)), linear-gradient(135deg, rgba(218, 165, 32, 0.3), rgba(205, 133, 63, 0.2), rgba(139, 69, 19, 0.1))';
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #daa520 0%, #ff6347 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 30px',
                            fontSize: '28px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px rgba(218, 165, 32, 0.4)',
                            border: '3px solid rgba(255, 215, 0, 0.3)'
                        }}>🏜️</div>
                        <h3 style={{ 
                            color: '#2c1810', 
                            margin: '0 0 20px 0', 
                            fontSize: '24px',
                            fontFamily: 'Playfair Display, serif',
                            fontWeight: '600',
                            letterSpacing: '1px'
                        }}>Expéditions Désert</h3>
                        <p style={{ 
                            color: '#5d4e37', 
                            fontSize: '16px', 
                            fontWeight: '400',
                            lineHeight: '1.6',
                            fontFamily: 'Crimson Text, serif'
                        }}>Aventures sur mesure dans les dunes dorées</p>
                    </div>
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