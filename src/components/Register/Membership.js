import React from "react";
import Header from "../Home/Header/Header";
import Slide from "../Home/Slide/Slide";
import Footer from "../Home/Footer/Footer";
import News from "../Home/News/News";
import "./Membership.css"; // Import your CSS file
import { Link } from "react-router-dom";

const Membership = () => {
  return (
    <div>
      <Header />
      <Slide />
      <div className="separator-line"></div>
      <div className="container-main">
        <div className="membership-text">Membership</div>

        <div className="membership-content row">
          <div className="col-md-6 order-md-1 membership-info">
            <p className="membership-intro">
              Unlock a World of Membership Benefits at Our Zoo!
            </p>

            <p className="membership-description">
              At ZooKay, we believe that our community of animal lovers deserves
              an extra special experience. That's why we're thrilled to
              introduce our Membership Program, specially designed to bring you
              closer to the world of wildlife while enjoying a host of exclusive
              benefits.
            </p>
          </div>

          <div className="col-md-6 order-md-2 membership-image">
            <img
              src="assets/images/crocodile.jpg"
              alt="Membership Image"
              className="img-fluid"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="why-become-member">Why Become a Member?</h2>
            <p className="membership-description">
              At ZooKay, we believe that our community of animal lovers deserves
              an extra special experience. That's why we're thrilled to
              introduce our Membership Program, specially designed to bring you
              closer to the world of wildlife while enjoying a host of exclusive
              benefits.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <h3>Exclusive Discounts</h3>
            <p>
              As a valued member, you'll enjoy exclusive discounts when
              purchasing tickets. Get ready for incredible savings every time
              you visit our zoo. Whether you're planning a solo outing, a family
              day, or a group adventure, your membership will make every visit
              budget-friendly.
            </p>
          </div>
          <div className="col-md-4">
            <h3>Stay Informed</h3>
            <p>
              Being a part of our membership community means you'll never miss
              out on the latest happenings at the zoo. Receive real-time
              notifications about upcoming events, exciting news, and
              fascinating updates on our animal residents. Stay in the know and
              be the first to hear about all the thrilling activities taking
              place at the zoo.
            </p>
          </div>
          <div className="col-md-4">
            <h3>Access to Order History</h3>
            <p>
              Keep track of your zoo adventures with ease. Our membership
              program allows you to access your order history effortlessly.
              Relive your favorite visits, reminisce about those unforgettable
              moments, and plan new journeys to explore our zoo again and again.
            </p>
          </div>
        </div>

        <div className="membership-intro">How to Join Membership?</div>

        <div className="join-now">

        
        <div> 
          <p className="join-now-description">
            Becoming a member at ZooKay is simple and, best of all,
            completely free. All you need to do is register an account, and
            you'll instantly gain access to a world of benefits. Ready to embark
            on this incredible journey? Sign up now and become a part of our
            passionate community of animal enthusiasts.
          </p>
        </div>

        <p className="join-now-cta">
          Join us today and experience the magic of the animal kingdom like
          never before. <a href="/register">Register now</a> and start your
          wildlife adventure with ZooKay. We can't wait to welcome you to our
          vibrant community!
        </p>

        </div>

        <Link to="/register" className="join-now-button">
        Join Now
        </Link>
      </div>
      <div className="separator-line"></div>
      <News />
      <Footer />
    </div>
  );
};

export default Membership;
