'use client';

import { useState, useEffect } from "react";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1200, // Duration of animations
            once: true, // Whether animation should happen only once
            easing: 'ease-in-out', // Easing function for animations
        });

        import("bootstrap/dist/js/bootstrap");

        // Simulate loading process (e.g., after fetching data or page rendering)
        setTimeout(() => {
            setLoading(false);
        }, 1500); // Adjust time for your loading needs
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
                    </div>
                </>
            ) : (
                <>{children}</> // Display the actual content once loading is complete
            )}
        </>
    );
}
