'use client';

import Image from "next/image";
import React, { useState } from "react";
import Shap from "@/image/home/shape-3.svg";
import shapNews from "@/image/home/newsletter-shape.svg";
import "./style.scss"

export default function ContactSection() {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        message: "",
    });

    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNewsletterChange = (e) => {
        setNewsletterEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        setLoading(true); // Start loading

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage("Your message has been sent successfully!");
                setFormData({
                    fname: "",
                    lname: "",
                    phone: "",
                    email: "",
                    message: "",
                });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            setErrorMessage("There was an error sending your message. Please try again later.");
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        // Add your newsletter subscription logic here
    };

    return (
        <section id="contact" className="contact-section position-relative" dir="rtl">
            <div
                data-aos="fade-up"
                className="absolute -top-0 right-0 -z-10 opacity-75"
            >
                <Image alt="shape" loading="lazy" width="311" height="768" decoding="async" src={Shap} />
            </div>
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    aria-hidden="true"
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                >
                    <defs>
                        <pattern
                            x="50%"
                            y={-1}
                            id="pattern"
                            width={200}
                            height={200}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect fill="url(#pattern)" width="100%" height="100%" strokeWidth={0} />
                </svg>
            </div>
            <div className="container-md p-3">
                <div
                    data-aos="fade-down"
                    className="background-light-less mt-5 rounded-3 border p-3"
                >
                    <div className="flex flex-wrap mx-[-16px] mt-3">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[570px] text-center mb-[100px]">
                                <span className="text-lg font-semibold text-primary mb-2 block">
                                    هل تحتاج إلى مساعدة؟
                                </span>
                                <h2 className="text-black font-bold text-3xl sm:text-4xl md:text-[45px] mb-4">
                                    تواصل معنا
                                </h2>
                                <p className="text-body-color text-base md:text-lg leading-relaxed">
                                    هناك العديد من الطرق للتواصل معنا، ونحن هنا لمساعدتك ودعمك في جميع
                                    استفساراتك.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        data-aos="fade-up"
                        className="box-all-form flex flex-wrap justify-center mx-[-16px]"
                    >
                        <div className="w-full lg:w-10/12 xl:w-8/12 px-4">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-wrap mx-[-16px]">
                                    {/* حقول النموذج */}
                                    <div className="w-full md:w-1/2 px-4 mb-8">
                                        <label htmlFor="fname" className="block text-sm font-medium text-body-color mb-3">
                                            الاسم الأول <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fname"
                                            placeholder="أدخل اسمك الأول"
                                            className="w-full border border-[#DEE3F7] rounded-sm py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-primary transition"
                                            value={formData.fname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-4 mb-8">
                                        <label htmlFor="lname" className="block text-sm font-medium text-body-color mb-3">
                                            الاسم الأخير <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lname"
                                            placeholder="أدخل اسمك الأخير"
                                            className="w-full border border-[#DEE3F7] rounded-sm py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-primary transition"
                                            value={formData.lname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-4 mb-8">
                                        <label htmlFor="phone" className="block text-sm font-medium text-body-color mb-3">
                                            رقم الهاتف <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="أدخل رقم هاتفك"
                                            className="w-full border border-[#DEE3F7] rounded-sm py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-primary transition"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-4 mb-8">
                                        <label htmlFor="email" className="block text-sm font-medium text-body-color mb-3">
                                            بريدك الإلكتروني <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="أدخل بريدك الإلكتروني"
                                            className="w-full border border-[#DEE3F7] rounded-sm py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-primary transition"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="w-full px-4 mb-8">
                                        <label htmlFor="message" className="block text-sm font-medium text-body-color mb-3">
                                            رسالتك <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            rows="5"
                                            placeholder="أدخل رسالتك"
                                            className="w-full border border-[#DEE3F7] rounded-sm py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-primary transition resize-none"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="w-full mx-auto text-center px-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="text-base font-medium text-white bg-primary py-4 px-11 hover:shadow-signUp rounded-sm inline-flex mx-auto transition duration-300 ease-in-out rounded"
                                        >
                                            {loading ? "جارٍ الإرسال..." : "إرسال الرسالة"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <section
                data-aos="zoom-in"
                id="section-info"
                className="section-info mt-1 position-relative"
            >
                <div className="container-md">
                    <div className="rounded-3 border p-5 relative background-dark">
                        <div class="absolute right-0 top-0">
                            <Image alt="shape" loading="lazy" width="501" height="220" decoding="async" src={shapNews} />
                        </div>
                        <h3 className="text-center mb-6 text-white fs-3">تواصل معنا لمزيد من الدعم</h3>
                        <p className="text-center text-lg text-body-color mb-4 text-white">
                            "نحن هنا لمساعدتك في كل خطوة نحو نجاح مشروعك..."
                        </p>
                        <div className="flex justify-center">
                            <button type="button" className="bg-primary text-white px-4 py-3 rounded">
                                اكتشف المزيد
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

