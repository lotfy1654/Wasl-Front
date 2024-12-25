'use client';

import { useEffect, useRef, useState } from "react";
import "./style.scss";
import axios from "axios";
import { Api_Uri } from "@/app/_api/api";

export default function Navbar() {
    const [currentUrl, setCurrentUrl] = useState("");
    const [navBarToggle, setNavBarToggle] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // New state for scroll
    const navBar = useRef();
    const toggleButton = useRef();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});
    const [someOneLoggedIn, setSomeOneLoggedIn] = useState(false);

    useEffect(() => {
        const urlNow = window.location.pathname;
        setCurrentUrl(urlNow);

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Check scroll position immediately when the page loads
        handleScroll();

        // Add scroll event listener
        document.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

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
        document.addEventListener("mousedown", handleClickoutside);
        return () => {
            document.removeEventListener("mousedown", handleClickoutside);
        };
    }, [navBarToggle]);

    // Check If User Logged In
    useEffect(() => {
        const token = localStorage.getItem("wasl-token");
        if (token) {
            setToken(token);
            setSomeOneLoggedIn(true);
        }
    }, []);

    // If Token Changed Fetch User Data
    useEffect(() => {
        if (!token) return;
        axios.get(`${Api_Uri}/auth/get-user-data`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                setUser({});
                localStorage.removeItem("wasl-token");
                setToken(null);
                setSomeOneLoggedIn(false);
            });
    }, [token]);

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
                                    {navBarToggle ?
                                        <i className="bi bi-x fs-1"></i>
                                        :
                                        <i className="bi bi-list fs-1"></i>
                                    }
                                </button>
                                {
                                    someOneLoggedIn
                                        ?
                                        <div className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer">
                                            <div>
                                                <img
                                                    src={user.profile_picture || "https://placehold.it/100x100"}
                                                    alt={`${user.first_name} ${user.last_name}`}
                                                    className="w-10 h-10 rounded-full border-2 border-white"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold">
                                                    {user.first_name} {user.last_name}
                                                </span>
                                                <button
                                                    className="text-xs hover:underline-offset-2 transition"
                                                    onClick={() => {
                                                        if (user.role == "Admin") {
                                                            window.location.href = "/dashboard/admin";
                                                        } else if (user.role == "User") {
                                                            window.location.href = "/dashboard/user";
                                                        } else if (user.role == "Manager") {
                                                            window.location.href = "/dashboard/manager";
                                                        } else {
                                                            window.location.href = "/";
                                                        }
                                                    }}
                                                >
                                                    عرض الملف الشخصي
                                                </button>
                                            </div>
                                        </div>
                                        // <div className="flex items-center gap-2 bg-blue-50 py-2 px-3 rounded-lg shadow-md border border-gray-200">
                                        //     <div className="flex items-center">
                                        //         <img
                                        //             src={user.profile_picture || "/default-avatar.png"}
                                        //             alt={`${user.first_name} ${user.last_name}`}
                                        //             className="w-10 h-10 rounded-full border-2 border-blue-500"
                                        //         />
                                        //     </div>
                                        //     <div className="flex flex-col">
                                        //         <span className="text-sm font-semibold text-gray-700">
                                        //             {user.first_name} {user.last_name}
                                        //         </span>
                                        //         <a
                                        //             href="/auth/profile"
                                        //             className="text-xs text-blue-500 hover:text-blue-600 transition duration-200"
                                        //         >
                                        //             عرض الملف الشخصي
                                        //         </a>
                                        //     </div>
                                        // </div>
                                        // <button className='nav-bar-btn-sign-in'>
                                        //     <a href={`/auth/profile`}
                                        //         className='nav-bar-btn-sign-in-link text-decoration-none rounded-5 fs-6 fw-semibold'>
                                        //         {user.first_name} {user.last_name}
                                        //     </a>
                                        // </button>
                                        :
                                        <button className='nav-bar-btn-sign-in'>
                                            <a href={`/auth/signin`}
                                                className='nav-bar-btn-sign-in-link text-decoration-none rounded-5 fs-6 fw-semibold'>
                                                تسجيل الدخول
                                            </a>
                                        </button>
                                }
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
                                    <a href='/#about-us' className='nav-bar-item-link text-decoration-none'>من نحن</a>
                                </li>
                                <li className='nav-bar-item'>
                                    <a href='/service' className='nav-bar-item-link text-decoration-none'>خدماتنا</a>
                                </li>
                                <li className='nav-bar-item'>
                                    <a href='/#contact-us' className='nav-bar-item-link text-decoration-none'>اتصل بنا</a>
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
