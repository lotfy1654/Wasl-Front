import { useState, useEffect } from 'react';
import axios from 'axios';
import { Api_Uri } from '@/app/_api/api';
import Swal from 'sweetalert2';
import showUnauthorizedAlert from '@/components/NotAuthError';

export default function CategoryAdmin() {
    const [categories, setCategories] = useState([]);
    const [modalType, setModalType] = useState(null); // 'add' or 'update'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalData, setModalData] = useState({ name: '' });
    const [token, setToken] = useState('');
    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);
    // Fetch categories from API
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        axios.get(`${Api_Uri}/blog/categories`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch(() => {
                setCategories([]);
            });
    };

    const handleAdd = async () => {
        try {
            await axios.post(`${Api_Uri}/blog/categories/create`, modalData, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            fetchCategories();
            closeModal();
            Swal.fire({
                icon: 'success',
                title: 'تمت إضافة الفئة بنجاح',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ أثناء إضافة الفئة',
                text: error?.response?.data?.message || "حاول مرة أخرى",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#d33";
                    }
                }
            });
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${Api_Uri}/blog/categories/update/${selectedCategory.id}`, modalData, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            fetchCategories();
            closeModal();
            Swal.fire({
                icon: 'success',
                title: 'تم تحديث الفئة بنجاح',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });

        } catch (error) {
            if (error.response.status === 401) {
                showUnauthorizedAlert();
                return;
            }
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ أثناء تحديث الفئة',
                text: error?.response?.data?.message || "حاول مرة أخرى",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#d33";
                    }
                }
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${Api_Uri}/blog/categories/delete/${id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            fetchCategories();
            Swal.fire({
                icon: 'success',
                title: 'تم حذف الفئة بنجاح',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });
        } catch (error) {
            if (error.response.status === 401) {
                showUnauthorizedAlert();
                return;
            }
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ أثناء حذف الفئة',
                text: error?.response?.data?.message || "حاول مرة أخرى",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#d33";
                    }
                }
            });
        }
    };

    const openModal = (type, category = null) => {
        setModalType(type);
        setSelectedCategory(category);
        setModalData(category ? { name: category.name } : { name: '' });
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedCategory(null);
        setModalData({ name: '' });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">إدارة الفئات</h1>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
                onClick={() => openModal('add')}
            >
                إضافة فئة جديدة
            </button>

            {/* Table for large screens */}
            <div className="hidden md:block">
                <table className="w-full border border-gray-300 text-center">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="border border-gray-300 p-2">#</th>
                            <th className="border border-gray-300 p-2">اسم الفئة</th>
                            <th className="border border-gray-300 p-2">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{category.name}</td>
                                <td className="border border-gray-300 p-2 space-x-2">
                                    <div
                                        className='d-flex justify-content-center align-items-center space-x-2 gap-4'
                                    >
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => openModal('update', category)}
                                        >
                                            تعديل
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            حذف
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan="3" className="border border-gray-300 p-2">لا توجد فئات</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Cards for small screens */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {categories.map((category, index) => (
                    <div
                        key={category.id}
                        className="border border-gray-300 p-4 rounded shadow-md flex flex-col items-start space-y-2"
                    >
                        <div className="text-gray-700 font-medium">#{index + 1}</div>
                        <div className="text-lg font-bold text-gray-800">{category.name}</div>
                        <div className="flex space-x-2 gap-4 w-full">
                            <button
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-50"
                                onClick={() => openModal('update', category)}
                            >
                                تعديل
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-50"
                                onClick={() => handleDelete(category.id)}
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                ))}
                {categories.length === 0 && (
                    <div className="text-center text-gray-500">لا توجد فئات</div>
                )}
            </div>

            {/* Modal */}
            {modalType && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">
                            {modalType === 'add' ? 'إضافة فئة جديدة' : 'تعديل الفئة'}
                        </h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                modalType === 'add' ? handleAdd() : handleUpdate();
                            }}
                        >
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">اسم الفئة</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded p-2"
                                    value={modalData.name}
                                    onChange={(e) =>
                                        setModalData({ ...modalData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2 gap-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-50"
                                >
                                    {modalType === 'add' ? 'إضافة' : 'تحديث'}
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400 w-50"
                                    onClick={closeModal}
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
}
