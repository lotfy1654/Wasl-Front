'use client';

import { useState } from 'react';
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Page() {
    const [expandedService, setExpandedService] = useState(null);
    const [expandedStep, setExpandedStep] = useState(null);
    const [orderData, setOrderData] = useState([
        {
            "id": 24,
            "user": {
                "id": 3,
                "first_name": "Ali",
                "last_name": "Esmail",
                "email": "lotfy1653@hotmail.com",
                "phone": "123456789"
            },
            "assigned_employee": {
                "id": 18,
                "user": {
                    "id": 4,
                    "first_name": "kamal",
                    "last_name": "Elzero",
                    "email": "kamal@examle.com",
                    "phone": "123456789"
                },
                "position": "Nostrum perspiciatis"
            },
            "status": "new",
            "created_at": "2024-12-21T18:17:02.587636Z",
            "service": {
                "id": 24,
                "name": "تطوير تطبيقات الهاتف المحمول",
                "description": "تطوير تطبيقات موبايل عبر الأنظمة المختلفة لتقديم تجارب سلسة.",
                "sub_description": "تصميم وتطوير ونشر التطبيقات المدمجة والنقية.",
                "total_price": "9500.00"
            },
            "steps": [
                {
                    "id": 45,
                    "step": 79,
                    "status": "pending",
                    "payment_status": "unpaid",
                    "step_price": "1800.00",
                    "name": "جمع المتطلبات",
                    "step_description": "أهداف العمل، شخصيات المستخدم، قائمة الميزات",
                    "requirements_data_from_user": "نموذج ملاحظات المستخدم ووثيقة متطلبات الميزات.",
                    "files": "https://picsum.photos/200/300",
                    "data_req_user": "ورقة بيانات المستخدم لطلبات الميزات.",
                    "data_user_file_upload": "https://picsum.photos/300/400",
                    "step_result_text": "تم الانتهاء من جمع المتطلبات الأولية من المستخدم.",
                    "step_result_file": "https://picsum.photos/400/500"
                },
                {
                    "id": 46,
                    "step": 80,
                    "status": "pending",
                    "payment_status": "unpaid",
                    "step_price": "3500.00",
                    "name": "تصميم تطبيق الهاتف المحمول",
                    "step_description": "الإطارات السلكية، أصول التصميم، إرشادات العلامة التجارية",
                    "requirements_data_from_user": "تصاميم أولية للإطارات السلكية وإرشادات العلامة التجارية.",
                    "files": "https://picsum.photos/500/600",
                    "data_req_user": "إرشادات العلامة التجارية وورق تدفق المستخدم.",
                    "data_user_file_upload": "https://picsum.photos/600/700",
                    "step_result_text": "تم إعداد الإطارات السلكية وأصول تصميم التطبيق للمراجعة.",
                    "step_result_file": "https://picsum.photos/700/800"
                }
            ]
        }
    ]); // Initial state for order data
    const [steps, setSteps] = useState(orderData.flatMap(order => order.steps)); // Initial state for steps

    const toggleServiceAccordion = (serviceId) => {
        setExpandedService(serviceId === expandedService ? null : serviceId);
    };

    const toggleStepAccordion = (stepId) => {
        setExpandedStep(stepId === expandedStep ? null : stepId);
    };

    const openLinkInNewTab = (url) => {
        window.open(url, '_blank');
    };

    const updatePaymentStatus = (stepId) => {
        setSteps(prevSteps =>
            prevSteps.map(step =>
                step.id === stepId
                    ? { ...step, payment_status: step.payment_status === 'unpaid' ? 'paid' : 'unpaid' }
                    : step
            )
        );
    };

    const updateStepStatus = (stepId) => {
        setSteps(prevSteps =>
            prevSteps.map(step => {
                if (step.id === stepId) {
                    let newStatus;
                    switch (step.status) {
                        case 'pending':
                            newStatus = 'in-progress';
                            break;
                        case 'in-progress':
                            newStatus = 'completed';
                            break;
                        default:
                            newStatus = 'pending';
                    }
                    return { ...step, status: newStatus };
                }
                return step;
            })
        );
    };

    return (
        <SideBar currentTab={"order"}>
            <div className="">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">الطلبات</h1>
                {orderData.map(order => (
                    <div key={order.id} className="mb-4 bg-white text-gray-900 rounded-lg shadow-sm">
                        <button
                            onClick={() => toggleServiceAccordion(order.service.id)}
                            className="w-full text-left p-4 flex justify-between items-center border-b border-gray-200 hover:bg-gray-50"
                        >

                            {/* Order ID inside a small box with background */}
                            <div className='flex items-center gap-3'>
                                <span className="text-sm font-semibold text-white bg-blue-500 rounded px-2 py-1 ml-2">
                                    {order.id}
                                </span>
                                <span className="text-lg font-medium">{order.service.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`inline-block text-md px-3 py-1 rounded-full font-medium ${order.status === "new"
                                        ? "bg-red-100 text-red-600"
                                        : order.status === "in_progress"
                                            ? "bg-blue-100 text-blue-600"
                                            : order.status === "completed"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {order.status === "new"
                                        ? "جديد"
                                        : order.status === "in_progress"
                                            ? "قيد التنفيذ"
                                            : order.status === "completed"
                                                ? "مكتمل"
                                                : "غير محدد"}
                                </span>
                                <span>{expandedService === order.service.id ? "▲" : "▼"}</span>
                            </div>

                        </button>

                        {expandedService === order.service.id && (
                            <div className="p-4 space-y-4">
                                <div className="mb-8 bg-gray-50 p-3 rounded-xl shadow-md">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Service Details */}
                                        <div className="mb-2 bg-white p-6 rounded-lg shadow-sm">
                                            <p className="text-sm font-medium text-gray-500 mb-2">إجمالي السعر:</p>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {order.service.total_price}
                                            </p>
                                        </div>
                                        {/* Client Information */}
                                        <div className="mb-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <h4 className="text-lg font-medium text-gray-800 mb-3">معلومات العميل</h4>
                                            <div className="flex justify-between items-center flex-wrap gap-4">
                                                <p className="text-gray-700">
                                                    {order.user.first_name} {order.user.last_name}
                                                </p>
                                                <button
                                                    onClick={() => showUserDetails(order.user.id)}
                                                    className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                                                >
                                                    عرض التفاصيل
                                                </button>
                                            </div>
                                        </div>
                                        {/* Employee Details */}
                                        <div className="mb-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <h4 className="text-sm font-semibold text-gray-800 mb-3">الموظف المعين:</h4>
                                            {/* Check if employee is assigned */}
                                            {order.assigned_employee ? (
                                                <div className="flex justify-between items-center flex-wrap gap-4">
                                                    <p className="text-gray-700">
                                                        {order.assigned_employee.user.first_name} {order.assigned_employee.user.last_name}
                                                    </p>
                                                    <button
                                                        onClick={() => showEmployeeDetails(order.assigned_employee.user.id)}
                                                        className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                                                    >
                                                        عرض التفاصيل
                                                    </button>
                                                    <button
                                                        onClick={() => handleChangeEmployee(order.id)} // Assume handleChangeEmployee is a function to assign a new employee
                                                        className="bg-yellow-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-200"
                                                    >
                                                        تغيير الموظف
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between items-center flex-wrap gap-4">
                                                    <p className="text-gray-500">لا يوجد موظف معين</p>
                                                    <button
                                                        onClick={() => handleAddEmployee(order.id)} // Assume handleAddEmployee is a function to add an employee
                                                        className="bg-green-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                                                    >
                                                        إضافة موظف
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        {/* Order Status */}
                                        <div className="mb-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <h4 className="text-sm font-semibold text-gray-800 mb-3">حالة الطلب</h4>
                                            <div className="flex justify-between items-center">
                                                <span
                                                    className={`inline-block text-md px-3 py-1 rounded-full font-medium ${order.status === "new"
                                                        ? "bg-red-100 text-red-600"
                                                        : order.status === "in_progress"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : order.status === "completed"
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {order.status === "new"
                                                        ? "جديد"
                                                        : order.status === "in_progress"
                                                            ? "قيد التنفيذ"
                                                            : order.status === "completed"
                                                                ? "مكتمل"
                                                                : "غير محدد"}
                                                </span>
                                                <button
                                                    onClick={() => updateOrderStatus(order.id)}
                                                    className={`ml-4 text-sm font-medium py-2 px-4 rounded transition-colors duration-200 ${order.status === "new"
                                                        ? "bg-red-500 text-white hover:bg-red-600"
                                                        : order.status === "in_progress"
                                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                                            : order.status === "completed"
                                                                ? "bg-green-500 text-white hover:bg-green-600"
                                                                : "bg-gray-500 text-white hover:bg-gray-600"
                                                        }`}
                                                >
                                                    تعديل الحالة
                                                </button>
                                            </div>
                                        </div>
                                        {/* Created At */}
                                        <div className="mb-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <h4 className="text-sm font-semibold text-gray-800 mb-2">تاريخ الإنشاء</h4>
                                            <p className="text-sm text-gray-600">
                                                {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {order.steps.map(step => (
                                    <div key={step.id} className="mb-4 bg-blue-50 rounded-md shadow-md hover:bg-blue-100">
                                        <button
                                            onClick={() => toggleStepAccordion(step.id)}
                                            className="w-full flex justify-between items-center text-left text-gray-800 hover:bg-blue-200 p-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-medium">{step.name}</span>
                                                {/* Status Badge */}
                                                <span
                                                    className={`ml-2 px-3 py-1 text-white text-xs font-semibold rounded-full ${step.status === "pending"
                                                        ? "bg-gray-500"
                                                        : step.status === "in_progress"
                                                            ? "bg-blue-500"
                                                            : "bg-green-500"
                                                        }`}
                                                >
                                                    {step.status === "pending"
                                                        ? "Pending"
                                                        : step.status === "in_progress"
                                                            ? "In Progress"
                                                            : "Completed"}
                                                </span>
                                            </div>
                                            <span>{expandedStep === step.id ? "▲" : "▼"}</span>
                                        </button>

                                        {expandedStep === step.id && (
                                            <div className="mt-3 space-y-4 p-4">
                                                {/* Displaying Step Information */}
                                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <h4 className="text-gray-700 font-semibold">الحالة:</h4>
                                                            <p className={`${step.status === 'pending' ? 'text-yellow-600' : step.status === 'in-progress' ? 'text-blue-600' : 'text-green-600'}`}>{step.status}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-gray-700 font-semibold">حالة الدفع:</h4>
                                                            <p className={`${step.payment_status === 'unpaid' ? 'text-red-600' : 'text-green-600'}`}>{step.payment_status}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        <div>
                                                            <h4 className="text-gray-700 font-semibold">سعر الخطوة:</h4>
                                                            <p className="text-sm text-gray-800">{step.step_price} $</p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-gray-700 font-semibold">وصف الخطوة:</h4>
                                                            <p className="text-sm text-gray-800">{step.step_description}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Check if payment is paid and status is complete */}
                                                {step.payment_status !== 'paid' || step.status !== 'completed' ? (
                                                    <div className="flex justify-between mt-4">
                                                        <button
                                                            onClick={() => updatePaymentStatus(step.id)}
                                                            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 border border-blue-500 rounded-md"
                                                        >
                                                            تحديث حالة الدفع
                                                        </button>
                                                        <button
                                                            onClick={() => updateStepStatus(step.id)}
                                                            className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 border border-green-500 rounded-md"
                                                        >
                                                            تحديث الحالة
                                                        </button>
                                                    </div>
                                                ) : null}

                                                {/* Card 1: requirements_data_from_user and files */}
                                                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <h3 className="text-lg font-medium mb-3 text-gray-800">المتطلبات</h3>

                                                    {/* Requirements Data */}
                                                    <p className="text-sm mb-4 text-gray-700">
                                                        {step.requirements_data_from_user
                                                            ? step.requirements_data_from_user
                                                            : 'لا توجد بيانات متوفرة'}
                                                    </p>

                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        {/* Open File Button */}
                                                        {step.files ? (
                                                            <button
                                                                onClick={() => openLinkInNewTab(step.files)}
                                                                className="flex items-center bg-indigo-500 text-white hover:bg-indigo-600 py-2 px-6 border border-indigo-500 rounded-lg transition-transform duration-200 transform hover:scale-105"
                                                            >
                                                                <i className="bi bi-file-earmark-arrow-down h-5 w-5 mr-2"></i>
                                                                <span className="text-sm font-medium">فتح الملف</span>
                                                            </button>
                                                        ) : (
                                                            <p className="text-sm text-gray-500">لا توجد ملفات متوفرة</p>
                                                        )}

                                                        {/* Update Button */}
                                                        {step.payment_status !== 'paid' || step.status !== 'completed' ? (
                                                            <button
                                                                onClick={() => updateStep(step.id)}
                                                                className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md transition-colors duration-200"
                                                            >
                                                                تحديث المتطلبات
                                                            </button>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                {/* Card 2: data_req_user and data_user_file_upload */}
                                                <div className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-200">
                                                    <h3 className="text-lg font-medium mb-2 text-gray-700">بيانات المستخدم</h3>

                                                    {/* User Data */}
                                                    <p className="text-sm mb-2">
                                                        {step.data_req_user ? step.data_req_user : "لا توجد بيانات مرفقة"}
                                                    </p>

                                                    <div className="flex items-center space-x-4 gap-4 flex-wrap">
                                                        {/* File Open Button */}
                                                        {step.files ? (
                                                            <button
                                                                onClick={() => openLinkInNewTab(step.files)}
                                                                className="flex items-center bg-indigo-500 text-white hover:bg-indigo-600 py-2 px-6 border border-indigo-500 rounded-lg transition-transform duration-200 transform hover:scale-105"
                                                            >
                                                                <i className="bi bi-file-earmark-arrow-down h-5 w-5 mr-2"></i>
                                                                <span className="text-sm font-medium">فتح الملف</span>
                                                            </button>
                                                        ) : (
                                                            <p className="text-sm text-gray-500">لا يوجد ملف مرفق</p>
                                                        )}

                                                        {/* Update Button */}
                                                        {step.payment_status !== 'paid' || step.status !== 'completed' ? (
                                                            <button
                                                                onClick={() => handleUpdate(step.id)} // Assuming you have a handler for updating the data
                                                                className="flex items-center bg-green-500 text-white hover:bg-green-600 py-2 px-6 border border-green-500 rounded-lg transition-transform duration-200 transform hover:scale-105"
                                                            >
                                                                تحديث البيانات
                                                            </button>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                {/* Card 3: step_result_text and step_result_file */}
                                                <div className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-200">
                                                    <h3 className="text-lg font-medium mb-2 text-gray-700">نتائج الخطوة</h3>
                                                    {/* Step Result Text */}
                                                    <p className="text-sm mb-2">
                                                        {step.step_result_text ? step.step_result_text : "لا توجد نتائج مرفقة"}
                                                    </p>
                                                    <div className="flex items-center space-x-4 gap-4 flex-wrap">
                                                        {/* Step Result File Button */}
                                                        {step.step_result_file ? (
                                                            <button
                                                                onClick={() => openLinkInNewTab(step.step_result_file)}
                                                                className="flex items-center bg-indigo-500 text-white hover:bg-indigo-600 py-2 px-6 border border-indigo-500 rounded-lg transition-transform duration-200 transform hover:scale-105"
                                                            >
                                                                <i className="bi bi-file-earmark-arrow-down h-5 w-5 mr-2"></i>
                                                                <span className="text-sm font-medium">فتح النتيجة</span>
                                                            </button>
                                                        ) : (
                                                            <p className="text-sm text-gray-500">لا يوجد نتيجة مرفقة</p>
                                                        )}
                                                        {/* Update Button */}
                                                        {step.payment_status !== 'paid' || step.status !== 'completed' ? (
                                                            <button
                                                                onClick={() => handleUpdate(step.id)} // Assuming you have a handler for updating the data
                                                                className="flex items-center bg-green-500 text-white hover:bg-green-600 py-2 px-6 border border-green-500 rounded-lg transition-transform duration-200 transform hover:scale-105"
                                                            >
                                                                تحديث النتيجة
                                                            </button>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={() => deleteOrder(order.id)}
                                    className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 border border-blue-500 rounded-md mt-4"
                                >
                                    حذف الطلب
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </SideBar>
    );
}