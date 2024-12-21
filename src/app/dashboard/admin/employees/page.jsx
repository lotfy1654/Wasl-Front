'use client';
import { Api_Uri } from "@/app/_api/api";
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import showUnauthorizedAlert from "@/components/NotAuthError";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaCalendarAlt, FaImage, FaUserShield, FaHashtag, FaBriefcase, FaBuilding } from "react-icons/fa";
import Swal from "sweetalert2";


export default function Page() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModalDetails, setOpenModalDetails] = useState(false);
    const [SearchItem, setSearchItem] = useState("");
    const [token, setToken] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    const [newRole, setNewRole] = useState(""); // The new role to set
    const [allUsers, setAllUsers] = useState([]); // All users in the system
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false); // Add employee modal visibility
    const [selectedUserWillAdd, setSelectedUserWillAdd] = useState(null); // The user that will be added as an employee
    const [newEmployeePosition, setNewEmployeePosition] = useState(""); // The new employee position
    const [newEmployeeCompany, setNewEmployeeCompany] = useState(""); // The new employee company

    useEffect(() => {
        const getToken = localStorage.getItem("wasl-token");
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);


    const fetchUsers = async () => {
        axios.get(`${Api_Uri}/auth/users/only`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setAllUsers(res.data);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                setAllUsers([]);
            });
    }

    const fetchEmployees = async () => {
        axios.get(`${Api_Uri}/auth/employees`, {
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
        fetchEmployees();
    }, [token]);


    const showEmployeeDetails = (id) => {
        axios.get(`${Api_Uri}/auth/employees/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setSelectedUser(res.data);
            setOpenModalDetails(true);
        }).catch((err) => {
            if (err.response.status === 401) {
                showUnauthorizedAlert();
                return;
            }
            Swal.fire({
                icon: "error",
                title: "خطأ",
                text: "حدث خطأ أثناء جلب بيانات المستخدم",
            });
        });
    }

    const handleCloseModal = () => setSelectedUser(null);


    const handleDelEmployee = (id) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "هل تريد حذف هذا الموظف؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Api_Uri}/auth/employees/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "تم الحذف بنجاح",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            didOpen: () => {
                                const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                                if (progressBar) {
                                    progressBar.style.background = "#16a34a";
                                }
                            }
                        });
                        fetchEmployees();
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            showUnauthorizedAlert();
                            return;
                        }
                        Swal.fire({
                            icon: "error",
                            title: "حدث خطأ",
                            text: "حدث خطأ أثناء حذف الموظف",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            didOpen: () => {
                                const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                                if (progressBar) {
                                    progressBar.style.background = "#d33";
                                }
                            }
                        });
                    });
            }
        });
    }


    const handleAddEmployee = () => {
        setIsAddEmployeeModalOpen(true);
        fetchUsers();
    }

    const handleSymitAddEmployee = (e) => {
        e.preventDefault();
        if (!selectedUserWillAdd) {
            Swal.fire({
                icon: "error",
                title: "خطأ",
                text: "يرجى اختيار مستخدم لإضافته كموظف",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#d33";
                    }
                }
            });
            return;
        }
        axios.post(`${Api_Uri}/auth/employees/create`, {
            "user": selectedUserWillAdd.id,
            "position": newEmployeePosition,
            "company_name": newEmployeeCompany
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((res) => {
            Swal.fire({
                icon: "success",
                title: "تمت العملية بنجاح",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });
            setIsAddEmployeeModalOpen(false);
            fetchEmployees();
            setNewEmployeeCompany("");
            setNewEmployeePosition("");
            setSelectedUserWillAdd(null);
        }).catch((err) => {
            if (err.response.status === 401) {
                showUnauthorizedAlert();
                return;
            }
            Swal.fire({
                icon: "error",
                title: "حدث خطأ",
                text: "حدث خطأ أثناء إضافة الموظف",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#d33";
                    }
                }
            });
        });
    }

    return (
        <SideBar currentTab={"employee"}>
            <div
                className="mx-auto p-4"
                dir="rtl"
            >
                <div className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-6 p-3 bg-white rounded-lg shadow-md mb-4 max-w-full sm:max-w-lg">
                    <h2 className="text-xl font-semibold text-gray-800">
                        الموظفين
                    </h2>
                    <button
                        className="px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded hover:bg-indigo-600 transition"
                        onClick={handleAddEmployee}
                    >
                        إضافة موظف
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-h-[450px]">
                        <table className="border border-gray-300 rounded-md min-w-[1000px] w-[100%]">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="px-4 py-2 text-center text-sm font-medium">#</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">#</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">اسم المستخدم</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">الدور</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">المنصب</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">الشركة</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">التفاصيل</th>
                                    <th className="px-4 py-2 text-center text-sm font-medium">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 text-center">
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.id}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">
                                            <div
                                                className="rounded-full overflow-hidden flex items-center justify-center"
                                            >
                                                <img
                                                    src={item.user.profile_picture || "https://via.placeholder.com/40"}
                                                    alt="User Profile"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.user.username}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.user.role}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.position || "غير متوفر"}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700 border">{item.company_name || "غير متوفر"}</td>
                                        <td className="px-4 py-2 text-center border">
                                            <button
                                                onClick={() => showEmployeeDetails(item.id)}
                                                className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-600 transition mr-2"
                                            >
                                                تفاصيل
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 text-center border">
                                            <button
                                                onClick={() => handleDelEmployee(item.id)}
                                                className="btn btn-danger"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {
                                    users.length == 0 && (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4 text-xl font-bold text-red-600 border border-red-600 rounded-md">
                                                لا يوجد بيانات
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>


                {selectedUser && openModalDetails && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">تفاصيل المستخدم</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Username */}
                                <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-blue-50">
                                    <div className="flex items-center gap-2 justify-start">
                                        <p className="text-gray-700 font-medium">اسم المستخدم</p>
                                        <FaUser className="text-blue-600" />
                                    </div>
                                    <p className="text-gray-900 mt-2 text-right">{selectedUser.user.username}</p>
                                </div>

                                {/* Email */}
                                <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-green-50">
                                    <div className="flex items-center gap-2 justify-start">
                                        <p className="text-gray-700 font-medium">البريد الإلكتروني</p>
                                        <FaEnvelope className="text-green-600" />
                                    </div>
                                    <p className="text-gray-900 mt-2 text-right">{selectedUser.user.email}</p>
                                </div>

                                {/* Full Name */}
                                <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-yellow-50">
                                    <div className="flex items-center gap-2 justify-start">
                                        <p className="text-gray-700 font-medium">الاسم الكامل</p>
                                        <FaUser className="text-yellow-600" />
                                    </div>
                                    <p className="text-gray-900 mt-2 text-right">
                                        {selectedUser.user.first_name} {selectedUser.user.last_name}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-purple-50">
                                    <div className="flex items-center gap-2 justify-start">
                                        <p className="text-gray-700 font-medium">رقم الهاتف</p>
                                        <FaPhone className="text-purple-600" />
                                    </div>
                                    <p className="text-gray-900 mt-2 text-right">{selectedUser.user.phone || "غير متوفر"}</p>
                                </div>

                                {/* Country */}
                                <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-pink-50">
                                    <div className="flex items-center gap-2 justify-start">
                                        <p className="text-gray-700 font-medium">الدولة</p>
                                        <FaGlobe className="text-pink-600" />
                                    </div>
                                    <p className="text-gray-900 mt-2 text-right">{selectedUser.user.country || "غير متوفر"}</p>
                                </div>

                                {/* Date of Birth */}
                                <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-teal-50">
                                    <div className="flex items-center gap-2 justify-start">
                                        <p className="text-gray-700 font-medium">تاريخ الميلاد</p>
                                        <FaCalendarAlt className="text-teal-600" />
                                    </div>
                                    <p className="text-gray-900 mt-2 text-right">{selectedUser.user.date_of_birth || "غير متوفر"}</p>
                                </div>

                                {/* Position */}
                                <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-indigo-50">
                                    <div className="flex items-center gap-2 justify-start">
                                        <p className="text-gray-700 font-medium">المسمى الوظيفي</p>
                                        <FaBriefcase className="text-indigo-600" />
                                    </div>
                                    <p className="text-gray-900 mt-2 text-right">{selectedUser.position || "غير متوفر"}</p>
                                </div>

                                {/* Company Name */}
                                <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-gray-50">
                                    <div className="flex items-center gap-2 justify-start">
                                        <p className="text-gray-700 font-medium">اسم الشركة</p>
                                        <FaBuilding className="text-gray-600" />
                                    </div>
                                    <p className="text-gray-900 mt-2 text-right">{selectedUser.company_name || "غير متوفر"}</p>
                                </div>

                                {/* Profile Picture */}
                                {selectedUser.user.profile_picture && (
                                    <div className="border rounded-lg p-4 shadow-sm flex flex-col bg-gray-50 col-span-full">
                                        <div className="flex items-center gap-2 justify-start">
                                            <p className="text-gray-700 font-medium">الصورة الشخصية</p>
                                            <FaImage className="text-gray-600" />
                                        </div>
                                        <img
                                            src={selectedUser.user.profile_picture}
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


                {isAddEmployeeModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 max-h-[80vh] overflow-y-auto">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">اختر مستخدم لإضافته كموظف</h2>
                            <form onSubmit={(e) => handleSymitAddEmployee(e)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                                    {/* Company Name Input */}
                                    <div>
                                        <label
                                            htmlFor="company_name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            اسم الشركة
                                        </label>
                                        <input
                                            type="text"
                                            id="company_name"
                                            value={newEmployeeCompany}
                                            onChange={(e) => setNewEmployeeCompany(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="مثال: Startup Inc"
                                            required
                                        />
                                    </div>
                                    {/* Position Input */}
                                    <div>
                                        <label
                                            htmlFor="position"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            الوظيفة
                                        </label>
                                        <input
                                            type="text"
                                            id="position"
                                            value={newEmployeePosition}
                                            onChange={(e) => setNewEmployeePosition(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="مثال: Developer"
                                            required
                                        />
                                    </div>

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {allUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() => setSelectedUserWillAdd(user)}
                                            className={`relative border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 ${selectedUser?.id === user.id
                                                ? "border-indigo-500 bg-indigo-50"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {/* Checkmark */}
                                            {selectedUserWillAdd?.id === user.id && (
                                                <div className="absolute top-2 left-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
                                                {user.profile_picture ? (
                                                    <img
                                                        src={user.profile_picture}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-gray-500 text-xl font-bold">
                                                        {user.first_name[0]}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-lg font-medium text-gray-700">
                                                {user.first_name} {user.last_name}
                                            </p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                            <p className="text-sm text-gray-500">{user.role}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-between gap-4">
                                    <button
                                        className={`px-4 py-2 rounded-md transition w-50 ${selectedUserWillAdd
                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                        type="submit"
                                    >
                                        حفظ
                                    </button>
                                    <button
                                        onClick={() => setIsAddEmployeeModalOpen(false)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-4 w-50"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </SideBar >
    );
}
