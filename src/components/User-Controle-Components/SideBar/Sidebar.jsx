import { Api_Uri } from "@/app/_api/api";
import showUnauthorizedAlert from "@/components/NotAuthError";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaBars, FaClipboardList, FaTimes } from "react-icons/fa";
import { FaUserCog } from 'react-icons/fa';
import Swal from "sweetalert2";

const SidebarLayout = ({ children, currentTab }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [userData, setUserData] = useState({})
    const [token, setToken] = useState('');

    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken)
        } else {
            showUnauthorizedAlert()
        }
    }, [])

    useEffect(() => {
        if (!token) return;

        axios.get(`${Api_Uri}/auth/get-user-data`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            setUserData(response.data)
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Please Login Again",
                text: "Your Session has been expired",
                timer: 2000,
                showConfirmButton: false,
                showCancelButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#ef4444";
                    }
                },
                willClose: () => {
                    localStorage.removeItem('wasl-token')
                    window.location.href = '/auth/signin'
                }

            })
        })
    }, [token])


    // Handle clicking outside sidebar to close it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".sidebar") && sidebarOpen) {
                setSidebarOpen(false);
                setOverlayVisible(false);
            }
        };

        // Attach event listener for clicks outside sidebar
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [sidebarOpen]);


    // Function to check if the current link is active
    const isActiveTab = (tab) => currentTab === tab ? "bg-indigo-600" : "";


    return (
        <div className="flex" dir="rtl">
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20"
                    onClick={() => {
                        setSidebarOpen(false);
                        setOverlayVisible(false);
                    }}
                />
            )}

            <div className={`sidebar fixed right-0 top-0 h-full bg-gray-800 text-gray-200 w-64 transition-transform duration-300 transform z-30 ${sidebarOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 shadow-xl max-h-screen overflow-y-auto scrollbar-custom`}>
                {/* Sidebar close button */}
                <div className="absolute top-4 right-4 lg:hidden">
                    <button
                        onClick={() => {
                            setSidebarOpen(false);
                            setOverlayVisible(false);
                        }}
                        className="text-gray-200 p-2 bg-indigo-600 rounded-full transition duration-300"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="flex justify-between items-center p-4 mt-8 bg-gray-800 rounded-lg shadow-md">
                    <div className="flex items-center space-x-4">
                        <img
                            src={userData?.profile_picture || 'https://placehold.it/100x100'}
                            alt="User profile"
                            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                        />
                        <div className="me-2">
                            <span className="text-sm font-semibold">{userData?.first_name} {userData?.last_name}</span>
                            <p className="text-sm text-gray-400">{userData?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="space-y-6 px-4 py-6">
                    <ul className="space-y-8">
                        {/* Tasks Link */}
                        <li
                            className={`p-3 flex items-center gap-2 text-sm rounded-lg hover:bg-indigo-600 transition ${isActiveTab('orders') ? 'bg-indigo-700' : ''}`}
                        >
                            <FaClipboardList className="text-xl mr-4" />
                            <a href="/dashboard/user/myorders" className="flex-1">
                                طلباتى
                            </a>
                        </li>

                        {/* Account Settings Link */}
                        <li
                            className={`p-3 flex items-center gap-2 text-sm rounded-lg hover:bg-indigo-600 transition ${isActiveTab('account') ? 'bg-indigo-700' : ''}`}
                        >
                            <FaUserCog className="text-xl mr-4" />
                            <a href="/dashboard/user/myaccount" className="flex-1">إعدادات الحساب</a>
                        </li>
                    </ul>

                    {/* Logout Button */}
                    <div
                        className="p-3 mt-12 text-center bg-red-600 text-sm rounded-lg cursor-pointer hover:bg-red-700 transition"
                        onClick={() => {
                            localStorage.removeItem('wasl-token');
                            window.location.href = '/auth/signin';
                        }}
                    >
                        <i className="bi bi-box-arrow-right text-lg ms-2"></i>
                        تسجيل الخروج
                    </div>
                </div>
            </div>
            {/* Main content */}
            <div className={`ml-0 lg:mr-64 w-full p-4 ${sidebarOpen ? "z-32" : "z-40"}`}
            >
                <button
                    className="lg:hidden absolute top-4 right-4 text-2xl text-gray-200 p-2 bg-indigo-600 rounded-full hover:bg-indigo-800 transition duration-300 ease-in-out shadow-lg z-10"
                    onClick={() => {
                        setSidebarOpen(!sidebarOpen);
                        setOverlayVisible(!overlayVisible);
                    }}
                >
                    <FaBars />
                </button>
                {children}
            </div>
        </div>
    );
};

export default SidebarLayout;
