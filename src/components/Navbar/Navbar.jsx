'use client';

import { useEffect, useRef, useState } from "react";
import "./style.scss";

export default function Navbar() {
    const [currentUrl, setCurrentUrl] = useState("");
    const [navBarToggle, setNavBarToggle] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // New state for scroll
    const navBar = useRef();
    const toggleButton = useRef();

    useEffect(() => {
        const urlNow = window.location.pathname;
        setCurrentUrl(urlNow);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 50) { // Change 50 to your desired scroll threshold
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const handleClickoutside = (e) => {
        if (
            navBarToggle &&
            !navBar.current.contains(e.target) &&
            !toggleButton.current.contains(e.target) // Exclude toggle button itself
        ) {
            setNavBarToggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScroll); // Add scroll event listener
        document.addEventListener("mousedown", handleClickoutside);
        return () => {
            document.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickoutside);
        };
    }, [navBarToggle]);

    return (
        <div className={`nav-bar-component ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid">
                <div className='nav-bar p-2'>
                    <div className='row align-items-center'>
                        <div className='col-lg-3 col-md-6 col-xs-6'>
                            <div className="box-sign-in-toggel d-flex justify-content-start align-items-center gap-3">
                                <button
                                    className={`nav-bar-toggle-btn rounded-2 d-lg-none d-md-block ${navBarToggle ? "toggle-active" : ""}`}
                                    onClick={() => setNavBarToggle(!navBarToggle)}
                                    ref={toggleButton}
                                >
                                    {
                                        navBarToggle ?
                                            <i className="bi bi-x fs-1"></i>
                                            :
                                            <i className="bi bi-list fs-1"></i>
                                    }
                                </button>
                                <button className='nav-bar-btn-sign-in'>
                                    <a href={`/auth/login`}
                                        className='nav-bar-btn-sign-in-link text-decoration-none rounded-5 fs-6 fw-semibold'>
                                        تسجيل الدخول
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div className={`col-lg-6 all-wrap-lists-navs ${navBarToggle ? "nav-bar-list-active" : ""}`}
                            ref={navBar}
                        >
                            <ul className='nav-bar-list d-flex justify-content-around align-items-lg-center align-items-md-start'>
                                <li className='nav-bar-item'>
                                    <a href='/' className='nav-bar-item-link text-decoration-none'>الرئيسية</a>
                                </li>
                                <li className='nav-bar-item'>
                                    <a href='/' className='nav-bar-item-link text-decoration-none'>من نحن</a>
                                </li>
                                <li className='nav-bar-item'>
                                    <a href='/' className='nav-bar-item-link text-decoration-none'>خدماتنا</a>
                                </li>
                                <li className='nav-bar-item'>
                                    <a href='/' className='nav-bar-item-link text-decoration-none'>اتصل بنا</a>
                                </li>
                            </ul>
                        </div>

                        <div className='col-lg-3 col-md-6 col-xs-6'>
                            <p className='nav-bar-logo fs-2 fw-bold m-0 d-flex justify-content-end align-items-center'>Wasl</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
