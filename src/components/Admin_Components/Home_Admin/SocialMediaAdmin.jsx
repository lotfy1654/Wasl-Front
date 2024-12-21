import { useState, useEffect } from 'react';
import axios from 'axios';
import { Api_Uri } from '@/app/_api/api';
import Swal from 'sweetalert2';
import showUnauthorizedAlert from '@/components/NotAuthError';

const SocialMediaAdmin = () => {
    const [socialMediaData, setSocialMediaData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        social_name: '',
        link: '',
        icon_social: '',
        icon_color: '',
    });
    const [isEditing, setIsEditing] = useState(false); // Track if we are editing an item
    const [token, setToken] = useState(null);
    const extractErrors = (errorObj) => {
        const errors = [];
        for (const [key, messages] of Object.entries(errorObj)) {
            messages.forEach((message) => {
                errors.push({
                    field: key,
                    errorMessage: message,
                });
            });
        }
        return errors;
    };


    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    })

    // Fetch data from API
    const fetchData = async () => {
        axios.get(`${Api_Uri}/home/social-media`).then((response) => {
            setSocialMediaData(response.data);
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error fetching social media data',
            });
            setSocialMediaData([]);
        });
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    // Handle form data change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle add or update form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            axios.patch(`${Api_Uri}/home/social-media/${formData.id}/update`, formData, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((response) => {
                fetchData(); // Refresh data after submission
                toggleModal(); // Close modal after submission
                Swal.fire({
                    icon: 'success',
                    title: 'Social media data updated successfully',
                    text: 'Social media data has been updated successfully',
                    timer: 2000,
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
                    title: 'Error updating social media data',
                    text: error?.response?.data?.message || extractErrors(error.response) || "Something went wrong while updating social media data",
                    timer: 2000,
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
            axios.post(`${Api_Uri}/home/social-media/create`, formData, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((response) => {
                fetchData(); // Refresh data after submission
                toggleModal(); // Close modal after submission
                Swal.fire({
                    icon: 'success',
                    title: 'Social media data added successfully',
                    text: 'Social media data has been added successfully',
                    timer: 2000,
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
                    title: 'Error adding social media data',
                    text: error?.response?.data?.message || extractErrors(error.response) || "Something went wrong while adding social media data",
                    timer: 2000,
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

    };

    // Handle delete
    const handleDelete = async (id) => {
        axios.delete(`${Api_Uri}/home/social-media/${id}/delete`, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then((response) => {
            fetchData(); // Refresh data after submission
            Swal.fire({
                icon: 'success',
                title: 'Social media data deleted successfully',
                text: 'Social media data has been deleted successfully',
                timer: 2000,
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
                title: 'Error deleting social media data',
                text: error?.response?.data?.message || extractErrors(error.response) || "Something went wrong while deleting social media data",
                timer: 1500,
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

    // Handle update (open modal for editing)
    const handleUpdate = (item) => {
        setFormData({
            social_name: item.social_name,
            link: item.link,
            icon_social: item.icon_social,
            icon_color: item.icon_color,
            id: item.id, // Store the ID for updating
        });
        setIsEditing(true);
        toggleModal(); // Open modal for editing
    };

    // Modal open/close toggle
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="p-6 mt-5 mx-auto bg-white shadow rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-600 mb-4 sm:mb-0">
                    إدارة وسائل التواصل الاجتماعي
                </h1>
                <a
                    href="https://icons.getbootstrap.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    أيقونات Bootstrap
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialMediaData?.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center mb-4 gap-3">
                            <i
                                className={`${item.icon_social} text-3xl`}
                                style={{ color: item.icon_color }}
                            ></i>
                            <h2 className="ml-4 text-xl font-semibold">{item.social_name}</h2>
                        </div>
                        <div className="overflow-hidden">
                            <a
                                className="text-blue-800 mb-2 break-words block"
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {item.link}
                            </a>
                        </div>
                        <div className="flex gap-3 w-full mt-5">
                            <button
                                onClick={() => handleUpdate(item)}
                                className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                            >
                                تعديل
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="w-1/2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                ))}
                {
                    socialMediaData.length === 0 && (
                        <div className="text-center text-gray-600 text-lg font-semibold col-span-3">
                            لا توجد بيانات
                        </div>
                    )
                }
            </div>

            <button
                onClick={toggleModal}
                className="mt-6 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
            >
                إضافة وسيلة جديدة
            </button>

            {/* Modal for Add or Update */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-max-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                            إضافة/تحديث وسيلة التواصل الاجتماعي
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="social_name">
                                    اسم الوسيلة
                                </label>
                                <input
                                    type="text"
                                    id="social_name"
                                    name="social_name"
                                    value={formData.social_name}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="link">
                                    الرابط
                                </label>
                                <input
                                    type="url"
                                    id="link"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="icon_social">
                                    أيقونة الوسيلة
                                </label>
                                <input
                                    type="text"
                                    id="icon_social"
                                    name="icon_social"
                                    value={formData.icon_social}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700" htmlFor="icon_color">
                                    لون الأيقونة
                                </label>
                                <input
                                    type="color"
                                    id="icon_color"
                                    name="icon_color"
                                    value={formData.icon_color}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex justify-between gap-3 space-x-4">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none w-1/2"
                                >
                                    حفظ
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="py-2 px-4 bg-red-400 text-white rounded-lg hover:bg-red-500 w-1/2"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default SocialMediaAdmin;
