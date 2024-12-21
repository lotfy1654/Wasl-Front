import { useState, useEffect } from 'react';
import axios from 'axios';
import { Api_Uri } from '@/app/_api/api';
import showUnauthorizedAlert from '@/components/NotAuthError';
import Swal from 'sweetalert2';

const TestimonialAdmin = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        bussiness_position: '',
        description: '',
        image: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);



    // Fetch testimonials from API
    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${Api_Uri}/home/testimonial`);
            setTestimonials(response.data);
        } catch (error) {
            setTestimonials([]);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle adding or updating testimonial
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            axios.put(`${Api_Uri}/home/testimonial/${formData.id}/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => {
                fetchTestimonials();
                toggleModal();
                Swal.fire({
                    icon: 'success',
                    title: 'تم التعديل',
                    text: 'تم تعديل الشهادة بنجاح',
                    timer: 1200,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    }
                });
            }).catch((error) => {
                if (error.response.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ',
                    text: error?.response?.data?.message || 'حدث خطأ أثناء تعديل الشهادة',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    }
                });
            });
        } else {
            axios.post(`${Api_Uri}/home/testimonial/create`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => {
                fetchTestimonials();
                toggleModal();
                Swal.fire({
                    icon: 'success',
                    title: 'تم الإضافة',
                    text: 'تم إضافة الشهادة بنجاح',
                    timer: 1200,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    }
                });
            }).catch((error) => {
                if (error.response.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ',
                    text: error?.response?.data?.message || 'حدث خطأ أثناء إضافة الشهادة',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    }
                });
            });
        }
    };

    // Handle deleting a testimonial
    const handleDelete = async (id) => {
        axios.delete(`${Api_Uri}/home/testimonial/${id}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            fetchTestimonials();
            Swal.fire({
                icon: 'success',
                title: 'تم الحذف',
                text: 'تم حذف الشهادة بنجاح',
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });
        }).catch((error) => {
            if (error.response.status === 401) {
                showUnauthorizedAlert();
                return;
            }
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ',
                text: error?.response?.data?.message || 'حدث خطأ أثناء حذف الشهادة',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#d33";
                    }
                }
            });
        });
    };

    // Open modal for updating testimonial
    const handleUpdate = (testimonial) => {
        setFormData({
            ...testimonial,
        });
        setIsEditing(true);
        toggleModal();
    };

    // Toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setFormData({
            name: '',
            bussiness_position: '',
            description: '',
            image: null,
        });
    };

    return (
        <div className="p-8 mx-auto bg-white shadow-lg rounded-lg mt-10 max-w-7xl">
            <h1 className="text-4xl font-bold text-blue-700 mb-8 text-right">
                شهادات العملاء
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="flex justify-center mb-4">
                            {testimonial.image ? (
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 text-break">{testimonial.name}</h2>
                        <p className="text-sm text-gray-600 mb-2 text-break">{testimonial.bussiness_position}</p>
                        <p className="text-gray-700 text-break">{testimonial.description}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleUpdate(testimonial)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 button-half-width"
                            >
                                تعديل
                            </button>
                            <button
                                onClick={() => handleDelete(testimonial.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 button-half-width"
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                ))}
                {
                    testimonials.length === 0 && (
                        <div className="text-center text-gray-500 col-span-3">
                            لا توجد شهادات
                        </div>
                    )
                }
            </div>
            <button
                onClick={toggleModal}
                className="mt-8 py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none mt-5"
            >
                إضافة شهادة جديدة
            </button>

            {/* Modal for Add or Update Testimonial */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg w-full sm:w-[300px] md:w-[500px] lg:w-[500px] shadow-xl">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
                            {isEditing ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="name">
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="bussiness_position">
                                    الوظيفة
                                </label>
                                <input
                                    type="text"
                                    id="bussiness_position"
                                    name="bussiness_position"
                                    value={formData.bussiness_position}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="description">
                                    الوصف
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                >
                                    إغلاق
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
                                >
                                    حفظ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TestimonialAdmin;
