import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Api_Uri } from "@/app/_api/api";
import showUnauthorizedAlert from "@/components/NotAuthError";
import { FaPhoneAlt, FaEnvelope, FaPen } from "react-icons/fa"; // Import icons from React Icons


export default function AboutInfoAdmin() {
    const [loading, setLoading] = useState(false);
    const [aboutInfo, setAboutInfo] = useState(null);
    const [token, setToken] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
    const [addNewItem, setAddNewItem] = useState(false); // Track if we are adding a new item

    const [formdataAboutInfo, setFormdataAboutInfo] = useState({
        phone_number: "",
        email: "",
    });

    const fetchAboutInfo = async () => {
        axios.get(`${Api_Uri}/about-us/info`)
            .then(res => {
                if (res.data.length == 0) {
                    setAboutInfo(null);
                    return;
                }
                setAboutInfo(res.data[0]);

            }) // Assuming the data is in the first element of the array
            .catch(err => setAboutInfo(null));
    };

    // Fetch token from localStorage
    useEffect(() => {
        const getToken = localStorage.getItem("wasl-token");
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    // Fetch about info
    useEffect(() => {
        fetchAboutInfo();
    }, []);

    // Submit handler to update user info (if needed)
    const handleSubmit = async () => {


        if (addNewItem) {

            try {
                const formdata = new FormData();
                formdata.append("phone_number", formdataAboutInfo.phone_number);
                formdata.append("email", formdataAboutInfo.email);
                const response = await axios.post(
                    `${Api_Uri}/about-us/info/create`, formdata,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                Swal.fire({
                    icon: "success",
                    text: "تم إضافة البيانات بنجاح",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    },
                });
                closeModal();
                fetchAboutInfo();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
                    text: error?.response?.data.phone_number || error?.response?.data.email || "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    },
                });
                closeModal();
            } finally {
                setLoading(false);
            }

        } else {
            try {

                const formdata = new FormData();
                formdata.append("phone_number", formdataAboutInfo.phone_number);
                formdata.append("email", formdataAboutInfo.email);
                const response = await axios.patch(
                    `${Api_Uri}/about-us/info/update/${aboutInfo.id}`, formdata,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                Swal.fire({
                    icon: "success",
                    text: "تم تحديث البيانات بنجاح",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    },
                });
                closeModal();
                fetchAboutInfo();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
                    text: error?.response?.data.phone_number || error?.response?.data.email || "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    },
                });
                closeModal();
            } finally {
                setLoading(false);
            }
        }

    };

    // Open modal for adding or editing data
    const openModal = () => setIsModalOpen(true);

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setAddNewItem(false);
    };


    return (
        <div className="flex justify-center items-center mt-5 mb-5">

            <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-right">
                    بيانات الاتصال
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone Number Card */}
                    <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-6">
                        <FaPhoneAlt className="text-blue-600" size={28} />
                        <label className="text-lg font-medium text-blue-600">رقم الهاتف</label>
                        {
                            aboutInfo?.phone_number == null
                                ? <p className="text-red-500">لم يتم إضافة رقم الهاتف بعد</p>
                                :
                                <p className="text-xl font-semibold text-gray-800">{aboutInfo?.phone_number}</p>
                        }
                    </div>

                    {/* Email Card */}
                    <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-6">
                        <FaEnvelope className="text-green-600" size={28} />
                        <label className="text-lg font-medium text-green-600">البريد الإلكتروني</label>
                        {
                            aboutInfo?.email == null
                                ? <p className="text-red-500">لم يتم إضافة البريد الإلكتروني بعد</p>
                                :
                                <p className="text-xl font-semibold text-gray-800">{aboutInfo?.email}</p>
                        }
                    </div>
                </div>

                {/* Update Button */}
                <div className="mt-8 flex justify-start gap-2">
                    {
                        aboutInfo == null
                            ?
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={() => {
                                        setAddNewItem(true);
                                        openModal();
                                        setFormdataAboutInfo({
                                            phone_number: "",
                                            email: "",
                                        });
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    إضافة بيانات
                                </button>
                            </div>
                            :
                            <button
                                onClick={() => {
                                    setAddNewItem(false);
                                    openModal();
                                    setFormdataAboutInfo({
                                        phone_number: aboutInfo?.phone_number,
                                        email: aboutInfo?.email,
                                    });
                                }}
                                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2 shadow-lg transition-all gap-2"
                            >
                                <FaPen size={20} />
                                <span className="text-md">تحديث البيانات</span>
                            </button>
                    }
                </div>
            </div>



            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" dir="rtl">
                    <div className="bg-white rounded-lg shadow-lg w-[40rem] p-6 overflow-y-auto max-h-[70vh]">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">تحديث البيانات الشخصية</h2>
                            <button
                                onClick={closeModal}
                                className="text-white bg-red-500 p-1 rounded-full hover:bg-red-600"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            {/* Phone Number Input */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    رقم الهاتف
                                </label>
                                <input
                                    id="phoneNumber"
                                    type="text"
                                    value={formdataAboutInfo?.phone_number}
                                    onChange={(e) => setFormdataAboutInfo(prev => ({ ...prev, phone_number: e.target.value }))}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="أدخل رقم الهاتف"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formdataAboutInfo?.email}
                                    onChange={(e) => setFormdataAboutInfo(prev => ({ ...prev, email: e.target.value }))}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="أدخل البريد الإلكتروني"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex justify-between space-x-3 gap-2">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-50"
                                disabled={loading}
                            >
                                {loading ? "جارٍ التحديث..." : "تحديث البيانات"}
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 w-50"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
