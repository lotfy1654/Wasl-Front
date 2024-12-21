'use client';
import { useEffect, useState } from "react";
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import showUnauthorizedAlert from "@/components/NotAuthError";
import axios from "axios";
import { Api_Uri } from "@/app/_api/api";
import Swal from "sweetalert2";

export default function Page() {
    const [id, setId] = useState(null);
    const [getItem, setGetItem] = useState(null);
    // Initial state for the service form
    const [serviceData, setServiceData] = useState({
        name: "",
        description: "",
        sub_description: "",
        total_price: "",
        icon_service: "",
        benifits_service: [
            { title: "", names: [""] }
        ],
        steps: [
            { name: "", step_description: "", step_price: "" }
        ],
    });

    const [token, setToken] = useState(null);

    useEffect(() => {
        const search = new URLSearchParams(window.location.search);
        const id = search.get("id");
        setId(id);
        const GetToken = localStorage.getItem("wasl-token");
        if (GetToken) {
            setToken(GetToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    useEffect(() => {
        if (!id) return;
        if (!token) return;
        axios.get(`${Api_Uri}/services/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then((res) => {
            const service = res.data;
            setServiceData({
                name: service.name,
                description: service.description,
                sub_description: service.sub_description,
                total_price: service.total_price,
                icon_service: service.icon_service,
                benifits_service: service.benifits_service,
                steps: service.steps.map((step) => ({
                    name: step.name,
                    step_description: step.step_description,
                    step_price: step.step_price
                }))
            });
            setGetItem(true);
        }).catch((err) => {
            if (err.response.status === 401) {
                showUnauthorizedAlert();
                return;
            }
            setGetItem(false);
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ أثناء جلب البيانات',
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
        });
    }, [id, token]);


    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle nested input changes for steps and benefits
    const handleNestedInputChange = (e, section, index) => {
        const { name, value } = e.target;
        const updatedData = [...serviceData[section]];
        updatedData[index] = {
            ...updatedData[index],
            [name]: value,
        };
        setServiceData((prevState) => ({
            ...prevState,
            [section]: updatedData,
        }));
    };

    // Add a new step
    const addNewStep = () => {
        setServiceData((prevState) => ({
            ...prevState,
            steps: [
                ...prevState.steps,
                { name: "", requirements_data_from_user: "", step_price: "" }
            ]
        }));
    };

    // Add a new benefit
    const addNewBenefit = () => {
        setServiceData((prevState) => ({
            ...prevState,
            benifits_service: [
                ...prevState.benifits_service,
                { title: "", names: [""] }
            ]
        }));
    };

    // Add a new name under the current benefit
    const addNameToBenefit = (index) => {
        const updatedBenefits = [...serviceData.benifits_service];
        updatedBenefits[index].names.push(""); // Add an empty string for a new name
        setServiceData((prevState) => ({
            ...prevState,
            benifits_service: updatedBenefits
        }));
    };

    // Function to delete a name from a benefit
    const deleteName = (benefitIndex, nameIndex) => {
        setServiceData((prevState) => {
            const updatedBenefits = [...prevState.benifits_service];
            updatedBenefits[benefitIndex].names.splice(nameIndex, 1);
            return { ...prevState, benifits_service: updatedBenefits };
        });
    };

    // Function to delete a benefit
    const deleteBenefit = (index) => {
        setServiceData((prevState) => {
            const updatedBenefits = prevState.benifits_service.filter((_, idx) => idx !== index);
            return { ...prevState, benifits_service: updatedBenefits };
        });
    };


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!token) {
            showUnauthorizedAlert();
            return;
        }

        axios.put(`${Api_Uri}/services/update/${id}`, serviceData, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'تم تحديث الخدمة بنجاح',
                confirmButtonText: 'حسناً',
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
                willClose: () => window.location.href = "/dashboard/admin/services"
            });
        }).catch((err) => {
            if (err.response.status === 401) {
                showUnauthorizedAlert();
                return;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ أثناء تحديث الخدمة',
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
    };

    return (
        <SideBar currentTab={"service"}>
            <div className="md:bg-gray-50 md:p-8 rounded-lg md:shadow-sm sm:p-0 sm:bg-white">
                <h2 className="text-4xl font-semibold text-center mb-8 text-indigo-600">
                    تحديث الخدمة
                </h2>
                {
                    !getItem
                        ?
                        <div className="flex items-center border-l-4 border-red-800 bg-red-100 text-red-800 py-4 px-6 mb-4 rounded-md justify-between">
                            <div className="flex items-center gap-2">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3c1.77 0 3.41.56 4.75 1.5"
                                    />
                                </svg>
                                <span className="font-semibold">حدث خطأ أثناء جلب البيانات</span>
                            </div>
                            {/* Go Back Button */}
                            <button
                                type="button"
                                onClick={() => window.location.href = "/dashboard/admin/services"}
                                className="ml-6 bg-red-800 text-white py-2 px-4 rounded-md hover:bg-red-900 transition-colors duration-200 focus:outline-none"
                            >
                                العودة
                            </button>
                        </div>


                        :
                        <form onSubmit={handleSubmit} dir="rtl">
                            {/* Service Details */}
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">اسم الخدمة</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={serviceData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="أدخل اسم الخدمة"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="sub_description" className="block text-gray-800 font-semibold mb-2">الوصف الفرعي</label>
                                <textarea
                                    type="text"
                                    id="sub_description"
                                    name="sub_description"
                                    value={serviceData.sub_description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="أدخل الوصف الفرعي"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="description" className="block text-gray-800 font-semibold mb-2">الوصف</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={serviceData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="أدخل الوصف هنا"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="total_price" className="block text-gray-800 font-semibold mb-2">السعر الإجمالي</label>
                                <input
                                    type="number"
                                    id="total_price"
                                    name="total_price"
                                    value={serviceData.total_price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="أدخل السعر الإجمالي"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="icon_service" className="block text-gray-800 font-semibold mb-2">أيقونة الخدمة</label>
                                <input
                                    type="text"
                                    id="icon_service"
                                    name="icon_service"
                                    value={serviceData.icon_service}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="أدخل فئة الأيقونة (مثل 'bi bi-text')"
                                />
                            </div>

                            {/* Steps Section */}
                            <div className="mb-8">
                                <h3 className="font-semibold text-2xl text-gray-800 mb-6">الخطوات</h3>
                                {serviceData.steps.map((step, index) => (
                                    <div key={index} className="border rounded-lg p-6 mb-6 shadow-md bg-white">
                                        {/* Step Name Input */}
                                        <div className="mb-4">
                                            <label htmlFor={`step-name-${index}`} className="block text-gray-800 font-semibold mb-2">
                                                اسم الخطوة
                                            </label>
                                            <input
                                                type="text"
                                                id={`step-name-${index}`}
                                                name="name"
                                                placeholder="اسم الخطوة"
                                                value={step.name}
                                                onChange={(e) => handleNestedInputChange(e, 'steps', index)}
                                                className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        {/* Step Description Input */}
                                        <div className="mb-4">
                                            <label htmlFor={`step-description-${index}`} className="block text-gray-800 font-semibold mb-2">
                                                وصف الخطوة
                                            </label>
                                            <textarea
                                                id={`step-description-${index}`}
                                                name="step_description"
                                                placeholder="وصف الخطوة"
                                                value={step.step_description}
                                                onChange={(e) => handleNestedInputChange(e, 'steps', index)}
                                                className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>


                                        {/* Step Price Input */}
                                        <div className="mb-4">
                                            <label htmlFor={`step-price-${index}`} className="block text-gray-800 font-semibold mb-2">
                                                سعر الخطوة
                                            </label>
                                            <input
                                                type="number"
                                                id={`step-price-${index}`}
                                                name="step_price"
                                                placeholder="سعر الخطوة"
                                                value={step.step_price}
                                                onChange={(e) => handleNestedInputChange(e, 'steps', index)}
                                                className="w-full px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        {
                                            // Delete Step Button
                                            serviceData.steps.length > 1
                                            && (
                                                <div className="flex gap-4 mt-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updatedSteps = serviceData.steps.filter((_, idx) => idx !== index);
                                                            setServiceData((prevState) => ({
                                                                ...prevState,
                                                                steps: updatedSteps
                                                            }));
                                                        }}
                                                        className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-200"
                                                    >
                                                        حذف الخطوة
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}

                                {/* Add New Step Button */}
                                <button
                                    type="button"
                                    onClick={addNewStep}
                                    className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <span className="mr-2">+</span> إضافة خطوة جديدة
                                </button>
                            </div>


                            {/* Benefits Section */}
                            <div className="mb-8">
                                <h3 className="font-semibold text-2xl text-gray-800 mb-6">الفوائد</h3>
                                {serviceData.benifits_service.map((benefit, index) => (
                                    <div key={index} className="border rounded-lg p-6 mb-6 shadow-md bg-white">
                                        {/* Benefit Title Input */}
                                        <div className="mb-4">
                                            <label htmlFor={`benefit-title-${index}`} className="block text-gray-800 font-semibold mb-2">
                                                عنوان الفائدة
                                            </label>
                                            <input
                                                type="text"
                                                id={`benefit-title-${index}`}
                                                name="title"
                                                placeholder="عنوان الفائدة"
                                                value={benefit.title}
                                                onChange={(e) => handleNestedInputChange(e, 'benifits_service', index)}
                                                className="w-full mb-4 px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        {/* Benefit Names Inputs */}
                                        {benefit.names.map((name, idx) => (
                                            <div key={idx} className="mb-4">
                                                <label htmlFor={`benefit-name-${index}-${idx}`} className="block text-gray-800 font-semibold mb-2">
                                                    {`اسم الفائدة ${idx + 1}`}
                                                </label>
                                                <input
                                                    id={`benefit-name-${index}-${idx}`}
                                                    type="text"
                                                    name="names"
                                                    placeholder={`اسم الفائدة ${idx + 1}`}
                                                    value={name}
                                                    onChange={(e) => {
                                                        const newNames = [...benefit.names];
                                                        newNames[idx] = e.target.value;
                                                        setServiceData((prevState) => {
                                                            const updatedBenefits = [...prevState.benifits_service];
                                                            updatedBenefits[index] = {
                                                                ...updatedBenefits[index],
                                                                names: newNames
                                                            };
                                                            return { ...prevState, benifits_service: updatedBenefits };
                                                        });
                                                    }}
                                                    className="w-full mb-4 px-4 py-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                                {/* Delete Name Button */}
                                                {benefit.names.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteName(index, idx)}
                                                        className="mt-2 flex items-center text-red-600 hover:text-white border border-red-600 hover:bg-red-600 rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-4 h-4 mr-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                        حذف اسم
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {/* Add New Name Button */}
                                        <button
                                            type="button"
                                            onClick={() => addNameToBenefit(index)}
                                            className="mt-4 flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-full shadow-md hover:scale-105 transform transition duration-300 ease-in-out hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 5v14M5 12h14"
                                                />
                                            </svg>
                                            إضافة اسم جديد
                                        </button>

                                        {/* Delete Benefit Button */}
                                        {serviceData.benifits_service.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => deleteBenefit(index)}
                                                className="mt-4 flex items-center text-red-600 hover:text-white border border-red-600 hover:bg-red-600 rounded-md px-6 py-3 text-sm font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                                حذف الفائدة
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {/* Add New Benefit Button */}
                                <button
                                    type="button"
                                    onClick={addNewBenefit}
                                    className="flex items-center bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
                                >
                                    <span className="mr-2">+</span> إضافة فائدة جديدة
                                </button>
                            </div>



                            {/* Submit Button */}
                            <div className="flex gap-4 mt-6 justify-between">
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-50 md:w-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-8 rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
                                >
                                    تحديث الخدمة
                                </button>

                                {/* Cancel Button */}
                                <a
                                    href="/dashboard/admin/services"
                                    className="w-50 md:w-auto text-center bg-gradient-to-r from-red-500 to-red-700 text-white py-4 px-8 rounded-md shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
                                >
                                    إلغاء
                                </a>
                            </div>
                        </form>
                }
            </div>
        </SideBar>
    );
}
