'use client';
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import { motion } from "framer-motion";
import { FaHome, FaInfoCircle, FaBlog, FaEnvelope, FaBoxOpen, FaUserTie, FaUsers, FaCogs, FaClipboardList, FaUserCircle } from "react-icons/fa";

export default function Page() {
    const tabs = [
        { name: "الرئيسية", icon: <FaHome />, link: "/dashboard/admin/home", color: "bg-blue-500" },
        { name: "من نحن", icon: <FaInfoCircle />, link: "/dashboard/admin/aboutus", color: "bg-green-500" },
        { name: "المدونة", icon: <FaBlog />, link: "/dashboard/admin/blog", color: "bg-purple-500" },
        { name: "الرسائل", icon: <FaEnvelope />, link: "/dashboard/admin/messages", color: "bg-red-500" },
        { name: "الباقات", icon: <FaBoxOpen />, link: "/dashboard/admin/packages", color: "bg-yellow-500" },
        { name: "الموظف", icon: <FaUserTie />, link: "/dashboard/admin/employees", color: "bg-indigo-500" },
        { name: "الجميع", icon: <FaUsers />, link: "/dashboard/admin/everyone", color: "bg-teal-500" },
        { name: "الخدمات", icon: <FaCogs />, link: "/dashboard/admin/services", color: "bg-orange-500" },
        { name: "الطلبات", icon: <FaClipboardList />, link: "/dashboard/admin/services/order", color: "bg-pink-500" },
        { name: "حسابي", icon: <FaUserCircle />, link: "/dashboard/admin/myaccount", color: "bg-gray-500" },
    ];

    return (
        <SideBar>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">لوحة التحكم</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tabs.map((tab, index) => (
                        <motion.a
                            key={index}
                            href={tab.link}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md text-white ${tab.color}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1, // Stagger effect
                                ease: "easeOut",
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="text-4xl mb-2"
                                whileHover={{
                                    rotate: -10,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                {tab.icon}
                            </motion.div>
                            <span className="text-lg font-semibold">{tab.name}</span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </SideBar>
    );
}
