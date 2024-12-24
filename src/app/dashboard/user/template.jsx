'use client';

import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { Api_Uri } from "@/app/_api/api";
import { FaSpinner, FaExclamationTriangle, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
    const router = useRouter();
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        setToken(getToken);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!token) return;

        axios
            .get(`${Api_Uri}/auth/get-user-data`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserData(response.data);
            })
            .catch(() => {
                setUserData({});
                Swal.fire({
                    icon: "error",
                    title: "يرجى تسجيل الدخول مرة أخرى",
                    text: "انتهت صلاحية جلستك.",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#ef4444";
                        }
                    },
                });
            });
    }, [token]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100" dir="rtl">
                <div className="flex items-center justify-center gap-4">
                    <FaSpinner className="text-blue-500 text-6xl animate-spin" />
                    <span className="text-xl font-semibold text-gray-600">جارٍ التحميل...</span>
                </div>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-red-100 to-red-200" dir="rtl">
                <FaLock className="text-red-500 text-7xl mb-6" />
                <h1 className="text-3xl font-extrabold text-gray-700 mb-3">غير مصرح</h1>
                <p className="text-lg text-gray-700 mb-6">يرجى تسجيل الدخول للوصول إلى هذه الصفحة.</p>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    onClick={() => router.push("/auth/signin")}
                >
                    تسجيل الدخول
                </button>
            </div>
        );
    }

    if (userData.role != "User") {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-yellow-50 to-yellow-200" dir="rtl">
                <FaExclamationTriangle className="text-yellow-500 text-7xl mb-6" />
                <h1 className="text-3xl font-extrabold text-gray-700 mb-3">تم رفض الوصول</h1>
                <p className="text-lg text-gray-500 mb-6">ليس لديك الصلاحية اللازمة للوصول إلى هذه الصفحة.</p>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    onClick={() => router.push("/auth/signin")}
                >
                    تسجيل الدخول
                </button>
            </div>
        );
    }

    return <>{children}</>;
}
