import { useState, useEffect } from 'react';
import axios from 'axios';
import { Api_Uri } from '@/app/_api/api';
import Swal from 'sweetalert2';
import showUnauthorizedAlert from '@/components/NotAuthError';

const WhyChoseUSAdmin = () => {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentService, setCurrentService] = useState({
        id: null,
        title: '',
        description: '',
        icon: '',
        icons_img: null
    });
    const [token, setToken] = useState('');


    const fetchData = async () => {
        axios.get(`${Api_Uri}/home/why-choose-us`)
            .then(response => {
                setServices(response.data.data);
            })
            .catch(error => {
                setServices([]);
            });
    };

    useEffect(() => {

        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    useEffect(() => {
        if (!token) return;
        fetchData();
    }, [token])

    const handleDelete = (id) => {
        axios.delete(`${Api_Uri}/home/why-choose-us/${id}/delete`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(() => {
                fetchData();
                Swal.fire({
                    icon: 'success',
                    title: 'تم الحذف بنجاح',
                    showConfirmButton: false,
                    timer: 1200,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    }
                });
            })
            .catch(error => {
                if (error?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ ما',
                    showConfirmButton: false,
                    timer: 1000,
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

    const handleUpdate = (service) => {
        setCurrentService(service);
        setShowModal(true);
    };

    const handleAdd = () => {
        setCurrentService({
            id: null,
            title: '',
            description: '',
            icon: '',
            icons_img: null
        });
        setShowModal(true);
    };

    const handleSubmit = () => {
        const method = currentService.id ? 'put' : 'post';
        const url = currentService.id ? `${Api_Uri}/home/why-choose-us/${currentService.id}/update` : `${Api_Uri}/home/why-choose-us`;

        axios[method](url, currentService, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (currentService.id) {
                    fetchData();
                    Swal.fire({
                        icon: 'success',
                        title: 'تم التحديث بنجاح',
                        showConfirmButton: false,
                        timer: 1200,
                        timerProgressBar: true,
                        didOpen: () => {
                            const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                            if (progressBar) {
                                progressBar.style.background = "#16a34a";
                            }
                        }
                    });
                } else {
                    fetchData();
                    Swal.fire({
                        icon: 'success',
                        title: 'تمت الإضافة بنجاح',
                        showConfirmButton: false,
                        timer: 1200,
                        timerProgressBar: true,
                        didOpen: () => {
                            const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                            if (progressBar) {
                                progressBar.style.background = "#16a34a";
                            }
                        }
                    });
                }
                setShowModal(false);
            })
            .catch(error => {
                if (error?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ ما',
                    showConfirmButton: false,
                    timer: 1000,
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

    return (
        <div className="p-6 mx-auto bg-white shadow rounded-lg">
            <h2 className="text-3xl font-bold text-indigo-600 mb-8">الخيارات التي نقدمها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {services.map(service => (
                    <div className="card bg-white shadow-md border rounded-lg p-6 hover:scale-105 transition-all" key={service.id}>
                        <div className="flex justify-between items-center">
                            <i className={`${service.icon} text-indigo-600`} style={{ fontSize: '3rem' }}></i>
                        </div>
                        <h5 className="card-title mt-4 text-lg font-semibold text-gray-800">{service.title}</h5>
                        <p className="card-text text-gray-600 mt-2 text-sm">{service.description}</p>
                        <div className="flex justify-between mt-4">
                            <button className="btn btn-warning py-2 px-4 text-sm" onClick={() => handleUpdate(service)}>تحديث</button>
                            <button className="btn btn-danger py-2 px-4 text-sm" onClick={() => handleDelete(service.id)}>حذف</button>
                        </div>
                    </div>
                ))}
                {services.length === 0 && (
                    <div className="col-span-1 text-center">
                        <p className="text-lg text-gray-500">لا توجد بيانات حالياً</p>
                    </div>
                )}
            </div>
            <button className="btn btn-success mt-6 py-2 px-6 text-lg" onClick={handleAdd}>إضافة خدمة جديدة</button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-3 rounded-lg shadow-lg w-96 sm:w-1/2 lg:w-1/3">
                        <h3 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
                            {currentService.id ? 'تحديث الخدمة' : 'إضافة خدمة جديدة'}
                        </h3>
                        <div className="modal-content max-h-[70vh] overflow-y-auto p-3">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    value={currentService.title}
                                    onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    value={currentService.icon}
                                    onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    value={currentService.description}
                                    onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4 mt-3">
                            <button className="btn btn-primary py-2 px-4 w-50" onClick={handleSubmit}>
                                {currentService.id ? 'تحديث' : 'إضافة'}
                            </button>
                            <button className="btn btn-danger py-2 px-4 w-50" onClick={() => setShowModal(false)}>إغلاق</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhyChoseUSAdmin;
