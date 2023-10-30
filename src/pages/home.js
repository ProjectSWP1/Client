import React from 'react';
import FollowUs from '../components/Home/FollowUs/FollowUs.js';
import Footer from '../components/Home/Footer/Footer.js';
import Header from '../components/Home/Header/Header.js';
import History from '../components/Home/History/History.js';
import Slide from '../components/Home/Slide/Slide.js';
import News from '../components/Home/News/News.js';


const Home = () => {
    return (
        <div>
            <div className='container-main'>
                <Header />
                <Slide />
                <History />
                <News />
                <FollowUs />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
