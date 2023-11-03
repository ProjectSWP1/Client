import React from 'react';
import Header from '../components/Home/Header/Header';
import Footer from '../components/Home/Footer/Footer';
import Slide from '../components/Home/Slide/Slide';
import TicketList from '../components/User/TicketList';

const BuyTicket = () => {
	return (
		<div>
            <Header/>
            <Slide/>
            <TicketList/>
            <Footer/>
		</div>
	);
};

export default BuyTicket;
