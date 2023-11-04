import React from "react";
import Header from "../Home/Header/Header";
import Footer from "../Home/Footer/Footer";
import TicketList from "./TicketItems/TicketList";

const TicketLayout = () => {
  return (
    <div>
      <div className="container-main">
        <Header />
        <TicketList />
      </div>
      <Footer />
    </div>
  );
};

export default TicketLayout;