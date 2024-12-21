import { useState, useEffect } from 'react';
import axios from 'axios';
import { Api_Uri } from '@/app/_api/api';
import Swal from 'sweetalert2';
import showUnauthorizedAlert from '@/components/NotAuthError';

const AboutUsAdmin = () => {
    const [aboutUs, setAboutUs] = useState({
        id: 2,
        title: '',
        description: '',
        sub_description: '',
        items: [],
        image: ''
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

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        sub_description: '',
        items: [
            {
                icon: '',
                text: ''
            }
        ],
        image: ''
    });

    const getALlData = () => {
        axios
            .get(`${Api_Uri}/about-us`)
            .then((response) => {
                setAboutUs(response.data[0]);
            })
            .catch((error) => {
                setAboutUs([]);
            });
    };

    useEffect(() => {
        getALlData();
    }, []);

    const handleStartUpdate = () => {
        setFormData({
            title: aboutUs.title,
            description: aboutUs.description,
            sub_description: aboutUs.sub_description,
            items: aboutUs.items,
            image: aboutUs.image
        });
        setShowModal(true);
    };

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { icon: '', text: '' }]
        });
    };

    const handleRemoveItem = (index) => {
        const updatedItems = formData.items.filter((_, idx) => idx !== index);
        setFormData({ ...formData, items: updatedItems });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = formData.items.map((item, idx) =>
            idx === index ? { ...item, [name]: value } : item
        );
        setFormData({ ...formData, items: updatedItems });
    };

    const handleSubmit = () => {
        // Handle image upload and other form submission logic here.
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('sub_description', formData.sub_description);
        if (typeof formData.image != 'string') {
            formDataToSubmit.append('image', formData.image);
        }
        formDataToSubmit.append('items', JSON.stringify(formData.items));

        axios
            .put(`${Api_Uri}/about-us/update/${aboutUs.id}`
                , formDataToSubmit, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then((response) => {
                getALlData();
                setShowModal(false);
                Swal.fire({
                    icon: 'success',
                    title: 'تم تحديث البيانات بنجاح',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    }
                });
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ ما',
                    showConfirmButton: false,
                    showCancelButton: false,
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

    return (
        <div className="p-6 mx-auto bg-white shadow rounded-lg mt-5">
            <h2 className="text-3xl font-bold text-indigo-600 mb-8">من نحن</h2>

            <div className="space-y-6">
                {/* About Us Card */}
                <div className="bg-white rounded-lg p-6 flex flex-col items-start">
                    <h2 className="text-3xl font-semibold text-indigo-700 mb-4 text-right">{aboutUs.title}</h2>
                    <p className="text-right text-lg text-gray-700 mb-4">{aboutUs.description}</p>
                    <h4 className="text-right text-xl text-indigo-600">{aboutUs.sub_description}</h4>
                    {aboutUs.image && (
                        <div className="flex justify-center mt-6">
                            <img src={aboutUs.image} alt="About Us" className="rounded-xl shadow max-w-[450px] h-auto" />
                        </div>
                    )}
                </div>

                {/* Items List Section */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-indigo-700 text-right">العناصر</h4>
                    {aboutUs.items.length === 0 ? (
                        <div className="text-center text-gray-500">لا توجد عناصر بعد. يرجى إضافة عناصر جديدة.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {aboutUs.items.map((item) => (
                                <div className="bg-white shadow rounded-lg p-4" key={item.id}>
                                    <div className="text-right">
                                        <i className={`bi ${item.icon} text-indigo-600 text-4xl`}></i>
                                        <p className="mt-3 text-lg text-gray-700">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-right mt-6">
                        <button
                            className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
                            onClick={() => handleStartUpdate()}
                        >
                            تحديث البيانات
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Add/Update About Us */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/2 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold text-indigo-700 text-right mb-4">تحديث المعلومات</h2>

                        {/* Title, Description, Sub Description, Image Inputs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">العنوان</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">الوصف</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">الوصف الفرعي</label>
                                <input
                                    type="text"
                                    name="sub_description"
                                    value={formData.sub_description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">الصورة</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            {/* Items Section */}
                            <h3 className="mt-4 text-lg text-indigo-700 text-right">العناصر</h3>
                            {formData.items.map((item, index) => (
                                <div key={index} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الأيقونة</label>
                                        <input
                                            type="text"
                                            name="icon"
                                            value={item.icon}
                                            onChange={(e) => handleItemChange(index, e)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">النص</label>
                                        <input
                                            type="text"
                                            name="text"
                                            value={item.text}
                                            onChange={(e) => handleItemChange(index, e)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                        />
                                    </div>

                                    {formData.items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(index)}
                                            className="text-red-600 hover:text-red-800 mt-3 bg-red-700 px-3 py-1 rounded-lg text-sm text-white"
                                        >
                                            إزالة هذا العنصر
                                        </button>
                                    )}
                                </div>
                            ))}

                            {/* Add New Item Button */}
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="text-blue-600 hover:text-blue-800 mt-4 w-full bg-blue-700 px-3 py-1 rounded-lg text-sm text-white"
                            >
                                إضافة عنصر جديد
                            </button>

                            {/* Submit and Cancel Buttons */}
                            <div className="mt-6 d-flex justify-content-between gap-4">
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 w-50"
                                >
                                    حفظ
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="ml-4 px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 w-50"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutUsAdmin;
