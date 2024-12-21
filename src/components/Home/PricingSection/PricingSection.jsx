'use client';

import { Api_Uri } from "@/app/_api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function PricingSection() {

    const [pricingData, setPricingData] = useState([]);
    const [token, setToken] = useState(null);
    const [someOneLogedIn, setSomeOneLogedIn] = useState(false);
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [packeIDLooadedOrder, setPackeIDLooadedOrder] = useState(null);

    useEffect(() => {
        const getToken = localStorage.getItem("wasl-token");
        if (getToken) {
            axios.get(`${Api_Uri}/auth/get-user-data`, {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            })
                .then((response) => {
                    setUser(response.data);
                    setToken(getToken);
                    setSomeOneLogedIn(true);
                })
                .catch((error) => {
                    setUser({});
                    localStorage.removeItem("wasl-token");
                    setToken(null);
                    setSomeOneLogedIn(false);
                });
        }
    }, []);

    useEffect(() => {
        axios.get(`${Api_Uri}/packages`)
            .then((response) => {
                setPricingData(response.data);
            })
            .catch((error) => {
                setPricingData([]);
            });
    }, []);


    const handleOrderPackageLogged = (packageId) => {

        const dataSend = {
            package: packageId,
        }

        axios.post(`${Api_Uri}/packages/package-orders`, dataSend, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((response) => {
            Swal.fire({
                icon: "success",
                title: "تم طلب الباقة بنجاح",
                text: "تم طلب الباقة بنجاح، سيتم التواصل معكم في أقرب وقت ممكن",
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#4A6CF7";
                    }
                },
            });
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "حدث خطأ",
                text: "حدث خطأ أثناء طلب الباقة، يرجى المحاولة مرة أخرى في وقت لاحق أو التواصل مع الدعم الفني",
                showConfirmButton: true,
                showCancelButton: false,
                showCloseButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#F87171";
                    }
                },
            });
        })
    };

    const handleOrderPackageNotLogged = (packageId) => {
        setOpenModal(true);
        setPackeIDLooadedOrder(packageId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataSend = {
            "package": packeIDLooadedOrder,
            "name": name,
            "email": email,
            "phone": phone,
        }
        axios.post(`${Api_Uri}/packages/package-orders`, dataSend)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "تم طلب الباقة بنجاح",
                    text: "تم طلب الباقة بنجاح، سيتم التواصل معكم في أقرب وقت ممكن",
                    timer: 4000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: false,
                    showCloseButton: false,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#4A6CF7";
                        }
                    },
                });
                closeModal();
            }).catch((error) => {
                closeModal();
                if (error.response.data.phone) {
                    Swal.fire({
                        icon: "error",
                        title: "حدث خطأ فى رقم الهاتف",
                        text: error.response.data.phone[0],
                        showConfirmButton: true,
                        showCancelButton: false,
                        showCloseButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: () => {
                            const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                            if (progressBar) {
                                progressBar.style.background = "#F87171";
                            }
                        },
                    });
                    return;
                }
                Swal.fire({
                    icon: "error",
                    title: "حدث خطأ",
                    text: "حدث خطأ أثناء طلب الباقة، يرجى المحاولة مرة أخرى في وقت لاحق أو التواصل مع الدعم الفني",
                    showConfirmButton: true,
                    showCancelButton: false,
                    showCloseButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#F87171";
                        }
                    },
                });
            })

    };

    const closeModal = () => {
        setOpenModal(false);
        setPackeIDLooadedOrder(null);
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <>
            <section id="pricing" className="pt-[120px] pb-20 background-light relative" dir="rtl">
                <div className="container overflow-hidden">
                    <div className="flex flex-wrap mx-[-16px]">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[655px] text-center mb-20 wow fadeInUp" data-wow-delay=".1s"
                                style={{ visibility: "visible", animationDelay: "0.1s" }}>
                                <span className="text-lg font-semibold text-primary mb-2 block">
                                    أسعار تنافسية
                                </span>
                                <h2 className="text-black font-bold text-3xl sm:text-4xl md:text-[45px] mb-5">
                                    خطط الأسعار الخاصة بنا
                                </h2>
                                <p className="text-body-color text-base md:text-lg leading-relaxed max-w-[570px] mx-auto">
                                    تتوفر العديد من أشكال لوريم إيبسوم، لكن الغالبية قد خضعت لبعض التعديلات في الشكل أو الكلمات.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center mx-[-16px]">
                        {pricingData.map((plan, index) => (
                            <div
                                key={index}
                                className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4"
                                data-aos="fade-up"
                            >
                                <div className="bg-white shadow-pricing p-10 md:px-8 lg:py-10 lg:px-6 xl:p-10 text-center rounded-sm relative z-10 mb-10 
                                transition-transform transform hover:scale-105 hover:shadow-lg rounded border">
                                    <div className="flex justify-center items-end">
                                        <h2 className="font-bold text-black text-[42px] mb-2">
                                            {Number(plan.price).toFixed(2)}
                                            <span className="text-lg font-medium text-body-color"> / {plan.duration_in_days} </span>
                                        </h2>
                                    </div>
                                    <p className="text-base text-body-color leading-relaxed font-medium pb-9 mb-9 border-b border-[#E9ECF8]">
                                        لوريم إيبسوم هو نص تجريبي يستخدم في صناعة الطباعة والتصميم.
                                    </p>
                                    <div className="mb-8">
                                        {plan.benefits.map((feature, index) => (
                                            <p key={index} className="font-medium text-base text-body-color mb-3 flex items-center">
                                                <span className="mr-2 text-primary">✔️</span>
                                                <span className="text-body-color me-2">
                                                    {feature.name}
                                                </span>
                                            </p>
                                        ))}
                                    </div>
                                    {
                                        someOneLogedIn ? (
                                            <button
                                                className="flex items-center justify-center p-3 rounded-sm bg-primary text-semibold text-base text-white hover:shadow-signUp transition duration-300 ease-in-out w-100"
                                                onClick={() => handleOrderPackageLogged(plan.id)}
                                            >
                                                اشترِ الآن
                                            </button>
                                        ) : (
                                            <button
                                                className="flex items-center justify-center p-3 rounded-sm bg-primary text-semibold text-base text-white hover:shadow-signUp transition duration-300 ease-in-out w-100"
                                                onClick={() => handleOrderPackageNotLogged(plan.id)}
                                            >
                                                اشترِ الآن
                                            </button>
                                        )
                                    }
                                    {/* <button
                                        className="flex items-center justify-center p-3 rounded-sm bg-primary text-semibold text-base text-white hover:shadow-signUp transition duration-300 ease-in-out w-100"
                                        onClick={() => handleOrderPackage(plan.id)}
                                    >
                                        اشترِ الآن
                                    </button> */}
                                    <div className="absolute right-0 top-0 z-[-1]">
                                        {/* SVG shapes for background */}
                                        <svg width="37" height="154" viewBox="0 0 37 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.1" x="17.5237" y="78.0005" width="24.7822" height="24.7822" rx="4" transform="rotate(45 17.5237 78.0005)" fill="#4A6CF7"></rect>
                                            <rect opacity="0.3" x="47.585" y="92.9392" width="41.1567" height="45.1468" rx="5" transform="rotate(45 47.585 92.9392)" fill="#4A6CF7"></rect>
                                            <rect opacity="0.8" x="57.7432" y="-2.99951" width="78.8328" height="78.8328" rx="10" transform="rotate(45 57.7432 -2.99951)" fill="#4A6CF7"></rect>
                                        </svg>
                                    </div>
                                    <div className="absolute left-0 bottom-0 z-[-1]">
                                        {/* SVG shapes for background */}
                                        <svg width="229" height="182" viewBox="0 0 229 182" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.05" x="-0.639709" y="21.1696" width="46.669" height="45.7644" rx="10" transform="rotate(45 -0.639709 21.1696)" fill="url(#paint0_linear_25:114)"></rect>
                                            <rect opacity="0.05" x="40.1691" y="0.000488281" width="34.3355" height="33.67" rx="5" transform="rotate(45 40.1691 0.000488281)" fill="url(#paint1_linear_25:114)"></rect>
                                            <rect opacity="0.07" x="60.9458" y="42.1696" width="237" height="380.347" rx="22" transform="rotate(45 60.9458 42.1696)" fill="url(#paint2_linear_25:114)"></rect>
                                            <defs>
                                                <linearGradient id="paint0_linear_25:114" x1="29.5176" y1="14.0581" x2="14.35" y2="82.5021" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#4A6CF7"></stop>
                                                    <stop offset="0.822917" stopColor="#4A6CF7" stoppacity="0"></stop>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_25:114" x1="62.3565" y1="-5.23156" x2="51.1974" y2="45.1244" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#4A6CF7"></stop>
                                                    <stop offset="0.822917" stopColor="#4A6CF7" stoppacity="0"></stop>
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_25:114" x1="74.6106" y1="15.6017" x2="115.198" y2="62.4302" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#4A6CF7"></stop>
                                                    <stop offset="0.822917" stopColor="#4A6CF7" stoppacity="0"></stop>
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {
                openModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div dir="rtl" className="bg-white p-8 rounded-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-center color-text-light">
                                بما أنك لست فرد فى عائلتنا، يرجى تعبئة البيانات التالية
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">الاسم</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="أدخل الاسم"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="أدخل البريد الإلكتروني"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2">رقم الهاتف</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="أدخل رقم الهاتف"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="py-2 px-4 bg-gray-300 rounded-md w-1/2"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-500 text-white rounded-md w-1/2"
                                    >
                                        إرسال
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}
