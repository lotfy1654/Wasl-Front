'use client';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import ShapOne from "@/image/home/hero-shape-1.svg";
import ShapTwo from "@/image/home/hero-shape-2.svg";
import Image from 'next/image';
import { useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import icons from react-icons


export default function Page() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsPasswordValid(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(newPassword)); // Regex for validation
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    return (
        <>
            <Navbar />
            <section dir="rtl" className="relative z-10 pt-[180px] mb-5 overflow-hidden" data-aos="fade-up">
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
                    data-aos="zoom-in"
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
                    data-aos="zoom-in"
                />
                <div className="container max-w-[800px]"> {/* Enlarged container */}
                    <div className="mx-[-16px] flex flex-wrap">
                        <div className="w-full px-4">
                            <div data-aos="fade-up" style={{ opacity: 1, transform: 'none' }}>
                                <div className="wow fadeInUp mx-auto max-w-[700px] rounded-md border border-[#f5f5f5] bg-white p-4 md:p-12 lg:p-12 dark:border-0 dark:bg-dark sm:p-[60px]">
                                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                        إنشاء حساب جديد
                                    </h3>
                                    <p className="mb-11 text-center text-base font-medium text-body-color">
                                        أنشئ حسابك للاستمتاع بتجربة مميزة.
                                    </p>
                                    <form>
                                        <div className="mb-8 grid grid-cols-2 gap-4" data-aos="fade-right">
                                            {/* First Name */}
                                            <div>
                                                <label htmlFor="firstName" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    الاسم الأول
                                                </label>
                                                <input
                                                    placeholder="أدخل اسمك الأول"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-body-color border-opacity-50 bg-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="text"
                                                    name="firstName"
                                                />
                                            </div>
                                            {/* Last Name */}
                                            <div>
                                                <label htmlFor="lastName" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    اسم العائلة
                                                </label>
                                                <input
                                                    placeholder="أدخل اسم العائلة"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-body-color border-opacity-50 bg-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="text"
                                                    name="lastName"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-8 grid grid-cols-2 gap-4" data-aos="fade-left">
                                            {/* Age */}
                                            <div>
                                                <label htmlFor="age" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    العمر
                                                </label>
                                                <input
                                                    placeholder="أدخل عمرك"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-body-color border-opacity-50 bg-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="number"
                                                    name="age"
                                                />
                                            </div>
                                            {/* Country */}
                                            <div>
                                                <label htmlFor="country" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    الدولة
                                                </label>
                                                <select
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-body-color border-opacity-50 bg-transparent px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    name="country"
                                                >
                                                    <option value="">اختر دولتك</option>
                                                    <option value="OM">عمان</option>
                                                    <option value="EG">مصر</option>
                                                    <option value="SA">السعودية</option>
                                                    <option value="AE">الإمارات</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Other inputs and button remain unchanged */}
                                        <div className="mb-8" data-aos="fade-left">
                                            <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                بريدك الإلكتروني
                                            </label>
                                            <input
                                                placeholder="أدخل بريدك الإلكتروني"
                                                required
                                                className="shadow-one dark:shadow-signUp w-full rounded-2 border border-body-color border-opacity-50 bg-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                type="email"
                                                name="email"
                                            />
                                        </div>
                                        <div className="mb-8" data-aos="fade-right">
                                            <label htmlFor="phone" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                رقم الهاتف
                                            </label>
                                            <input
                                                placeholder="أدخل رقم هاتفك"
                                                required
                                                className="shadow-one dark:shadow-signUp w-full rounded-2 border border-body-color border-opacity-50 bg-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                type="tel"
                                                name="phone"
                                            />
                                        </div>
                                        <div className='grid grid-cols-2 gap-4' data-aos="fade-left">
                                            <div className="mb-8 relative" data-aos="fade-left">
                                                <label htmlFor="password" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    كلمة المرور
                                                </label>
                                                <div className="relative flex items-center">
                                                    <button
                                                        type="button"
                                                        className="absolute left-4 text-xl text-body-color"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                    </button>
                                                    <input
                                                        placeholder="أدخل كلمة المرور"
                                                        required
                                                        className="shadow-one dark:shadow-signUp w-full pl-12 pr-4 rounded-2 border border-body-color border-opacity-50 bg-transparent py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                    />
                                                </div>
                                                {!isPasswordValid && password && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، ورقم.
                                                    </p>
                                                )}
                                                {isPasswordValid && (
                                                    <p className="mt-2 text-sm text-green-600">
                                                        ✅ كلمة المرور صالحة.
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-8 relative" data-aos="fade-right">
                                                <label htmlFor="confirmPassword" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    تأكيد كلمة المرور
                                                </label>
                                                <div className="relative flex items-center">
                                                    <button
                                                        type="button"
                                                        className="absolute left-4 text-xl text-body-color"
                                                        onClick={toggleConfirmPasswordVisibility}
                                                    >
                                                        {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                    </button>
                                                    <input
                                                        placeholder="أعد إدخال كلمة المرور"
                                                        required
                                                        className="shadow-one dark:shadow-signUp w-full pl-12 pr-4 rounded-2 border border-body-color border-opacity-50 bg-transparent py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        name="confirmPassword"
                                                        value={confirmPassword}
                                                        onChange={handleConfirmPasswordChange}
                                                    />
                                                </div>
                                                {confirmPassword && password && confirmPassword !== password && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        كلمتا المرور غير متطابقتين.
                                                    </p>
                                                )}
                                                {confirmPassword && password && confirmPassword === password && (
                                                    <p className="mt-2 text-sm text-green-600">
                                                        ✅ كلمتا المرور متطابقتان.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div class="mb-8 flex items-center">
                                            <label for="checkboxLabel" class="flex cursor-pointer select-none text-sm font-medium text-body-color-2 dark:text-body-color">
                                                <div class="relative flex items-center">
                                                    <input id="checkboxLabel" type="checkbox" name="checkboxLabel"
                                                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                                </div>
                                                <span class="text-primary me-3">
                                                    <span class="rtl:text-right ltr:text-left text-muted">
                                                        بإنشاء حساب يعني أنك توافق على
                                                        {" "}
                                                        <a target="_blank" rel="noopener noreferrer" class="text-primary hover:underline" href="/terms">الشروط والأحكام</a>
                                                        {" "}
                                                        و
                                                        {" "}
                                                        <a target="_blank" rel="noopener noreferrer" class="text-primary hover:underline" href="/terms">سياسة الخصوصية</a>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>

                                        <div data-aos="fade-up">
                                            <button
                                                aria-label="signup with details"
                                                className="hover:shadow-signUp flex w-full items-center justify-center rounded-2 bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80"
                                            >
                                                تسجيل
                                            </button>
                                        </div>
                                    </form>

                                    <p className="mt-4 fs-6 text-center text-sm font-medium text-body-color">
                                        لديك حساب بالفعل؟
                                        <a href="/auth/signin" className="text-primary hover:underline pe-2">
                                            سجل الدخول
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
