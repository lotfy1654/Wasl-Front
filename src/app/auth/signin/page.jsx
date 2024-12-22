'use client';
import { Api_Uri } from '@/app/_api/api';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import ShapOne from "@/image/home/hero-shape-1.svg";
import ShapTwo from "@/image/home/hero-shape-2.svg";
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
    const [userNameOrEmail, setUserNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [someOneLogged, setSomeOneLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("wasl-token");
        if (token) {
            axios.get(`${Api_Uri}/auth/get-user-data`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUser(response.data);
                    setToken(token);
                    setSomeOneLogged(true);
                })
                .catch((error) => {
                    setUser({});
                    localStorage.removeItem("wasl-token");
                    setToken(null);
                    setSomeOneLogged(false);
                });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataLogin = {
            username: userNameOrEmail,
            password: password
        };
        axios.post(`${Api_Uri}/auth/login`, dataLogin)
            .then((response) => {
                const res = response.data;
                localStorage.setItem("wasl-token", res.access);
                Swal.fire({
                    icon: 'success',
                    title: 'تم تسجيل الدخول بنجاح',
                    confirmButtonText: 'حسناً',
                    timer: 1200,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: false,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#0d6efd";
                        }
                    },
                    willClose: () => {
                        if (res.role == "Admin") {
                            window.location.href = "/dashboard/admin/home";
                        } else if (res.role == "User") {
                            window.location.href = "/dashboard/user";
                        } else if (res.role == "Manager") {
                            window.location.href = "/dashboard/manager";
                        } else {
                            window.location.href = "/";
                        }
                    }
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
                    confirmButtonText: 'حسناً',
                    showCancelButton: false,
                });
            });
    };

    return (
        <>
            <Navbar />
            <section dir="rtl" className="relative z-10 pt-[100px] mb-5 overflow-hidden">
                <div className="background-blue"></div>
                <Image
                    alt="shape"
                    loading="lazy"
                    width="411"
                    height="276"
                    decoding="async"
                    className="absolute left-0 top-0 -z-10"
                    src={ShapOne}
                    style={{ color: "transparent" }}
                />
                <Image
                    alt="shape"
                    loading="lazy"
                    width="820"
                    height="692"
                    decoding="async"
                    className="absolute right-0 top-0 -z-10"
                    src={ShapTwo}
                    style={{ color: "transparent" }}
                />
                <div className="container">
                    {
                        someOneLogged
                            ? (
                                <div className="user-info bg-white border border-gray-200 rounded-lg p-6 max-w-xl mx-auto shadow-lg mb-2">
                                    <h3 className="text-center text-2xl font-bold mb-4 text-blue-600">مرحباً {user.first_name} {user.last_name}</h3>

                                    <div className="flex justify-center mb-6">
                                        <img
                                            src={user.profile_picture || "https://placehold.it/80x80"}
                                            alt="Profile Picture"
                                            width={100}
                                            height={100}
                                            className="rounded-full border-4 border-blue-500 shadow-lg"
                                        />
                                    </div>

                                    <div className="text-center mb-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="alert alert-info p-4 mb-2 bg-blue-100 border border-blue-300 rounded-lg">
                                                <p className="font-semibold text-blue-800">البريد الإلكتروني:</p>
                                                <p className="text-blue-700">{user.email}</p>
                                            </div>
                                            <div className="alert alert-info p-4 mb-2 bg-blue-100 border border-blue-300 rounded-lg">
                                                <p className="font-semibold text-blue-800">اسم المستخدم:</p>
                                                <p className="text-blue-700">{user.username}</p>
                                            </div>
                                            <div className="alert alert-warning p-4 mb-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                                                <p className="font-semibold text-yellow-800">رقم الهاتف:</p>
                                                <p className="text-yellow-700">{user.phone}</p>
                                            </div>
                                            <div className="alert alert-warning p-4 mb-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                                                <p className="font-semibold text-yellow-800">الوظيفة:</p>
                                                <p className="text-yellow-700">{user.role}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons for Logout and Dashboard */}
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button
                                            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 w-50"
                                            onClick={() => {
                                                localStorage.removeItem("wasl-token");
                                                setToken(null);
                                                setSomeOneLogged(false);
                                                window.location.reload();
                                            }}
                                        >
                                            تسجيل الخروج
                                        </button>
                                        <button
                                            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-50"
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
                                            الذهاب إلى لوحة التحكم
                                        </button>
                                    </div>
                                </div>
                            )
                            : (
                                <div className="mx-[-16px] flex flex-wrap" data-aos="fade-up">
                                    <div className="w-full px-4">
                                        <div>
                                            <div className="wow fadeInUp mx-auto max-w-[500px] rounded-md border border-[#f5f5f5] bg-white p-4 md:p-12 lg:p-12 dark:border-0 dark:bg-dark sm:p-[60px]">
                                                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                                    تسجيل الدخول إلى حسابك
                                                </h3>
                                                <p className="mb-11 text-center text-base font-medium text-body-color">
                                                    سجل دخولك إلى حسابك للحصول على تجربة أسرع عند الدفع.
                                                </p>
                                                <form onSubmit={(e) => handleSubmit(e)}>
                                                    <div className="mb-8" data-aos="fade-up">
                                                        <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                            بريدك الإلكتروني أو اسم المستخدم
                                                        </label>
                                                        <input
                                                            placeholder="أدخل بريدك الإلكتروني أو اسم المستخدم"
                                                            required
                                                            className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-opacity-30 dark:bg-[#1F2656]"
                                                            type="text"
                                                            name="email"
                                                            data-aos="fade-up"
                                                            value={userNameOrEmail}
                                                            onChange={(e) => setUserNameOrEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mb-8" data-aos="fade-up">
                                                        <label htmlFor="password" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                            كلمة المرور
                                                        </label>
                                                        <input
                                                            placeholder="أدخل كلمة المرور"
                                                            required
                                                            className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-opacity-30 dark:bg-[#1F2656]"
                                                            type="password"
                                                            name="password"
                                                            data-aos="fade-up"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                    <div data-aos="fade-up">
                                                        <button
                                                            aria-label="login with email and password"
                                                            className="hover:shadow-signUp flex w-full items-center justify-center rounded-2 bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80"
                                                        >
                                                            تسجيل الدخول
                                                        </button>
                                                    </div>
                                                </form>
                                                <p className="mt-4 fs-6 text-center text-sm font-medium text-body-color">
                                                    ليس لديك حساب؟
                                                    <a href="/auth/signup" className="text-primary hover:underline pe-2">
                                                        سجل الآن
                                                    </a>
                                                </p>
                                                {/* <div className="text-center mt-4">
                                                    <a
                                                        className="text-primary text-sm font-medium hover:underline"
                                                        href="/auth/forgot-password"
                                                    >
                                                        هل نسيت كلمة المرور؟
                                                    </a>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </section>
            <Footer />
        </>
    );
}
