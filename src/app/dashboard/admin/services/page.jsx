'use client';

import { useEffect, useState } from "react";
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import showUnauthorizedAlert from "@/components/NotAuthError";
import { Api_Uri } from "@/app/_api/api";

export default function Page() {

    const [token, setToken] = useState(null);
    const [servicesData, setServicesData] = useState([]);
    const [refreshGetData, setRefreshGetData] = useState(false);

    useEffect(() => {
        const GetToken = localStorage.getItem("wasl-token");
        if (GetToken) {
            setToken(GetToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    const fetchData = async () => {
        axios.get(`${Api_Uri}/services`, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then((res) => {
            setServicesData(res.data);
        }).catch((err) => {
            if (err.response.status === 401) {
                showUnauthorizedAlert();
                return;
            } else {
                setServicesData([]);
                Swal.fire({
                    icon: 'error',
                    title: "حدث خطأ اثناء جلب البيانات",
                    text: err?.response?.data || "حاول مرة أخرى",
                    confirmButtonText: 'حسناً',
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    }
                });
            }
        });
    }
    useEffect(() => {
        if (!token) return;
        fetchData();
    }, [token]);

    const AccordionItem = ({ service }) => {
        const [isOpen, setIsOpen] = useState(false);
        const toggleAccordion = () => setIsOpen(!isOpen);

        const [openModalImage, setOpenModalImage] = useState(false);  // Modal visibility state
        const [image, setImage] = useState(null);  // State to store the selected image
        const [preview, setPreview] = useState(null);  // State to store the image preview URL
        const [serveicwWillUpdateImage, setServiceWillUpdateImage] = useState(null);  // State to store the ID of the service image that will be updated

        // Function to open the modal
        const openModal = (item) => {
            setOpenModalImage(true);
            setServiceWillUpdateImage(item);
        };

        // Function to close the modal
        const closeModal = () => {
            setOpenModalImage(false);
            setImage(null);
            setPreview(null);
            setServiceWillUpdateImage(null);
        };

        // Handle image change and set preview
        const handleImageChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                setImage(file);
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl); // Set preview for the selected image
            }
        };

        // Handle image submission (upload)
        const handleImageSubmit = () => {
            if (image) {
                const formImage = new FormData();

                formImage.append("image_service", image);
                axios.put(`${Api_Uri}/services/add-image/${serveicwWillUpdateImage.id}`, formImage, {
                    headers: { "Authorization": `Bearer ${token}` }
                }).then((res) => {
                    closeModal();
                    fetchData();
                    Swal.fire({
                        icon: 'success',
                        title: 'تم تحديث الصورة بنجاح',
                        confirmButtonText: 'حسناً',
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: () => {
                            const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                            if (progressBar) {
                                progressBar.style.background = "#16a34a";
                            }
                        },
                    });
                }).catch((err) => {
                    if (err.response.status === 401) {
                        showUnauthorizedAlert();
                        return;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "حدث خطأ اثناء تحديث الصورة",
                            text: err?.response?.data || "حاول مرة أخرى",
                            confirmButtonText: 'حسناً',
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: () => {
                                const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                                if (progressBar) {
                                    progressBar.style.background = "#d33";
                                }
                            }
                        });
                    }
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: "ليس هناك صورة محددة",
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#d33";
                        }
                    }
                });
            }
        };

        const handleDeleteService = (id) => {

            Swal.fire({
                title: 'هل أنت متأكد من حذف الخدمة؟',
                text: "لن تتمكن من استعادة البيانات بعد الحذف",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'نعم, احذف الخدمة',
                cancelButtonText: 'إلغاء'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${Api_Uri}/services/${id}/delete`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }).then((res) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'تم حذف الخدمة بنجاح',
                            timer: 1000,
                            timerProgressBar: true,
                            showCancelButton: false,
                            showConfirmButton: false,
                            didOpen: () => {
                                const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                                if (progressBar) {
                                    progressBar.style.background = "#16a34a";
                                }
                            },
                        });
                        fetchData();
                    }).catch((err) => {
                        if (err.response.status === 401) {
                            showUnauthorizedAlert();
                            return;
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "حدث خطأ اثناء حذف الخدمة",
                                text: err?.response?.data || "حاول مرة أخرى",
                                confirmButtonText: 'حسناً',
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                                    if (progressBar) {
                                        progressBar.style.background = "#d33";
                                    }
                                }
                            });
                        }
                    });
                }
            })

        }

        return (
            <div className="border-b border-gray-300 mb-8">
                <div
                    className="flex justify-between items-center px-3 py-4 bg-blue-50 rounded-md shadow-sm cursor-pointer hover:bg-blue-100 transition-all"
                    onClick={toggleAccordion}
                >
                    <div className="flex items-center gap-3">
                        <i className={`text-2xl ${service.icon_service} text-blue-500 mr-3`} />
                        <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                    </div>
                    <span className="text-blue-500 text-lg">{isOpen ? "-" : "+"}</span>
                </div>

                {isOpen && (
                    <div className="p-6 bg-white rounded-md shadow-md mt-2">
                        {/* Image */}
                        {service.image_service && (
                            <div className="relative mb-8 aspect-[34/20] rounded-sm bg-stone-100 w-full h-[500px] overflow-hidden ml-auto">
                                <img
                                    alt={service.name}
                                    src={service.image_service}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover object-center"
                                    sizes="100vw"
                                />
                            </div>
                        )}

                        {/* Main Data */}
                        <div className="mb-5">
                            <label className="font-medium text-gray-700 block">Description</label>
                            <p className="text-gray-700">{service.description}</p>
                        </div>

                        <div className="mb-5">
                            <label className="font-medium text-gray-700 block">Sub Description</label>
                            <p className="text-gray-600">{service.sub_description}</p>
                        </div>

                        <div className="mb-5">
                            <label className="font-medium text-gray-700 block">Total Price</label>
                            <p className="text-lg font-semibold text-gray-800">${service.total_price}</p>
                        </div>

                        {/* Steps */}
                        <div className="mb-5">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Steps</h4>
                            {service.steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="mb-3 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg shadow-sm transition-all duration-200"
                                >
                                    <div className="flex items-center justify-between mt-2 flex-wrap gap-3 mb-2">
                                        {/* Step Name */}
                                        <h5 className="font-semibold text-gray-700">{step.name}</h5>
                                        {/* Price */}
                                        {
                                            step.step_price > 0 ? (
                                                <p className="text-lg font-semibold text-gray-800 bg-blue-400 py-1 px-3 rounded-full">${step.step_price}</p>
                                            ) : (
                                                <p className="text-lg font-semibold text-gray-800 bg-red-400 py-1 px-3 rounded-full">Free</p>
                                            )
                                        }
                                    </div>
                                    {/* Step Description */}
                                    <p className="text-sm text-gray-500">{step.step_description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Benefits */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Benefits</h4>
                            {service.benifits_service.map((benefit, index) => (
                                <div key={index} className="mb-4 p-4 border-l-4 border-green-500 bg-green-50 rounded-lg shadow-sm">
                                    <h5 className="font-medium text-gray-700">{benefit.title}</h5>
                                    <div
                                        className="flex flex-wrap gap-3 mt-2"
                                    >
                                        {benefit.names.map((name, index) => (
                                            <span key={index} className="text text-gray-800 bg-green-300 px-2 py-1 rounded-md">{name}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6 flex-wrap">
                            <a
                                href={`/dashboard/admin/services/update?id=${service.id}`}
                                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 w-full sm:w-auto"
                            >
                                Update
                            </a>
                            <button
                                onClick={() => handleDeleteService(service.id)}
                                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 w-full sm:w-auto">
                                Delete
                            </button>
                            <button
                                onClick={() => openModal(service)}
                                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-200 w-full sm:w-auto">
                                Update Image
                            </button>
                        </div>
                    </div>
                )}

                {openModalImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                            <h3 className="font-semibold text-2xl text-gray-800 mb-6">تحديث الصورة</h3>

                            {/* Image preview */}
                            {preview ? (
                                <div className="mb-6">
                                    <img
                                        src={preview}
                                        alt="Image Preview"
                                        className="w-full h-auto rounded-md"
                                    />
                                </div>
                            ) : (
                                <div className="mb-6 text-gray-600">لم يتم تحديد صورة بعد</div>
                            )}

                            {/* File input */}
                            <div className="mb-6">
                                <label htmlFor="image-upload" className="block text-gray-800 font-semibold mb-2">
                                    اختار صورة جديدة
                                </label>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Submit button */}
                            <div className="flex justify-between items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleImageSubmit}
                                    className="w-50 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    تحديث الصورة
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-50 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors duration-200"
                                >
                                    إلغاء
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <SideBar currentTab={"service"}>
            <div className="min-h-screen bg-opacity-30 rounded">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-10">
                    خدماتنا
                </h1>

                {/* Add New Service Button */}
                <div className="flex justify-end mb-6">
                    <a
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                        href="/dashboard/admin/services/create"
                    >
                        إضافة خدمة جديدة
                    </a>
                </div>

                <div className="bg-white rounded-lg">
                    {servicesData.map((service) => (
                        <AccordionItem key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </SideBar>
    );

}
