import { useState, useEffect } from "react";
import { FaTimes, FaUserAlt, FaEnvelope, FaPhone, FaUserTag, FaCalendarAlt, FaBriefcase, FaBuilding } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import showUnauthorizedAlert from "@/components/NotAuthError";
import { Api_Uri } from "@/app/_api/api";

export default function EmployeeDetailsOrder({ id, onClose }) {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    useEffect(() => {
        if (!id || !token) return;

        const fetchEmployeeData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${Api_Uri}/auth/employees/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployee(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    showUnauthorizedAlert();
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "حدث خطأ ما، يرجى المحاولة مرة أخرى",
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        didOpen: () => {
                            const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                            if (progressBar) progressBar.style.background = "#d33";
                        },
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [id, token]);

    if (!id) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" dir="rtl">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {loading ? "جار التحميل..." : "تفاصيل الموظف"}
                    </h2>
                    <button onClick={onClose} className="text-white bg-red-500 p-1 rounded-full hover:bg-red-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500">جاري جلب بيانات الموظف...</div>
                ) : (
                    employee && (
                        <>
                            {/* Employee Details */}
                            <div className="space-y-3 text-right">
                                {/* Profile Picture */}
                                <div className="flex flex-col items-center mb-6">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                        {employee.user.profile_picture ? (
                                            <img
                                                src={employee.user.profile_picture}
                                                alt={`${employee.user.first_name} ${employee.user.last_name}`}
                                                className="w-full h-full rounded-full"
                                            />
                                        ) : (
                                            <FaUserAlt size={40} className="text-gray-500" />
                                        )}
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-gray-700">
                                        {employee.user.first_name} {employee.user.last_name}
                                    </h3>
                                    <p className="text-gray-500">{employee.user.role}</p>
                                </div>

                                {/* User Info */}
                                <div className="flex items-center justify-start">
                                    <FaEnvelope className="text-green-500 ml-3" />
                                    <span className="text-gray-700">{employee.user.email}</span>
                                </div>
                                <div className="flex items-center justify-start">
                                    <FaPhone className="text-yellow-500 ml-3" />
                                    <span className="text-gray-700">{employee.user.phone}</span>
                                </div>

                                {/* Country and Date of Birth */}
                                {employee.user.country && (
                                    <div className="flex items-center justify-start">
                                        <FaUserTag className="text-purple-500 ml-3" />
                                        <span className="text-gray-700">{employee.user.country}</span>
                                    </div>
                                )}
                                {employee.user.date_of_birth && (
                                    <div className="flex items-center justify-start">
                                        <FaCalendarAlt className="text-red-500 ml-3" />
                                        <span className="text-gray-700">
                                            {new Date(employee.user.date_of_birth).toLocaleDateString("ar-EG", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                )}

                                {/* Position and Company Info */}
                                <div className="flex items-center justify-start">
                                    <FaBriefcase className="text-blue-500 ml-3" />
                                    <span className="text-gray-700">{employee.position}</span>
                                </div>
                                <div className="flex items-center justify-start">
                                    <FaBuilding className="text-purple-500 ml-3" />
                                    <span className="text-gray-700">{employee.company_name}</span>
                                </div>
                            </div>
                        </>
                    )
                )}

                {/* Footer */}
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
}
