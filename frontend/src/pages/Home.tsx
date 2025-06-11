import JasminSuitePicture from '../assets/image/JasminSuitePicture.jpg';

const Home = () => {
    return (

        <div>
            <img            src={JasminSuitePicture}
                            alt="Hotel Presentation"
                            style={{
                                width: '100%',
                                height: 'auto',
                                margin: 0,
                                padding: 0
                            }} />
            <h1>Welcome to Overlook Hotel</h1>
            <p>This is the homepage of the application.</p>
        </div>
    );
};

export default Home;