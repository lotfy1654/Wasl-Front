import { Api_Uri } from "@/app/_api/api";
import showUnauthorizedAlert from "@/components/NotAuthError";
import axios from "axios";
import { useState, useEffect, use } from "react";
import { FaBars, FaHome, FaChevronDown, FaTimes, FaEnvelope, FaPenAlt, FaInfoCircle } from "react-icons/fa";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";

const SidebarLayout = ({ children, currentTab }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({
        dashboard: false,
        userSettings: false,
        generalSettings: false,
        more: false,
        adminSettings: false,
        accountSettings: false,
    });
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


    const toggleDropdown = (section) => {
        setDropdownOpen((prevState) => {
            const newState = {
                dashboard: false,
                userSettings: false,
                generalSettings: false,
                more: false,
                adminSettings: false,
                accountSettings: false,
            };
            newState[section] = !prevState[section];  // Only toggle the clicked section
            return newState;
        });
    };

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

    // Select Where currentTab in any dropdownOpen and active it
    useEffect(() => {
        if (currentTab === 'home' || currentTab === 'aboutus' || currentTab === 'blog' || currentTab === 'messages') {
            setDropdownOpen({ ...dropdownOpen, adminSettings: true })
        } else if (currentTab === 'package') {
            setDropdownOpen({ ...dropdownOpen, dashboard: true })
        } else if (currentTab === 'customer' || currentTab === 'employee' || currentTab === 'everyone') {
            setDropdownOpen({ ...dropdownOpen, userSettings: true })
        } else if (currentTab === 'service' || currentTab === 'order') {
            setDropdownOpen({ ...dropdownOpen, generalSettings: true })
        } else if (currentTab === 'account') {
            setDropdownOpen({ ...dropdownOpen, accountSettings: true })
        } else {
            return;
        }
    }, [currentTab])

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
                <div className="flex justify-between items-center p-4 mt-8">
                    {/* User profile */}
                    <div className="flex items-center space-x-3">
                        <img
                            src={userData?.profile_picture}
                            alt="User profile"
                            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                        />
                        <div>
                            <span className="text-lg font-semibold me-2">
                                {userData?.first_name} {" "} {userData?.last_name}
                            </span>
                            <p className="text-sm text-gray-300 me-2">{userData?.role}</p>
                        </div>
                    </div>
                </div>
                {/* Sidebar content */}
                <div className="space-y-6 px-4 py-4">
                    {/* Dashboard Section */}
                    <div>
                        <h3
                            className="text-sm mb-3 font-medium text-gray-300 cursor-pointer flex justify-between items-center transition duration-300"
                            onClick={() => toggleDropdown("adminSettings")}
                        >
                            <span>
                                محتوى الموقع و الرسائل
                            </span>
                            <FaChevronDown
                                className={`ml-2 transition-transform duration-300 ${dropdownOpen.adminSettings ? "rotate-180" : ""}`}
                            />
                        </h3>

                        {dropdownOpen.adminSettings && (
                            <ul className="pl-6 space-y-2">
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('home')}`}>
                                    <a href="/dashboard/admin/home" className="flex items-center w-full">
                                        <FaHome className="mr-3 ms-2" />
                                        <span>الصفحة الرئيسية</span>
                                    </a>
                                </li>
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('aboutus')}`}>
                                    <a href="/dashboard/admin/aboutus" className="flex items-center w-full">
                                        <FaInfoCircle className="mr-3 ms-2" />
                                        <span>من نحن</span>
                                    </a>
                                </li>
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('blog')}`}>
                                    <a href="/dashboard/admin/blog" className="flex items-center w-full">
                                        <FaPenAlt className="mr-3 ms-2" />
                                        <span>المدونة</span>
                                    </a>
                                </li>
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('messages')}`}>
                                    <a href="/dashboard/admin/messages" className="flex items-center w-full">
                                        <FaEnvelope className="mr-3 ms-2" />
                                        <span>الرسائل</span>
                                    </a>
                                </li>

                            </ul>
                        )}
                    </div>

                    <div>
                        <h3
                            className="text-sm mb-3 font-medium text-gray-300 cursor-pointer flex justify-between items-center transition duration-300"
                            onClick={() => toggleDropdown("dashboard")}
                        >
                            <span>
                                الباقات
                            </span>
                            <i
                                className={`ml-2 transition-transform duration-300 ${dropdownOpen.dashboard ? "rotate-180" : ""} bi bi-chevron-down`}
                            />
                        </h3>
                        {dropdownOpen.dashboard && (
                            <ul className="pl-6 space-y-2">
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('package')}`}>
                                    <a href="/dashboard/admin/packages" className="flex items-center w-full">
                                        <i className="mr-3 ms-2 bi bi-house-door" /> {/* Bootstrap icon for home */}
                                        <span>
                                            الباقات الاساسية
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* User Settings Section */}
                    <div>
                        <h3
                            className="text-sm mb-3 font-medium text-gray-300 cursor-pointer flex justify-between items-center transition duration-300"
                            onClick={() => toggleDropdown("userSettings")}
                        >
                            <span>إعدادات المستخدم</span>
                            <FaChevronDown
                                className={`ml-2 transition-transform duration-300 ${dropdownOpen.userSettings ? "rotate-180" : ""}`}
                            />
                        </h3>
                        {dropdownOpen.userSettings && (
                            <ul className="pl-6 space-y-2">
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('everyone')}`}>
                                    <a href="/dashboard/admin/everyone" className="flex items-center w-full">
                                        <FaUsers className="mr-3 ms-2" /> {/* Reused FaUsers icon */}
                                        <span>الجميع</span>
                                    </a>
                                </li>
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('employee')}`}>
                                    <a href="/dashboard/admin/employees" className="flex items-center w-full">
                                        <FaChalkboardTeacher className="mr-3 ms-2" /> {/* Changed icon to FaChalkboardTeacher */}
                                        <span>الموظفين</span>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>


                    {/* Settings Section with Dropdown */}
                    <div>
                        <h3
                            className="text-sm mb-3 font-medium text-gray-300 cursor-pointer flex justify-between items-center transition duration-300"
                            onClick={() => toggleDropdown("generalSettings")}
                        >
                            <span>
                                الخدمات
                            </span>
                            <i
                                className={`ml-2 transition-transform duration-300 ${dropdownOpen.generalSettings ? "rotate-180" : ""} bi bi-chevron-down`}
                            />
                        </h3>
                        {dropdownOpen.generalSettings && (
                            <ul className="pl-6 space-y-2">
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('service')}`}>
                                    <a href="/dashboard/admin/services" className="flex items-center w-full">
                                        <i className="mr-3 ms-2 bi bi-clipboard-check" /> {/* Bootstrap icon for clipboard */}
                                        <span>إدارة الخدمات</span> {/* More descriptive text */}
                                    </a>
                                </li>
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('order')}`}>
                                    <a href="/dashboard/admin/services/order" className="flex items-center w-full">
                                        <i className="mr-3 ms-2 bi bi-person-lock" /> {/* Bootstrap icon for roles */}
                                        <span>إدارة الطلبيات</span> {/* More descriptive text */}
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div>
                        <h3
                            className="text-sm mb-3 font-medium text-gray-300 cursor-pointer flex justify-between items-center transition duration-300"
                            onClick={() => toggleDropdown("accountSettings")}
                        >
                            <span>إعدادات الحساب</span>
                            <FaChevronDown
                                className={`ml-2 transition-transform duration-300 ${dropdownOpen.accountSettings ? "rotate-180" : ""}`}
                            />
                        </h3>
                        {dropdownOpen.accountSettings && (
                            <ul className="pl-6 space-y-2">
                                <li className={`p-3 text-sm hover:bg-indigo-600 rounded-lg ${isActiveTab('account')}`}>
                                    <a href="/dashboard/admin/myaccount" className="flex items-center w-full">
                                        <FaHome className="mr-3 ms-2" />
                                        <span>إعدادات الحساب</span>
                                    </a>
                                </li>
                            </ul>
                        )}
                        <div
                            className="p-3 mt-3 text-sm hover:bg-red-600 rounded-lg flex items-center cursor-pointer w-100 justify-center pointer"
                            onClick={() => {
                                localStorage.removeItem('wasl-token')
                                window.location.href = '/auth/signin'
                            }}
                        >
                            <i className="mr-3 ms-2 bi bi-box-arrow-right text-white" />
                            <span className="text-white">تسجيل الخروج</span>
                        </div>
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
