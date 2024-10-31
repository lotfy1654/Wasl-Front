"use client"

import { useEffect } from "react";

// Importing Bootstrap Icons CSS for icon usage
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importing AOS (Animate On Scroll) library for scroll animations
import AOS from 'aos';
// Importing AOS CSS styles
import 'aos/dist/aos.css';

// Importing SweetAlert2 for enhanced alert dialogs
import 'sweetalert2/src/sweetalert2.scss';

// Importing Swiper CSS styles
import 'swiper/css';
import 'swiper/css/pagination';

import 'react-datepicker/dist/react-datepicker.css';


export default function Template({ children }) {

    useEffect(() => {
        AOS.init({
            duration: 1200, // Duration of animations
            once: true, // Whether animation should happen only once,
            easing: 'ease-in-out', // Easing function for animations

        });
        import("bootstrap/dist/js/bootstrap")
    }, []);


    return (
        <>
            {children}
        </>
    );
}