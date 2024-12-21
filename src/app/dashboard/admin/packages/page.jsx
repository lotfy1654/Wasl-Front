'use client';
import { Api_Uri } from "@/app/_api/api";
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import showUnauthorizedAlert from "@/components/NotAuthError";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Page() {
    const [packages, setPackages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [allorders, setAllOrders] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [newPackage, setNewPackage] = useState({
        name: '',
        description: '',
        price: '',
        duration_in_days: '',
        benefits: [{ name: '' }],
    });

    const [token, setToken] = useState('');
    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    // Fetch packages from API
    const fetchPackages = async () => {
        axios.get(`${Api_Uri}/packages`)
            .then(res => {
                setPackages(res.data);
            })
            .catch(err => {
                setPackages([]);
            });
    };
    useEffect(() => {
        fetchPackages();
    }, []);

    // Fetch all orders from API
    const fetchAllOrders = async () => {
        axios.get(`${Api_Uri}/packages/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            setAllOrders(res.data);
        }).catch(err => {
            setAllOrders([]);
        });
    };

    useEffect(() => {
        if (!token) return;
        fetchAllOrders();
    }, [token]);

    // Handle opening modal for adding a new package
    const handleAddNew = () => {
        setIsEditMode(false);
        setNewPackage({
            name: '',
            description: '',
            price: '',
            duration_in_days: '',
            benefits: [{ name: '' }],
        });
        setIsModalOpen(true);
    };

    // Handle opening modal for editing an existing package
    const handleEdit = (packageData) => {
        setIsEditMode(true);
        setSelectedPackage(packageData);
        setNewPackage(packageData);
        setIsModalOpen(true);
    };

    // Handle delete action
    const handleDelete = async (id) => {
        axios.delete(`${Api_Uri}/packages/delete/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'تم الحذف بنجاح',
                timer: 800,
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
            fetchPackages();
        }).catch(err => {
            if (err?.response?.status === 401) {
                showUnauthorizedAlert();
                return;
            }
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ',
                text: 'حدث خطأ أثناء محاولة حذف الحزمة. الرجاء المحاولة مرة أخرى',
                timer: 2000,
                showConfirmButton: false,
                showCancelButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#d33";
                    }
                }
            });
        });
    };

    // Handle form submission for adding or updating a package
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditMode) {
            // Update package
            axios.put(`${Api_Uri}/packages/update/${selectedPackage.id}`, newPackage, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'تم التحديث بنجاح',
                    timer: 800,
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
                fetchPackages();
            }).catch(err => {
                if (err?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ',
                    text: 'حدث خطأ أثناء محاولة تحديث الحزمة. الرجاء المحاولة مرة أخرى',
                    timer: 2000,
                    showConfirmButton: false,
                    showCancelButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    }
                });
            });
        } else {
            // Add new package
            axios.post(`${Api_Uri}/packages/create`, newPackage, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'تمت الإضافة بنجاح',
                    timer: 800,
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
                fetchPackages();
            }).catch(err => {
                if (err?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ',
                    text: 'حدث خطأ أثناء محاولة إضافة الحزمة. الرجاء المحاولة مرة أخرى',
                    timer: 2000,
                    showConfirmButton: false,
                    showCancelButton: false,
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
        setIsModalOpen(false);
    };

    // Handle input changes for form
    const handleInputChange = (e, index = null) => {
        const { name, value } = e.target;
        if (index !== null) {
            const newBenefits = [...newPackage.benefits];
            newBenefits[index] = { name: value };
            setNewPackage((prev) => ({ ...prev, benefits: newBenefits }));
        } else {
            setNewPackage((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddBenefit = () => {
        setNewPackage((prev) => ({
            ...prev,
            benefits: [...prev.benefits, { name: '' }],
        }));
    };

    return (
        <SideBar currentTab="package">
            <div className="container mx-auto px-0 py-8">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    onClick={handleAddNew}
                >
                    إضافة حزمة جديدة
                </button>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition duration-300 relative">
                            <p className="text-white mb-2 absolute top-1 end-2 bg-blue-700 px-2 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                <span className="font-bold">{pkg.id}</span>
                                <span className="text-sm">ID</span>
                            </p>
                            <h3 className="text-xl font-semibold mb-2 mt-3">{pkg.name}</h3>
                            <p className="text-gray-600 mb-4">{pkg.description}</p>
                            <div className="mb-2 font-semibold me-2 bg-blue-100 px-2 py-1 rounded-lg">
                                <p>
                                    <span
                                        className="text-blue-800 font-semibold"
                                    >
                                        السعر:
                                    </span>
                                    <span
                                        className=" text-blue-800 font-bold me-1"
                                    >
                                        {pkg.price}
                                    </span>
                                </p>
                            </div>
                            <div className="mb-2 font-semibold me-2 bg-yellow-100 px-2 py-1 rounded-lg">
                                <p>
                                    <span
                                        className="text-yellow-800 font-semibold"
                                    >
                                        المدة:
                                    </span>
                                    <span
                                        className=" text-yellow-800 font-bold me-1"
                                    >
                                        {pkg.duration_in_days}
                                    </span>
                                </p>
                            </div>
                            <div className="flex space-x-2 mt-3 w-full justify-between gap-4">
                                <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 w-50"
                                    onClick={() => handleEdit(pkg)}
                                >
                                    تعديل
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 w-50"
                                    onClick={() => handleDelete(pkg.id)}
                                >
                                    حذف
                                </button>
                            </div>

                            {/* Benefits Card */}
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold text-lg">الفوائد</h4>
                                <ul className="mt-2 space-y-2">
                                    {pkg.benefits.map((benefit, index) => (
                                        <li key={index} className="text-gray-600">- {benefit.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    {/* Section Title */}
                    <h2 className="text-2xl font-bolf text-indigo-800 mb-6 text-right">تفاصيل الطلبات</h2>

                    {/* Table for larger screens */}
                    <div className="hidden lg:block">
                        <table className="min-w-full table-auto text-center">
                            <thead>
                                <tr className="border-b bg-blue-600">
                                    <th className="px-4 py-2 text-white font-semibold">الرقم</th>
                                    <th className="px-4 py-2 text-white font-semibold">معرف المستخدم</th>
                                    <th className="px-4 py-2 text-white font-semibold">معرف الباقة</th>
                                    <th className="px-4 py-2 text-white font-semibold">الاسم</th>
                                    <th className="px-4 py-2 text-white font-semibold">البريد الإلكتروني</th>
                                    <th className="px-4 py-2 text-white font-semibold">الهاتف</th>
                                    <th className="px-4 py-2 text-white font-semibold">تاريخ الإنشاء</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allorders.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 text-gray-800">{item.id}</td>
                                        <td className="px-4 py-2 text-gray-800">{item.user || 'غير متوفر'}</td>
                                        <td className="px-4 py-2 text-gray-800">{item.package}</td>
                                        <td className="px-4 py-2 text-gray-800">{item.name}</td>
                                        <td className="px-4 py-2 text-gray-800">{item.email}</td>
                                        <td className="px-4 py-2 text-gray-800">{item.phone || 'غير متوفر'}</td>
                                        <td className="px-4 py-2 text-gray-800">{new Date(item.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card Layout for smaller screens */}
                    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full bg-white">
                        {allorders.map((item) => (
                            <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out">
                                <div className="text-center mb-4">
                                    <span className="text-xl font-semibold text-gray-800">{item.name}</span>
                                </div>
                                <div className="text-gray-700 space-y-2">
                                    <p><strong>الرقم:</strong> {item.id}</p>
                                    <p><strong>معرف المستخدم:</strong> {item.user || 'غير متوفر'}</p>
                                    <p><strong>معرف الباقة:</strong> {item.package}</p>
                                    <p><strong>البريد الإلكتروني:</strong> {item.email}</p>
                                    <p><strong>الهاتف:</strong> {item.phone || 'غير متوفر'}</p>
                                    <p><strong>تاريخ الإنشاء:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-full sm:w-96 md:w-[600px] max-h-[80vh] overflow-auto shadow-lg">
                            <h2 className="text-2xl mb-4 text-center font-semibold">
                                {isEditMode ? 'تعديل الحزمة' : 'إضافة حزمة جديدة'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="name">
                                        الاسم
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={newPackage.name}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="description">
                                        الوصف
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={newPackage.description}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="price">
                                        السعر
                                    </label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={newPackage.price}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="duration_in_days">
                                        المدة
                                    </label>
                                    <input
                                        type="text"
                                        id="duration_in_days"
                                        name="duration_in_days"
                                        value={newPackage.duration_in_days}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">الفوائد</label>
                                    {newPackage.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center mb-3 mt-2 gap-3">
                                            <input
                                                type="text"
                                                value={benefit.name}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            <div className="flex items-center gap-2 me-2">
                                                <button
                                                    type="button"
                                                    className="text-white font-semibold bg-red-500 px-2 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                                    onClick={() => {
                                                        const newBenefits = [...newPackage.benefits];
                                                        newBenefits.splice(index, 1);
                                                        setNewPackage((prev) => ({ ...prev, benefits: newBenefits }));
                                                    }}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddBenefit}
                                        className="text-blue-500 font-semibold mt-2 w-100 mt-2 mb-2 bg-blue-100 px-2 py-2 rounded-lg hover:bg-blue-200 transition duration-300"
                                    >
                                        <i className="bi bi-plus-circle-fill ms-2"></i>
                                        إضافة فائدة جديدة
                                    </button>
                                </div>
                                <div className="flex justify-between gap-4 space-x-2 mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-50 hover:bg-blue-600 transition duration-300"
                                    >
                                        {isEditMode ? 'تحديث' : 'إضافة'}
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg w-50 hover:bg-red-600 transition duration-300"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        إغلاق
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </SideBar>
    );
}
