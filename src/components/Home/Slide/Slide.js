import React from 'react'
import './Slide.css'
import 'bootstrap/js/dist/carousel'

export default function Slide() {
  return (
    <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
    >
        <div className="carousel-inner">
            <div className="slide_items carousel-item active" data-bs-interval={4000}>
                <img src="assets/images/Welcome.jpg" className="d-block "/>
            </div>
            <div className="slide_items carousel-item" data-bs-interval={4000}>
                <img src="assets/images/wildlife1.jpg" className="d-block " width="2000" height="1333"/>
            </div>
            <div className="slide_items carousel-item" data-bs-interval={4000}>
                <img src="assets/images/Membership.jpg" className="d-block "/>
            </div>
            <div className="slide_items carousel-item" data-bs-interval={4000}>
                <img src="assets/images/GetATicketNow.jpg" className="d-block "/>
            </div>
            <div className="slide_items carousel-item" data-bs-interval={4000}>
                <img src="assets/images/Animal Info.jpg" className="d-block "/>
            </div>
            <div className="slide_items carousel-item" data-bs-interval={4000}>
                <img src="assets/images/Event.jpg" className="d-block "/>
            </div>
        </div>
        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
        >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
        >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  )
}
