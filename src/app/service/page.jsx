'use client';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { FaLaptopCode, FaPaintBrush, FaMobileAlt } from 'react-icons/fa'; // Import icons
import Shap from "@/image/home/sale-shape.svg";
import Image from 'next/image';
import ShapTwo from "@/image/home/testimonial-shape.svg";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Api_Uri } from '../_api/api';
import { FaUserCircle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import Swal from 'sweetalert2';

export default function Page() {

    const [allServices, setAllServices] = useState([]);
    const [iDServices, setIDServices] = useState("");
    const [service, setService] = useState([]);
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [aboutInfo, setAboutInfo] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    useEffect(() => {
        const search = new URLSearchParams(window.location.search);
        const id = search.get('id');
        if (id) {
            setIDServices(id);
        } else {
            setIDServices(null);
        }

        const getToken = localStorage.getItem("wasl-token");
        if (getToken) {
            setToken(getToken);
        }

        axios.get(`${Api_Uri}/about-us/info`)
            .then(res => setAboutInfo(res.data[0]))
            .catch(err => setAboutInfo({}));

    }, []);

    // If Token Changed Fetch User Data
    useEffect(() => {
        if (!token) return;
        axios.get(`${Api_Uri}/auth/get-user-data`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                setUserData(null);
                localStorage.removeItem("wasl-token");
                setToken(null);
            });
    }, [token]);

    useEffect(() => {
        axios.get(`${Api_Uri}/services/all/name-id`)
            .then(res => setAllServices(res.data))
            .catch(err => setAllServices([]))
    }, []);

    useEffect(() => {
        if (iDServices == null && allServices.length > 0) {
            setIDServices(allServices[0].id);
        }
    }, [iDServices, allServices]);

    useEffect(() => {

        if (iDServices) {
            axios.get(`${Api_Uri}/services/page/${iDServices}`)
                .then((res) => {
                    const response = [res.data];
                    setService(response);
                })
                .catch((err) => {
                    setService([]);
                })
        }

    }, [iDServices]);


    const handleOrderService = (id) => {

        if (!token || !userData) {
            openModal();
            return;
        }

        if (userData.role != "User") {
            Swal.fire({
                icon: "error",
                title: "لا يمكنك طلب الخدمة",
                text: "يجب عليك تسجيل الدخول بحساب مستخدم لطلب ال خدمة",
                timer: 2000,
                showConfirmButton: false,
                showCancelButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#EF4444";
                    }
                },
            });
            return;
        }

        // console.log("User Data: ", userData.id);
        // console.log("Token: ", token);
        // console.log("Service ID: ", id);

        axios.post(`${Api_Uri}/services/orders/create`,
            {
                "user": userData.id,
                "service": id
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "تم طلب الخدمة بنجاح",
                    text: "ستم توجيهك لصفحة الطلبات لمتابعة حالة الطلب",
                    timer: 4000,
                    showConfirmButton: false,
                    showCancelButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    },
                    willClose: () => {
                        window.location.href = "/dashboard/user";
                    }
                });
            }).catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "حدث خطأ أثناء طلب الخدمة",
                    text: "يرجى المحاولة مرة أخرى لاحقًا واذا استمرت المشكلة يرجى التواصل معنا",
                    timer: 5000,
                    showConfirmButton: false,
                    showCancelButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    },
                });
            });
    }

    return (
        <>
            <Navbar />
            <section className="relative z-10 overflow-hidden bg-white pb-[50px] pt-[150px]" dir="rtl">
                <div className="container">
                    <div className="mx-[-16px] flex flex-wrap items-center">
                        <div className="w-full px-4 md:w-8/12 lg:w-7/12" data-aos="fade-right" data-aos-duration="1000">
                            <div className="mb-12 max-w-[570px]">
                                <h1 className="mb-5 text-2xl font-bold color-text-dark sm:text-3xl">تفاصيل الخدمة</h1>
                                <p className="text-base font-medium leading-relaxed color-text-light">
                                    نقدم لك مجموعة متنوعة من الحلول والخدمات التي تهدف إلى تحسين تجربة عملائك.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-4/12 lg:w-5/12" data-aos="fade-left" data-aos-duration="1000">
                            <div className="text-end">
                                <ul className="flex items-center md:justify-end">
                                    <li className="flex items-center">
                                        <a className="pr-1 text-base font-medium color-text-light hover:text-primary" href="/">الصفحة الرئيسية</a>
                                        <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                                    </li>
                                    <li className="text-base font-medium text-primary">تفاصيل الخدمة</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SVG Shapes */}
                <span className="absolute right-0 top-0 z-[-1]">
                    {/* SVG content here */}
                </span>
                <span className="absolute bottom-0 left-0 z-[-1]">
                    {/* SVG content here */}
                </span>
            </section>

            <section className="pb-20 pt-[90px] overflow-hidden background-light" dir="rtl">
                <div className="container">
                    <div className="-mx-5 flex flex-wrap">
                        <div className="w-full px-5 lg:w-4/12 position-relative">
                            <div className="space-y-10">
                                <div data-aos="fade-up" data-aos-duration="1000">
                                    <h3 className="mb-[22px] text-[34px] font-bold color-text-dark">الخدمات</h3>
                                    <div className="border-stroke rounded-sm border max-h-[300px] overflow-y-auto scrollbar-custom">
                                        {allServices.map((service, index) => (
                                            <a
                                                key={index}
                                                href={`/service?id=${service.id}`}
                                                className="border-stroke flex w-full items-center gap-3 border-b px-5 py-4 text-lg font-medium duration-200 last-of-type:border-0 color-text-dark hover:text-primary"
                                            >
                                                <i className={`text-primary ${service.icon_service}`} />
                                                {service.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                {
                                    aboutInfo?.phone_number && aboutInfo?.email &&
                                    <div className="bg-primary px-7 py-10 text-center mb-4" data-aos="zoom-in" data-aos-duration="1000">
                                        <div className="mx-auto w-full max-w-[215px]">
                                            <h3 className="mb-5 text-2xl font-bold text-white">دعونا نتحدث</h3>
                                            <p className="mb-1.5 text-white">
                                                <a href={`tel:${aboutInfo?.phone_number}`} className="hover:underline">{aboutInfo?.phone_number}</a>
                                            </p>
                                            <p className="mb-9 text-white">
                                                <a href={`mailto:${aboutInfo?.email}`} className="hover:underline">{aboutInfo?.email}</a>
                                            </p>
                                            <button className="flex h-12 w-full items-center justify-center rounded-full bg-white text-center font-medium color-text-dark">
                                                احصل على مكالمة
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="w-full px-5 lg:w-8/12 position-relative">
                            <div className="absolute -bottom-40 left-0 h-100 opacity-30">
                                <Image alt="shape" loading="lazy" width="435" height="959" decoding="async" src={Shap} />
                            </div>
                            {
                                service.map((service, index) => (
                                    <div data-aos="fade-up" data-aos-duration="1000"
                                        key={index}
                                    >
                                        <div className="relative mb-8 aspect-[34/20] rounded-sm w-100 overflow-hidden ml-auto sm:h-auto md:h-[500px] lg:h-[500px]">
                                            <img
                                                alt="image"
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full object-cover object-center"
                                                sizes="100vw"
                                                src={service.image_service}
                                            />
                                        </div>

                                        <h1 className="mb-7 text-2xl font-bold color-text-dark sm:text-4xl lg:text-3xl">
                                            {service.name}
                                        </h1>
                                        <p className="mb-8 text-base color-text-light sm:text-lg lg:text-base xl:text-lg">
                                            {service.description}
                                        </p>
                                        {
                                            service.benifits_service.map((benifit, index) => (
                                                <ul
                                                    key={index}
                                                    className="list-none mb-7 bg-white bg-opacity-80 p-3 rounded relative"
                                                    data-aos="fade-up"
                                                >
                                                    <div className="absolute left-0 top-0 h-full w-auto transform -rotate-180">
                                                        <Image
                                                            alt="shape"
                                                            loading="lazy"
                                                            width={254} // Or adjust as needed
                                                            height={0} // Ensure auto-resizing
                                                            decoding="async"
                                                            data-nimg="1"
                                                            src={ShapTwo}
                                                            className="h-full w-auto object-cover" // Ensures the image covers the parent height
                                                            style={{ color: 'transparent' }}
                                                        />
                                                    </div>
                                                    <h4 className="mb-8 text-xl font-bold color-text-dark text-indigo sm:text-2xl lg:text-xl xl:text-2xl">
                                                        <span className="text-primary ms-2 me-0">{index + 1}.</span>
                                                        <span>{benifit.title}</span>
                                                    </h4>
                                                    {benifit.names.map((detail, index) => (
                                                        <li
                                                            key={index}
                                                            className="mb-3 text-base sm:text-lg lg:text-base xl:text-lg flex items-center gap-3"
                                                        >
                                                            <span
                                                                className={`flex-shrink-0 w-3 h-3 rounded-sm ${index % 2 === 0 ? 'bg-blue-400' : 'bg-indigo-800'
                                                                    }`}
                                                            ></span>
                                                            <span className="color-text-light">{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ))
                                        }

                                        {/* Order Now Service Button */}
                                        <div className="flex items-start justify-start w-full"
                                            data-aos="fade-up" data-aos-duration="1000"
                                        >
                                            <button
                                                onClick={() => handleOrderService(service.id)}
                                                className="flex items-center justify-center h-14 px-10 rounded bg-gradient-to-r from-blue-600 to-indigo-800 text-center font-semibold text-white shadow-lg hover:shadow-2xl transition-transform transform duration-300 ease-in-out hover:scale-105 w-full max-w-[300px] sm:w-full md:w-[250px] lg:w-[250px]">
                                                اطلب الخدمة
                                            </button>
                                        </div>


                                        {/* <ul className="list mb-7 list-inside list-disc bg-white bg-opacity-80 p-3 rounded relative"
                                            data-aos="fade-up"
                                        >
                                            <div className="absolute left-0 top-0 transform -rotate-180">
                                                <Image
                                                    alt="shape"
                                                    loading="lazy"
                                                    width="254"
                                                    height="182"
                                                    decoding="async"
                                                    data-nimg="1"
                                                    src={ShapTwo}
                                                    style={{ color: 'transparent' }}
                                                />
                                            </div>
                                            <h4 className="mb-8 text-xl font-bold color-text-dark sm:text-2xl lg:text-xl xl:text-2xl">
                                                <span className="text-primary">02.</span> تصميم الهوية البصرية
                                            </h4>
                                            <li className="mb-3 text-base sm:text-lg lg:text-base xl:text-lg">
                                                <span className="color-text-light"> تصميم الشعارات والهوية التجارية المميزة. </span>
                                            </li>
                                            <li className="mb-3 text-base sm:text-lg lg:text-base xl:text-lg">
                                                <span className="color-text-light"> توفير حلول مبتكرة في مجال التصميم.</span>
                                            </li>
                                        </ul> */}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" dir="rtl"
                >
                    <div className="relative w-[90%] max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden"
                        data-aos="zoom-in" data-aos-duration="1000"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
                            <h2 className="text-md font-bold text-white">تسجيل الدخول</h2>
                            <button
                                onClick={closeModal}
                                className="text-white hover:text-gray-200 transition duration-300 bg-red-500 rounded w-8 h-8 flex items-center justify-center hover:bg-red-600"
                            >
                                <i className='bi bi-x-lg'></i>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-4 py-6 text-right space-y-4">
                            {/* Larger Message Box */}
                            <div className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded-md shadow-sm">
                                <p className="text-lg text-blue-800 leading-relaxed font-semibold">
                                    مرحبًا! يرجى تسجيل الدخول لطلب الخدمة. إذا لم يكن لديك حساب، يمكنك إنشاء حساب جديد بسهولة.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <button
                                    onClick={() => {
                                        /* Handle login */
                                        window.location.href = '/auth/signin';
                                    }}
                                    className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                                >
                                    <MdLogin className="w-5 h-5 ml-2" />
                                    تسجيل الدخول
                                </button>
                                <button
                                    onClick={() => {
                                        /* Handle create account */
                                        window.location.href = '/auth/signup';
                                    }}
                                    className="flex items-center justify-center w-full px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 transition duration-300"
                                >
                                    <FaUserCircle className="w-5 h-5 ml-2" />
                                    إنشاء حساب
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
