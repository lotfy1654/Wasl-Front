'use client';
import { Api_Uri } from "@/app/_api/api";
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import showUnauthorizedAlert from "@/components/NotAuthError";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaCalendarAlt, FaImage, FaUserShield, FaHashtag } from "react-icons/fa";
import Swal from "sweetalert2";


export default function Page() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModalDetails, setOpenModalDetails] = useState(false);
    const [SearchItem, setSearchItem] = useState("");
    const [token, setToken] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    const [newRole, setNewRole] = useState(""); // The new role to set

    useEffect(() => {
        const getToken = localStorage.getItem("wasl-token");
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    const fetchUsers = async () => {
        axios.get(`${Api_Uri}/auth/all-person-in-system`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                setUsers([]);
            });
    }

    useEffect(() => {
        if (!token) return;
        fetchUsers();
    }, [token]);

    useEffect(() => {
        if (!token) return;
        if (SearchItem == "") {
            fetchUsers();
        } else {
            // Filter users based on the search term
            setUsers(
                users.filter((user) => {
                    // Check if any user property includes the search term
                    const searchTerm = SearchItem.toLowerCase();
                    return (
                        user.username.toLowerCase().includes(searchTerm) ||
                        user.email.toLowerCase().includes(searchTerm) ||
                        user.first_name.toLowerCase().includes(searchTerm) ||
                        user.last_name.toLowerCase().includes(searchTerm) ||
                        user.role.toLowerCase().includes(searchTerm)
                    );
                })
            );
        }
    }, [SearchItem]);


    const handleCloseModal = () => setSelectedUser(null);


    return (
        <SideBar currentTab={"everyone"}>
            <div
                className="mx-auto p-4"
                dir="rtl"
            >
                <div className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-6 p-3 bg-white rounded-lg shadow-md mb-4 max-w-full sm:max-w-lg">
                    <h2 className="text-xl font-semibold text-gray-800">جميع المستخدمين</h2>
                    <div className="w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search for user"
                            value={SearchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 text-sm transition duration-200"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {/* Table for larger screens */}
                    <div className="min-h-[450px]">

                        <table className="border border-gray-300 rounded-md min-w-[1000px] w-[100%]">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="px-4 py-2 text-center text-sm font-medium">#</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">#</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">اسم المستخدم</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">الدور</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">الدولة</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">تاريخ الميلاد</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">التفاصيل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 text-center">
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{user.id}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">
                                            <div
                                                className="rounded-full overflow-hidden flex items-center justify-center"
                                            >
                                                <img
                                                    src={user.profile_picture || "https://via.placeholder.com/40"}
                                                    alt="User Profile"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{user.username}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{user.role}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{user.country || "غير متوفر"}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{user.date_of_birth || "غير متوفر"}</td>
                                        <td className="px-4 py-2 text-center border">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setOpenModalDetails(true)
                                                }}
                                                className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-600 transition mr-2"
                                            >
                                                تفاصيل
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {
                                    users.length == 0 && (
                                        <tr>
                                            <td colSpan="7"
                                                className="text-center py-4 text-xl font-bold text-red-600 border border-red-600 rounded-md">
                                                لا يوجد بيانات
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>


                {selectedUser
                    && openModalDetails
                    && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">تفاصيل المستخدم</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Card 1 */}
                                    <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-blue-50">
                                        <div className="flex items-center gap-2 justify-start">
                                            <p className="text-gray-700 font-medium">اسم المستخدم</p>
                                            <FaUser className="text-blue-600" />
                                        </div>
                                        <p className="text-gray-900 mt-2 text-right">{selectedUser.username}</p>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-green-50">
                                        <div className="flex items-center gap-2 justify-start">
                                            <p className="text-gray-700 font-medium">البريد الإلكتروني</p>
                                            <FaEnvelope className="text-green-600" />
                                        </div>
                                        <p className="text-gray-900 mt-2 text-right">{selectedUser.email}</p>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-yellow-50">
                                        <div className="flex items-center gap-2 justify-start">
                                            <p className="text-gray-700 font-medium">الاسم الكامل</p>
                                            <FaUser className="text-yellow-600" />
                                        </div>
                                        <p className="text-gray-900 mt-2 text-right">
                                            {selectedUser.first_name} {selectedUser.last_name}
                                        </p>
                                    </div>

                                    {/* Card 4 */}
                                    <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-purple-50">
                                        <div className="flex items-center gap-2 justify-start">
                                            <p className="text-gray-700 font-medium">رقم الهاتف</p>
                                            <FaPhone className="text-purple-600" />
                                        </div>
                                        <p className="text-gray-900 mt-2 text-right">{selectedUser.phone || "غير متوفر"}</p>
                                    </div>

                                    {/* Card 5 */}
                                    <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-pink-50">
                                        <div className="flex items-center gap-2 justify-start">
                                            <p className="text-gray-700 font-medium">الدولة</p>
                                            <FaGlobe className="text-pink-600" />
                                        </div>
                                        <p className="text-gray-900 mt-2 text-right">{selectedUser.country || "غير متوفر"}</p>
                                    </div>

                                    {/* Card 6 */}
                                    <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-teal-50">
                                        <div className="flex items-center gap-2 justify-start">
                                            <p className="text-gray-700 font-medium">تاريخ الميلاد</p>
                                            <FaCalendarAlt className="text-teal-600" />
                                        </div>
                                        <p className="text-gray-900 mt-2 text-right">{selectedUser.date_of_birth || "غير متوفر"}</p>
                                    </div>

                                    {/* Profile Picture */}
                                    {selectedUser.profile_picture && (
                                        <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-gray-50 col-span-full">
                                            <div className="flex items-center gap-2 justify-start">
                                                <p className="text-gray-700 font-medium">الصورة الشخصية</p>
                                                <FaImage className="text-gray-600" />
                                            </div>
                                            <img
                                                src={selectedUser.profile_picture}
                                                alt="Profile"
                                                className="rounded-lg w-48 h-48 object-cover mt-4 mx-auto border-4 border-indigo-500"
                                            />
                                        </div>
                                    )}

                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-100"
                                    >
                                        إغلاق
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}





            </div>
        </SideBar >
    );
}
