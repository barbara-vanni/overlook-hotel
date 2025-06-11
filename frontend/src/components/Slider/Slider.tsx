import "./Slider.css";
import React, { useState, useEffect } from 'react';

interface ImageSliderProps {
    images: string[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ 
    images, 
    autoPlay = true, 
    autoPlayInterval = 2000 
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            goToNext();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, currentIndex]);

    return (
    <div className="slider" style={{ position: 'relative', textAlign: 'center' }}>
        <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            style={{ width: '700px', height: '450px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
        />
        <div
            style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                width: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            {images.map((_, idx) => (
                <span
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                        width: currentIndex === idx ? '16px' : '10px',
                        height: currentIndex === idx ? '16px' : '10px',
                        borderRadius: '50%',
                        background: currentIndex === idx ? '#222' : '#ccc',
                        boxShadow: currentIndex === idx ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'inline-block',
                        border: currentIndex === idx ? '2px solid #fff' : 'none',
                    }}
                />
            ))}
        </div>
    </div>
    );
};

export { ImageSlider };
export default ImageSlider;