'use client';
import React, { useEffect, useState } from 'react';
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import axios from 'axios';
import { Api_Uri } from '@/app/_api/api';
import showUnauthorizedAlert from '@/components/NotAuthError';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function Page() {
    const [data, setData] = useState({});

    const [token, setToken] = useState(null);
    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);


    const getDataUser = () => {
        axios.get(`${Api_Uri}/auth/get-user-data`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            if (err.response.status == 401) {
                showUnauthorizedAlert();
                return;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: "حدث خطأ اثناء تحميل البيانات",
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (!token) return;
        getDataUser();
    }, [token]);


    const [isModalOpen, setModalOpen] = useState(false);
    const [updatedData, setUpdatedData] = useState({});

    const detailCards = [
        { label: "البريد الإلكتروني", name: "email", value: data.email, icon: "📧", color: "bg-blue-100 text-blue-700" },
        { label: "اسم المستخدم", name: "username", value: data.username, icon: "👤", color: "bg-green-100 text-green-700" },
        { label: "رقم الهاتف", name: "phone", value: data.phone, icon: "📞", color: "bg-yellow-100 text-yellow-700" },
        { label: "الدولة", name: "country", value: data.country, icon: "🌍", color: "bg-red-100 text-red-700" },
        { label: "تاريخ الميلاد", name: "date_of_birth", value: data.date_of_birth || "غير محدد", icon: "📅", color: "bg-purple-100 text-purple-700" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        setUpdatedData({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            username: data.username,
            phone: data.phone,
            country: data.country,
            date_of_birth: data.date_of_birth,
            profile_picture: null,
        });
        setImagePreview(data.profile_picture);
        setModalOpen(true);
    };

    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Set the updatedData with the file
            setUpdatedData((prev) => ({
                ...prev,
                profile_picture: file,
            }));

            // Create a preview URL for the selected image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const renderErrors = (errorData) => {
        return Object.keys(errorData).map((key) => {
            return `
            <div>
                <h3 style="font-weight: bold; color: #d33;">${key.replace("_", " ").toUpperCase()}:</h3>
                <ul style="padding-left: 20px; color: #6c757d;">
                    ${errorData[key].map(error => `<li style="color: #d33;">${error}</li>`).join('')}
                </ul>
            </div>
            `;
        }).join('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataUser = new FormData();
        formDataUser.append("first_name", updatedData.first_name);
        formDataUser.append("last_name", updatedData.last_name);
        formDataUser.append("email", updatedData.email);
        formDataUser.append("username", updatedData.username);
        formDataUser.append("phone", updatedData.phone);
        formDataUser.append("country", updatedData.country);
        formDataUser.append("date_of_birth", updatedData.date_of_birth);
        if (typeof updatedData.profile_picture == "object" && updatedData.profile_picture !== null) {
            formDataUser.append("profile_picture", updatedData.profile_picture);
        }
        console.log("formDataUser", Object.fromEntries(formDataUser.entries()));

        axios.post(`${Api_Uri}/auth/update-user-data`, formDataUser, {
            headers: { Authorization: `Bearer ${token}`, },
        }).then((res) => {
            getDataUser();
            setModalOpen(false);

            Swal.fire({
                icon: 'success',
                title: 'تم التحديث بنجاح',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });

        }).catch((err) => {
            if (err.response.status == 401) {
                showUnauthorizedAlert();
                return;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    html: renderErrors(err.response.data),
                    timer: 8000,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    }
                });
            }
        })

    };

    const handleToggelModal = () => {
        setModalOpen(!isModalOpen);
        setUpdatedData({});
    };

    // Change Password

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        new_password2: '',
    });

    const [modalPassword, setModalPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPassword2, setShowNewPassword2] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePasswordVisibilityToggle = (field) => {
        if (field === 'old_password') {
            setShowOldPassword((prev) => !prev);
        } else if (field === 'new_password') {
            setShowNewPassword((prev) => !prev);
        } else if (field === 'new_password2') {
            setShowNewPassword2((prev) => !prev);
        }
    };

    const handleSubmitPassWord = (e) => {
        // Handle the form submission here
        e.preventDefault();
        console.log(formData);
        axios.post(`${Api_Uri}/auth/change-password`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setModalPassword(false);
            setFormData({
                old_password: '',
                new_password: '',
                new_password2: '',
            });
            Swal.fire({
                icon: 'success',
                title: 'Password Updated Successfully!',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });
        }).catch((err) => {
            if (err?.response?.status == 401) {
                showUnauthorizedAlert();
                return;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: err?.response?.data?.error || err?.response?.data || "حدث خطأ اثناء تحديث كلمة المرور",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    }
                });
            }
        });
    };


    return (
        <SideBar currentTab="account">
            <div className="p-4 bg-gray-100 min-h-screen">
                {/* Profile Header */}
                <div className="flex items-center bg-white rounded-lg shadow-md p-3 max-w-4xl mx-auto flex-wrap">
                    <div className="ml-6 flex-grow text-right">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {data.first_name} {data.last_name}
                        </h1>
                        <p className="text-lg text-gray-600">{data.role}</p>
                    </div>
                    <img
                        src={data.profile_picture}
                        alt="Profile"
                        className="rounded-full border-4 border-blue-500 w-28 h-28 mt-4"
                    />
                </div>

                {/* Details Cards */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {detailCards.map((card, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-lg ${card.color}`}
                        >
                            <div className="text-3xl">{card.icon}</div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                                <p className="text-lg font-semibold text-gray-800">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Update Button */}
                <div
                    className="mt-8 text-right max-w-4xl mx-auto d-flex justify-content-start flex-wrap gap-4"
                >
                    <button
                        onClick={() => handleUpdate()}
                        className="bg-blue-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                        تحديث البيانات
                    </button>
                    <button
                        onClick={() => setModalPassword(true)}
                        className="bg-indigo-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-indigo-600 transition"
                    >
                        تغير كلمة المرور
                    </button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">تحديث البيانات</h2>
                            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                                {[
                                    { label: "الاسم الأول", name: "first_name", type: "text", value: updatedData.first_name },
                                    { label: "الاسم الأخير", name: "last_name", type: "text", value: updatedData.last_name },
                                    { label: "البريد الإلكتروني", name: "email", type: "email", value: updatedData.email },
                                    { label: "اسم المستخدم", name: "username", type: "text", value: updatedData.username },
                                    { label: "رقم الهاتف", name: "phone", type: "text", value: updatedData.phone },
                                    { label: "الدولة", name: "country", type: "text", value: updatedData.country || "" },
                                    { label: "تاريخ الميلاد", name: "date_of_birth", type: "date", value: updatedData.date_of_birth || "" },
                                ].map((field, index) => (
                                    <div key={index}>
                                        <label className="block mb-2 text-sm font-semibold text-gray-600">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={field.value}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                                        />
                                    </div>
                                ))}
                                <div className="space-x-4">
                                    <label className="block mb-2 text-sm font-semibold text-gray-600">
                                        صورة الملف الشخصي
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                        />
                                        <div className="border-2 border-dashed border-gray-300 rounded-md px-3 py-2 flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 transition-all">
                                            <i className="bi bi-upload text-gray-600 text-lg"></i> {/* Bootstrap upload icon */}
                                            <span className="text-sm text-gray-600">اختر صورة</span>
                                        </div>
                                    </div>
                                    {/* Preview Image */}
                                    {imagePreview && (
                                        <div className="mt-4 w-full max-w-xs mx-auto">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-md border-2 border-gray-300"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between gap-3 mt-6">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-50"
                                    >
                                        حفظ
                                    </button>
                                    <button
                                        onClick={() => handleToggelModal()}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-800 w-50"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


                {modalPassword && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">تغيير كلمة المرور</h2>
                            <form onSubmit={(e) => handleSubmitPassWord(e)} className="space-y-4">

                                {/* Old Password */}
                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium text-gray-600">كلمة المرور القديمة</label>
                                    <div className="relative">
                                        <input
                                            type={showOldPassword ? 'text' : 'password'}
                                            name="old_password"
                                            value={formData.old_password}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                            placeholder="ادخل كلمة المرور القديمة"
                                        />
                                        <span
                                            onClick={() => handlePasswordVisibilityToggle('old_password')}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                        >
                                            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium text-gray-600">كلمة المرور الجديدة</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            name="new_password"
                                            value={formData.new_password}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                            placeholder="ادخل كلمة المرور الجديدة"
                                        />
                                        <span
                                            onClick={() => handlePasswordVisibilityToggle('new_password')}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                        >
                                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                {/* Confirm New Password */}
                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium text-gray-600">تأكيد كلمة المرور الجديدة</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword2 ? 'text' : 'password'}
                                            name="new_password2"
                                            value={formData.new_password2}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                            placeholder="أعد إدخال كلمة المرور الجديدة"
                                        />
                                        <span
                                            onClick={() => handlePasswordVisibilityToggle('new_password2')}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                        >
                                            {showNewPassword2 ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-4 ">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition w-50"
                                    >
                                        تأكيد
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalPassword(false)}
                                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition w-50"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </SideBar>
    );
}
