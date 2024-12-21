import { Api_Uri } from '@/app/_api/api';
import showUnauthorizedAlert from '@/components/NotAuthError';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const HeaderAdmin = () => {
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        sub_description: '',
        description: '',
    });
    const [idWillChange, setIdWillChange] = useState(null);

    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${Api_Uri}/home/header`);
            const resData = response.data.data[0];
            if (resData == null || resData == undefined) {
                setData([]);
                return;
            }
            setData(resData);
            setFormData({
                title: resData.title,
                sub_description: resData.sub_description,
                description: resData.description,
            });
        } catch (error) {
            setError(error);
            setData(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datSend = {
            title: formData.title,
            sub_description: formData.sub_description,
            description: formData.description,
        };
        if (idWillChange == null) {
            axios.post(`${Api_Uri}/home/header`, datSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                fetchData();
                toggleModal();
                Swal.fire({
                    icon: 'success',
                    text: "تم إضافة البيانات بنجاح",
                    timer: 1500,
                    showConfirmButton: false,
                    showCancelButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    }
                });
            }).catch((error) => {
                if (error?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    text: error?.response?.data?.detail || "حدث خطأ ما",
                    timer: 3000,
                    showConfirmButton: false,
                    showCancelButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#f27474";
                        }
                    }
                });
            });
        }
        else {
            axios.put(`${Api_Uri}/home/header/${idWillChange}`, datSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                fetchData();
                toggleModal();
                Swal.fire({
                    icon: 'success',
                    text: "تم تحديث البيانات بنجاح",
                    timer: 1500,
                    showConfirmButton: false,
                    showCancelButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    }
                });
            }).catch((error) => {
                if (error?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    text: error?.response?.data?.detail || "حدث خطأ ما",
                    timer: 3000,
                    showConfirmButton: false,
                    showCancelButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#f27474";
                        }
                    }
                });
            })
        }
    };

    return (
        <div className="p-6 mx-auto bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">
                تعديل محتوى الصفحة الرئيسية
            </h1>
            {
                data == null || data.length == 0
                    ?
                    <div className="text-red-500 font-semibold text-lg">
                        لا يوجد بيانات
                    </div>
                    :
                    <div className="space-y-6">
                        <div className="border border-gray-300 p-4 rounded-lg">
                            <p className="inline-block bg-blue-600 text-white py-1 px-3 rounded text-sm font-semibold">
                                العنوان
                            </p>
                            <p className="text-xl text-gray-800 mt-2">{data?.title}</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg">
                            <div className="space-x-2">
                                <p className="inline-block bg-green-600 text-white py-1 px-3 rounded text-sm font-semibold">
                                    الوصف الفرعي
                                </p>
                                <p className="text-lg text-gray-700 mt-2">{data?.sub_description}</p>
                            </div>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg">
                            <div className="space-x-2">
                                <p className="inline-block bg-indigo-600 text-white py-1 px-3 rounded text-sm font-semibold">
                                    الوصف
                                </p>
                                <p className="text-gray-600 mt-2">{data?.description}</p>
                            </div>
                        </div>
                    </div>
            }
            {
                data?.length == 0
                    ?
                    <button
                        onClick={() => {
                            toggleModal();
                            setIdWillChange(null);
                        }}
                        className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        إضافة بيانات
                    </button>
                    :
                    <button
                        onClick={() => {
                            toggleModal();
                            setIdWillChange(data?.id);
                        }}
                        className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        تحديث البيانات
                    </button>
            }

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 relative">
                        {/* Modal Close Icon */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-indigo-600">
                                تحديث البيانات
                            </h2>
                            <button
                                onClick={toggleModal}
                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                aria-label="Close"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    العنوان
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="sub_description"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    الوصف الفرعي
                                </label>
                                <textarea
                                    id="sub_description"
                                    name="sub_description"
                                    value={formData.sub_description}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    الوصف
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-between space-x-4 gap-4">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 w-50"
                                >
                                    حفظ التحديث
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 w-50"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderAdmin;
