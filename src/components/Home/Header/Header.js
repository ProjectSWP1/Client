import React from 'react'
import './Header.css'

window.onscroll = function() {scrollFunction()}

function scrollFunction() {
    if(document.body.scroll> 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("nav-bg_onscroll").style.opacity = "0.9";
        document.getElementById("nav-bg_onscroll").style.backgroundColor = "#5D9C59";
        document.getElementById("nav-bg_onscroll").style.transition = "0.3s";
      } else {
        document.getElementById("nav-bg_onscroll").style.opacity = "1";
        document.getElementById("nav-bg_onscroll").style.backgroundColor = "";
      }
}

export default function Header() {
    return (
        <section className="container-header">
            <section className="nav-bg" id="nav-bg_onscroll">
                {/* logo */}
                <div className="nav-logo">
                    <a href="#">
                        <img src='assets/images/zookay.png'/>
                    </a>
                </div>

                {/* button */}
                <input className="btn-toggle-menu" type="checkbox" />
                <div className="toggle-menu-icon">
                    <span />
                </div>

                {/* menu */}
                <div className="nav-menu">
                    <ul className="nav-menu__list">
                        <li className="nav-menu__item">
                            <a href="#" className="nav-menu__link">
                                Plan The Visit
                            </a>
                        </li>
                        <li className="nav-menu__item">
                            <a href="/register" className="nav-menu__link">
                                Membership
                            </a>
                        </li>
                        <li className="nav-menu__item">
                            <a href="#" className="nav-menu__link">
                                Contact Us
                            </a>
                        </li>
                        <li className="nav-menu__item">
                            <a href="#" className="nav-menu__link">
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    )
}
