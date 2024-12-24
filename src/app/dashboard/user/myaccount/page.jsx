'use client';

import { Api_Uri } from '@/app/_api/api';
import SidebarLayout from '@/components/User-Controle-Components/SideBar/Sidebar';
import showUnauthorizedAlert from '@/components/NotAuthError';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaUserAlt, FaEnvelope, FaPhone, FaGlobe, FaBriefcase } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons


export default function Page() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        country: '',
        date_of_birth: '',
        profile_picture: null, // For handling file input
    });
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        new_password2: '',
    });
    // State to toggle visibility of password fields
    const [passwordVisibility, setPasswordVisibility] = useState({
        old_password: false,
        new_password: false,
        new_password2: false,
    });

    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    const fetchingData = () => {
        axios
            .get(`${Api_Uri}/auth/get-user-data`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(false);
                setFormData({
                    user_id: response.data.id,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    username: response.data.username,
                    email: response.data.email,
                    phone: response.data.phone,
                    country: response.data.country,
                    date_of_birth: response.data.date_of_birth,
                });
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    showUnauthorizedAlert();
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while fetching data. Please try again later.',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector('.swal2-timer-progress-bar');
                        if (progressBar) {
                            progressBar.style.background = '#d33';
                        }
                    },
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!token) return;
        fetchingData();
    }, [token]);

    const handleUpdate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            phone: '',
            country: '',
            date_of_birth: '',
            profile_picture: null, // Reset profile picture
        });
    };

    // Handle form field changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input changes (for profile picture)
    const handleFileChange = (e) => {
        const { files } = e.target;
        if (files && files[0]) {
            setFormData((prevData) => ({
                ...prevData,
                profile_picture: files[0], // Save the file object
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('first_name', formData.first_name);
        form.append('last_name', formData.last_name);
        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('country', formData.country);
        form.append('user_id', formData.user_id); // Add user ID to the form data
        form.append('date_of_birth', formData.date_of_birth);
        for (let key in formData) {
            if (key === 'profile_picture' && formData[key]) {
                form.append(key, formData[key]); // Append file
            } else {
                form.append(key, formData[key]); // Append other form data
            }
        }
        axios.post(`${Api_Uri}/auth/update-user-data`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data updated successfully!',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector('.swal2-timer-progress-bar');
                        if (progressBar) {
                            progressBar.style.background = '#16a34a';
                        }
                    },
                });
                fetchingData(); // Fetch data again after updating
                handleCloseModal(); // Close modal on success
                window.location.reload();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while updating the data.',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector('.swal2-timer-progress-bar');
                        if (progressBar) {
                            progressBar.style.background = '#d33';
                        }
                    },
                });
            });
    };


    // Open and Close Password Modal
    const handleOpenPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setPasswordData({
            old_password: '',
            new_password: '',
            new_password2: '',
        });
    };

    // Handle password data form change
    const handlePasswordDataChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle password visibility toggle
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prevVisibility) => ({
            ...prevVisibility,
            [field]: !prevVisibility[field],
        }));
    };

    // Handle password change submission
    const handlePasswordChangeSubmit = (e) => {
        e.preventDefault();

        // Validation for matching new passwords
        if (passwordData.new_password !== passwordData.new_password2) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'New passwords do not match. Please try again.',
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector('.swal2-timer-progress-bar');
                    if (progressBar) {
                        progressBar.style.background = '#d33';
                    }
                },
            });
            return;
        }

        axios.post(`${Api_Uri}/auth/change-password`, passwordData, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password updated successfully!',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector('.swal2-timer-progress-bar');
                        if (progressBar) {
                            progressBar.style.background = '#16a34a';
                        }
                    },
                });
                handleClosePasswordModal(); // Close modal on success
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while updating the password.',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector('.swal2-timer-progress-bar');
                        if (progressBar) {
                            progressBar.style.background = '#d33';
                        }
                    },
                });
            })
    };



    return (
        <SidebarLayout currentTab="account">
            <div className="min-h-screen flex flex-col" dir="rtl">
                <div className="flex-1">
                    {data ? (
                        <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center space-y-8">
                            <div className="relative">
                                <img
                                    src={data?.profile_picture || 'https://placehold.it/100x100'}
                                    alt={`${data.first_name} ${data.last_name}`}
                                    className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover"
                                />
                                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {data.first_name} {data.last_name}
                            </h2>
                            <p className="text-sm text-gray-500 italic">{data.role}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                                {/* Info Cards */}
                                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                                    <FaUserAlt className="text-indigo-500 text-4xl mb-4" />
                                    <h3 className="text-md font-medium text-gray-600">اسم المستخدم</h3>
                                    <p className="text-lg font-semibold text-gray-800">{data.username}</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                                    <FaEnvelope className="text-green-500 text-4xl mb-4" />
                                    <h3 className="text-md font-medium text-gray-600">البريد الإلكتروني</h3>
                                    <p className="text-lg font-semibold text-gray-800">{data.email}</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                                    <FaPhone className="text-yellow-500 text-4xl mb-4" />
                                    <h3 className="text-md font-medium text-gray-600">رقم الهاتف</h3>
                                    <p className="text-lg font-semibold text-gray-800">{data.phone}</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                                    <FaGlobe className="text-blue-500 text-4xl mb-4" />
                                    <h3 className="text-md font-medium text-gray-600">الدولة</h3>
                                    <p className="text-lg font-semibold text-gray-800">{data.country}</p>
                                </div>

                                {/* date_of_birth */}
                                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                                    <FaBriefcase className="text-blue-500 text-4xl mb-4" />
                                    <h3 className="text-md font-medium text-gray-600">تاريخ الميلاد</h3>
                                    <p className="text-lg font-semibold text-gray-800">{data.date_of_birth}</p>
                                </div>

                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                {/* Update Personal Data Button */}
                                <button
                                    onClick={handleUpdate}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white text-lg font-medium rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
                                >
                                    تحديث البيانات الشخصية
                                </button>

                                {/* Change Password Button */}
                                <button
                                    onClick={handleOpenPasswordModal}
                                    className="px-8 py-3 bg-gradient-to-r from-purple-400 to-purple-500 text-white text-lg font-medium rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
                                >
                                    تغيير كلمة المرور
                                </button>
                            </div>

                        </div>
                    ) : (
                        <p className="text-gray-500">لم يتم العثور على بيانات المستخدم.</p>
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-8 w-11/12 max-w-lg overflow-y-auto" style={{ maxHeight: '80vh' }}>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">تحديث البيانات</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* First Name Field */}
                                <div>
                                    <label htmlFor="first_name" className="block text-gray-600 mb-2">الاسم الأول</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Last Name Field */}
                                <div>
                                    <label htmlFor="last_name" className="block text-gray-600 mb-2">الاسم الأخير</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Username Field */}
                                <div>
                                    <label htmlFor="username" className="block text-gray-600 mb-2">اسم المستخدم</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-600 mb-2">البريد الإلكتروني</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-gray-600 mb-2">رقم الهاتف</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Country Field */}
                                <div>
                                    <label htmlFor="country" className="block text-gray-600 mb-2">الدولة</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Date of Birth Field */}
                                <div>
                                    <label htmlFor="date_of_birth" className="block text-gray-600 mb-2">تاريخ الميلاد</label>
                                    <input
                                        type="date"
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        value={formData.date_of_birth}
                                        onChange={handleFormChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                {/* Profile Picture Field */}
                                <div>
                                    <label htmlFor="profile_picture" className="block text-gray-600 mb-2">صورة الملف الشخصي</label>
                                    <input
                                        type="file"
                                        id="profile_picture"
                                        name="profile_picture"
                                        onChange={handleFileChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="flex justify-between gap-4 mt-6">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-500 text-white rounded-md w-50"
                                    >
                                        تحديث
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md w-50"
                                    >
                                        إغلاق
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Password Change Modal */}
                {isPasswordModalOpen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">تغيير كلمة المرور</h2>
                            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                                {/* Old Password Field */}
                                <div className="relative">
                                    <label htmlFor="old_password" className="block text-gray-600 mb-2">كلمة المرور القديمة</label>
                                    <input
                                        type={passwordVisibility.old_password ? 'text' : 'password'}
                                        id="old_password"
                                        name="old_password"
                                        value={passwordData.old_password}
                                        onChange={handlePasswordDataChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <div
                                        onClick={() => togglePasswordVisibility('old_password')}
                                        className="absolute top-[60%] left-2 cursor-pointer"
                                    >
                                        {passwordVisibility.old_password ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>

                                {/* New Password Field */}
                                <div className="relative">
                                    <label htmlFor="new_password" className="block text-gray-600 mb-2">كلمة المرور الجديدة</label>
                                    <input
                                        type={passwordVisibility.new_password ? 'text' : 'password'}
                                        id="new_password"
                                        name="new_password"
                                        value={passwordData.new_password}
                                        onChange={handlePasswordDataChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <div
                                        onClick={() => togglePasswordVisibility('new_password')}
                                        className="absolute top-[60%] left-2 cursor-pointer"
                                    >
                                        {passwordVisibility.new_password ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>

                                {/* Confirm New Password Field */}
                                <div className="relative">
                                    <label htmlFor="new_password2" className="block text-gray-600 mb-2">تأكيد كلمة المرور الجديدة</label>
                                    <input
                                        type={passwordVisibility.new_password2 ? 'text' : 'password'}
                                        id="new_password2"
                                        name="new_password2"
                                        value={passwordData.new_password2}
                                        onChange={handlePasswordDataChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <div
                                        onClick={() => togglePasswordVisibility('new_password2')}
                                        className="absolute top-[60%] left-2 cursor-pointer"
                                    >
                                        {passwordVisibility.new_password2 ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>

                                <div className="flex justify-between gap-4 mt-4">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-500 text-white rounded-md w-50"
                                    >
                                        تغيير كلمة المرور
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClosePasswordModal}
                                        className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md w-50"
                                    >
                                        إغلاق
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </SidebarLayout>
    );
}
