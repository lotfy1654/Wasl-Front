'use client';

import { FaClipboardList, FaUserEdit } from 'react-icons/fa'; // Updated icons
import SidebarLayout from '@/components/User-Controle-Components/SideBar/Sidebar';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    return (
        <>
            <SidebarLayout>
                <div className="min-h-screen flex flex-col p-6 bg-gray-50" dir="rtl">
                    {/* Header */}
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">مرحبًا بك في لوحة التحكم</h1>

                    {/* Main Card Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* My Orders Card with Framer Motion Animation */}
                        <motion.div
                            className="pointer flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-lg p-6 transform transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                                rotate: -5,
                            }}
                            onClick={() => router.push('/dashboard/user/myorders')} // Updated route
                        >
                            <FaClipboardList className="text-5xl mb-4" /> {/* Updated icon */}
                            <h2 className="text-xl font-semibold mb-2">طلباتى</h2>
                            <p className="text-sm text-center">
                                عرض وإدارة طلباتك
                            </p>
                        </motion.div>

                        {/* My Account Card with Framer Motion Animation */}
                        <motion.div
                            className="pointer flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow-lg p-6 transform transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                                rotate: 5,
                            }}
                            onClick={() => router.push('/dashboard/user/myaccount')} // Updated route
                        >
                            <FaUserEdit className="text-5xl mb-4" /> {/* Updated icon */}
                            <h2 className="text-xl font-semibold mb-2">حسابي</h2>
                            <p className="text-sm text-center">
                                تحديث بياناتك الشخصية، تعديل إعدادات الحساب
                            </p>
                        </motion.div>
                    </div>

                    {/* Content Box - Explanation of Functionality */}
                    <motion.div
                        className="mt-12 bg-white p-8 rounded-lg shadow-xl border-t-4 border-pink-500 transform transition-all duration-300 hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">ما الذي يمكنك فعله هنا؟</h2>
                        <p className="text-lg text-gray-700 mb-6">
                            في لوحة التحكم الخاصة بك، يمكنك إدارة الطلبات التي قمت بإجرائها وتحديث بيانات حسابك بسهولة. اختر الإجراء الذي ترغب فيه وابدأ الآن!
                        </p>
                        <div className="mt-4 text-lg text-gray-600">
                            <ul className="list-decimal pl-6 space-y-3">
                                <li>
                                    <strong>طلباتى:</strong> يمكنك هنا عرض حالة طلباتك، تتبعها، أو إتمام الإجراءات المرتبطة بها.
                                </li>
                                <li>
                                    <strong>حسابي:</strong> قم بتحديث بياناتك الشخصية، تغيير كلمة المرور، وتخصيص إعدادات الحساب لتناسب احتياجاتك.
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </SidebarLayout>
        </>
    );
}
