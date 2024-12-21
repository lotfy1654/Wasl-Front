'use client';
import { Api_Uri } from '@/app/_api/api';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import ShapOne from "@/image/home/hero-shape-1.svg";
import ShapTwo from "@/image/home/hero-shape-2.svg";
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import icons from react-icons
import Swal from 'sweetalert2';


export default function Page() {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setShowAlert(true); // Show alert when an image is selected
        setTimeout(() => setShowAlert(false), 5000); // Hide alert after 3 seconds
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (imageFile == null) {
            Swal.fire({
                icon: 'error',
                text: 'يرجى تحميل صورة الملف الشخصي',
                confirmButtonColor: '#4D6588',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#4D6588";
                    }
                }
            });
            return;
        }
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('password', password);
        formData.append('password2', confirmPassword);
        formData.append('email', email);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('phone', phone);
        formData.append('profile_picture', imageFile);
        formData.append('country', country);
        formData.append('date_of_birth', age);
        axios.post(`${Api_Uri}/auth/register`, formData)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'تم التسجيل بنجاح',
                    text: 'سيتم تحويلك لصفحة تسجيل الدخول',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#4D6588";
                        }
                    },
                    willClose: () => {
                        window.location.href = '/auth/signin';
                    }
                });
            })
            .catch(err => {
                const errorResponse = err.response?.data;

                // Default error message
                let errorMessage = 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.';

                if (errorResponse) {
                    // Prepare error message with field names (keys)
                    errorMessage = Object.entries(errorResponse)
                        .map(([key, value]) => {
                            // Create the error message string for each field
                            return `${key}: ${value.join(', ')}`;
                        })
                        .join('\n'); // Join all errors with newline
                }

                // Display the error message in Swal
                Swal.fire({
                    icon: 'error',
                    title: 'فشل التسجيل',
                    text: errorMessage,
                    confirmButtonColor: '#4D6588',
                    confirmButtonText: 'حسنا',
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#4D6588";
                        }
                    }
                });
            });
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
                <div className="container max-w-[900px]"> {/* Enlarged container */}
                    <div className="mx-[-16px] flex flex-wrap">
                        <div className="w-full px-4">
                            <div data-aos="fade-up" style={{ opacity: 1, transform: 'none' }}>
                                <div className="wow fadeInUp mx-auto max-w-[900px] rounded-md border border-[#f5f5f5] bg-white p-4 md:p-12 lg:p-12 dark:border-0 dark:bg-dark sm:p-[60px]">
                                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                        إنشاء حساب جديد
                                    </h3>
                                    <p className="mb-11 text-center text-base font-medium text-body-color">
                                        أنشئ حسابك للاستمتاع بتجربة مميزة.
                                    </p>
                                    <form
                                        onSubmit={(e) => handleSubmit(e)}
                                    >
                                        <div className="mb-8 grid lg:grid-cols-2 gap-4 sm:grid-cols-1" data-aos="fade-right">
                                            {/* First Name */}
                                            <div>
                                                <label htmlFor="firstName" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    الاسم الأول
                                                </label>
                                                <input
                                                    placeholder="أدخل اسمك الأول"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="text"
                                                    name="firstName"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
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
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="text"
                                                    name="lastName"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-8 grid lg:grid-cols-2 gap-4 sm:grid-cols-1" data-aos="fade-left">
                                            {/* Age */}
                                            <div>
                                                <label htmlFor="age" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    تاريخ الميلاد
                                                </label>
                                                <input
                                                    placeholder="أدخل تاريخ ميلادك"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="date"
                                                    name="age"
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                />
                                            </div>
                                            {/* Country */}
                                            <div>
                                                <label htmlFor="country" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    الدولة
                                                </label>
                                                <input
                                                    placeholder="أدخل دولتك"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="text"
                                                    name="country"
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                />
                                                {/* <select
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    name="country"
                                                >
                                                    <option value="">اختر دولتك</option>
                                                    <option value="OM">عمان</option>
                                                    <option value="EG">مصر</option>
                                                    <option value="SA">السعودية</option>
                                                    <option value="AE">الإمارات</option>
                                                </select> */}
                                            </div>
                                        </div>
                                        <div className="mb-8 grid lg:grid-cols-2 gap-4 sm:grid-cols-1" data-aos="fade-left">
                                            <div className="mb-8" data-aos="fade-left">
                                                <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    بريدك الإلكتروني
                                                </label>
                                                <input
                                                    placeholder="أدخل بريدك الإلكتروني"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-8" data-aos="fade-left">
                                                <label htmlFor="userName" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    اسم المستخدم
                                                </label>
                                                <input
                                                    placeholder="أدخل اسم المستخدم"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="text"
                                                    name="userName"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-8 grid lg:grid-cols-2 gap-4 sm:grid-cols-1" data-aos="fade-left">
                                            <div className="mb-8" data-aos="fade-right">
                                                <label htmlFor="phone" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    رقم الهاتف
                                                </label>
                                                <input
                                                    placeholder="أدخل رقم هاتفك"
                                                    required
                                                    className="shadow-one dark:shadow-signUp w-full rounded-2 border border-input-color-blue border-opacity-50 bg-transparent px-6 py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
                                                    type="number"
                                                    name="phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-8" data-aos="fade-right">
                                                <label htmlFor="image" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    صورة الملف الشخصي (اجباري)
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        id="image"
                                                        name="image"
                                                        onChange={handleImageChange}
                                                    />
                                                    <label
                                                        htmlFor="image"
                                                        className="inline-flex items-center justify-between w-full px-5 py-4 text-base text-white bg-primary rounded-2 cursor-pointer hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:bg-[#1F2656] dark:hover:bg-[#2D3A66] dark:focus:ring-[#4D6588] transition duration-300"
                                                    >
                                                        {/* If an image is selected, show the name of the file, else show "اختيار صورة" */}
                                                        <span className="mr-2">
                                                            {imageFile ? imageFile.name : 'اختيار صورة'}
                                                        </span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9l2 2-2 2M7 9l-2 2 2 2M12 19v-6M5 12h14" />
                                                        </svg>
                                                    </label>
                                                    {/* Success Alert Message */}
                                                    {showAlert && (
                                                        <span className="absolute top-8 left-0 w-full bg-green-500 text-white text-sm text-center py-2 rounded">
                                                            تم اختيار صورة بنجاح
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-4' data-aos="fade-left">
                                            <div className="mb-8 relative" data-aos="fade-left">
                                                <label htmlFor="password" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    كلمة المرور
                                                </label>
                                                <div className="relative flex items-center">
                                                    <button
                                                        type="button"
                                                        className="absolute left-4 text-xl text-dark-color"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                    </button>
                                                    <input
                                                        placeholder="أدخل كلمة المرور"
                                                        required
                                                        className="shadow-one dark:shadow-signUp w-full pl-12 pr-4 rounded-2 border border-input-color-blue border-opacity-50 bg-transparent py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
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
                                                        className="absolute left-4 text-xl text-dark-color"
                                                        onClick={toggleConfirmPasswordVisibility}
                                                    >
                                                        {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                    </button>
                                                    <input
                                                        placeholder="أعد إدخال كلمة المرور"
                                                        required
                                                        className="shadow-one dark:shadow-signUp w-full pl-12 pr-4 rounded-2 border border-input-color-blue border-opacity-50 bg-transparent py-3 text-base text-dark-color placeholder-body-color outline-none focus:border-primary dark:border-opacity-30 dark:bg-[#1F2656] he-max-60"
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
                                        <div className="mb-8 flex items-center">
                                            <label htmlFor="checkboxLabel" className="flex cursor-pointer select-none text-sm font-medium text-body-color-2 dark:text-body-color">
                                                <div className="relative flex items-center">
                                                    <input id="checkboxLabel" type="checkbox" name="checkboxLabel"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                                </div>
                                                <span className="text-primary me-3">
                                                    <span className="rtl:text-right ltr:text-left text-muted">
                                                        بإنشاء حساب يعني أنك توافق على
                                                        {" "}
                                                        <a target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" href="/terms">الشروط والأحكام</a>
                                                        {" "}
                                                        و
                                                        {" "}
                                                        <a target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" href="/terms">سياسة الخصوصية</a>
                                                    </span>
                                                </span>
                                            </label>
                                        </div>

                                        <div data-aos="fade-up">
                                            <button
                                                type="submit"
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
