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

export default function Page() {

    const [allServices, setAllServices] = useState([]);
    const [iDServices, setIDServices] = useState("");
    const [service, setService] = useState([]);

    useEffect(() => {
        const search = new URLSearchParams(window.location.search);
        const id = search.get('id');
        if (id) {
            setIDServices(id);
        } else {
            setIDServices(null);
        }
    }, []);

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
                                <div className="bg-primary px-7 py-10 text-center mb-4" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="mx-auto w-full max-w-[215px]">
                                        <h3 className="mb-5 text-2xl font-bold text-white">دعونا نتحدث</h3>
                                        <p className="mb-1.5 text-white">(+550) 647 876 093</p>
                                        <p className="mb-9 text-white">support@company.com</p>
                                        <button className="flex h-12 w-full items-center justify-center rounded-full bg-white text-center font-medium color-text-dark">
                                            احصل على مكالمة
                                        </button>
                                    </div>
                                </div>
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
                                        <div className="relative mb-8 aspect-[34/20] rounded-sm bg-stone-100 w-100 h-[500px] overflow-hidden ml-auto">
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
        </>
    );
}
