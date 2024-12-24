'use client';

import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/User-Controle-Components/SideBar/Sidebar';
import { FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';
import { Api_Uri } from '@/app/_api/api';
import showUnauthorizedAlert from '@/components/NotAuthError';
import Swal from 'sweetalert2';
import UserDetailsOrder from '@/components/User-Controle-Components/Order_Service_Manager/UserDetails';
// import EmployeeDetailsOrder from '@/components/User-Controle-Components/Order_Service_Manager/EmployeeDetails';
// import AssignEmployeeModal from '@/components/User-Controle-Components/Order_Service_Manager/AssignEmployeeModal';
// import OrderStatusUpdateModal from '@/components/User-Controle-Components/Order_Service_Manager/StatusUpdateModal';
// import PaymentStepUpdateModal from '@/components/User-Controle-Components/Order_Service_Manager/PaymentStepUpdateModal';
// import StepStatusUpdateModal from '@/components/User-Controle-Components/Order_Service_Manager/StepStatusUpdateModal';
// import RequirementsFromEmployeeModal from '@/components/User-Controle-Components/Order_Service_Manager/RequirementsFromEmployeeModal';
import UserUploadDataModal from '@/components/User-Controle-Components/Order_Service_Manager/UserUploadDataModal';
// import StepResultModal from '@/components/User-Controle-Components/Order_Service_Manager/StepResultModal';

export default function Page() {
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [expandedStep, setExpandedStep] = useState(null);
    const [token, setToken] = useState(null);
    const [orderData, setOrderData] = useState([]); // Initial state for order data
    const [steps, setSteps] = useState(orderData.flatMap(order => order.steps)); // Initial state for steps
    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, [])

    const fetchOrders = async () => {
        axios.get(`${Api_Uri}/services/orders/my-orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((response) => {
            setOrderData(response.data);
            setSteps(response.data.flatMap(order => order.steps));
        }).catch((error) => {
            if (error.response.status === 401) {
                showUnauthorizedAlert();
            } else {
                setOrderData([]);
                setSteps([]);
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ ما!',
                    text: 'حدث خطأ ما أثناء جلب البيانات. الرجاء المحاولة مرة أخرى.',
                    confirmButtonText: 'حسناً'
                });
            }
        })
    };

    useEffect(() => {
        if (!token) return;
        fetchOrders();
    }, [token])

    const toggleServiceAccordion = (orderId) => {
        setExpandedOrder(orderId === expandedOrder ? null : orderId);
    };

    const toggleStepAccordion = (stepId) => {
        setExpandedStep(stepId === expandedStep ? null : stepId);
    };

    const openLinkInNewTab = (url) => {
        window.open(url, '_blank');
    };

    // ----------Let's assume the following functions are defined somewhere in your code----------
    // Status To refresh Fetch Data
    const refreshData = () => {
        fetchOrders();
    }

    //! Show User Details Modal
    const [showModalUserDetailsId, setShowModalUserDetailsId] = useState(null);
    //! Show Employee Details Modal
    // const [showModalEmployeeDetailsId, setShowModalEmployeeDetailsId] = useState(null);
    //! Update Order Employee
    // const [orderIDforAssignOtherEmployee, setOrderIDforAssignOtherEmployee] = useState(null);
    //! Update Order Status
    // const [orderIDforUpdateStatus, setOrderIDforUpdateStatus] = useState(null);
    //! Update Payment Step Status
    // const [stepIdforUpdatePaymentStatus, setStepIdforUpdatePaymentStatus] = useState(null);
    //! Update Step Status
    // const [idStepForUpdateMainStatus, setIdStepForUpdateMainStatus] = useState(null)
    //! Update Requirements From Employee
    // const [stepIdForUpdateRequirements, setStepIdForUpdateRequirements] = useState(null);
    //! Update User Data To Send To Employee
    const [dataReqUser, setDataReqUser] = useState('');
    //! Step Result Update
    // const [setpIdForUpdateResult, setStepIdForUpdateResult] = useState(null);

    return (
        <>
            <SidebarLayout currentTab={"orders"}>
                <div className="sm:mt-9 md:mt-9 lg:mt-0">
                    <div className="flex justify-between items-start mb-6 flex-col md:flex-row md:items-center">
                        {/* Title */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                            طلباتي
                        </h1>

                        {/* Reload Button */}
                        <button
                            onClick={fetchOrders}
                            className="px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white text-lg font-medium rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
                        >
                            إعادة تحميل البيانات
                        </button>
                    </div>
                    {orderData.map(order => (
                        <div key={order.id} className="mb-4 bg-white text-gray-900 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                            <button
                                onClick={() => toggleServiceAccordion(order.id)}
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
                                    <span>{expandedOrder === order.service.id ? "▲" : "▼"}</span>
                                </div>

                            </button>

                            {expandedOrder === order.id && (
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
                                                        onClick={() => setShowModalUserDetailsId(order.user.id)}
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
                                                {order.assigned_employee
                                                    ?
                                                    <div className="flex justify-between items-center flex-wrap gap-4">
                                                        <p className="text-gray-700">
                                                            {order.assigned_employee.user.first_name} {order.assigned_employee.user.last_name}
                                                        </p>
                                                        {/* <button
                                                            onClick={() => setShowModalEmployeeDetailsId(order.assigned_employee.id)}
                                                            className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                                                        >
                                                            عرض التفاصيل
                                                        </button> */}
                                                    </div>
                                                    :
                                                    <p className="text-gray-500">لم يتم تعيين موظف بعد</p>
                                                }
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
                                                            ? "قيد الانتظار"
                                                            : step.status === "in_progress"
                                                                ? "قيد التنفيذ"
                                                                : "مكتمل"
                                                        }
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
                                                                <p className={`${step.status === 'pending' ? 'text-yellow-600' : step.status === 'in_progress' ? 'text-blue-600' : step.status === 'completed' ? 'text-green-600' : 'text-gray-600'}`}>
                                                                    {
                                                                        step.status === 'pending' ? 'قيد الانتظار'
                                                                            :
                                                                            step.status === 'in_progress' ? 'قيد التنفيذ'
                                                                                :
                                                                                step.status === 'completed' ? 'مكتمل'
                                                                                    :
                                                                                    'غير محدد'
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-gray-700 font-semibold">حالة الدفع:</h4>
                                                                <p className={`${step.payment_status === 'unpaid' ? 'text-red-600' : step.payment_status === 'paid' ? 'text-green-600' : step.payment_status === 'in_progress' ? 'text-blue-600' : 'text-gray-600'}`}>
                                                                    {
                                                                        step.payment_status === 'unpaid' ? 'غير مدفوع'
                                                                            :
                                                                            step.payment_status === 'paid' ? 'مدفوع'
                                                                                :
                                                                                step.payment_status === 'in_progress' ? 'قيد التنفيذ'
                                                                                    :
                                                                                    'غير محدد'
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                                            <div>
                                                                <h4 className="text-gray-700 font-semibold">سعر الخطوة:</h4>
                                                                <p className="text-sm text-gray-800">{step.step_price}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-gray-700 font-semibold">وصف الخطوة:</h4>
                                                                <p className="text-sm text-gray-800">{step.step_description}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Check if payment is paid and status is complete */}
                                                    {/* {order.status !== 'completed' && (
                                                        <div className="flex justify-between mt-4">
                                                            {step.payment_status != 'paid'
                                                                ? (
                                                                    <button
                                                                        onClick={() => setStepIdforUpdatePaymentStatus(step.id)}
                                                                        className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 border border-blue-500 rounded-md"
                                                                    >
                                                                        تحديث حالة الدفع
                                                                    </button>

                                                                ) : null}
                                                            {step.status != 'completed'
                                                                ? (

                                                                    <button
                                                                        onClick={() => setIdStepForUpdateMainStatus(step.id)}
                                                                        className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 border border-green-500 rounded-md"
                                                                    >
                                                                        تحديث الحالة
                                                                    </button>
                                                                ) : null}
                                                        </div>
                                                    )} */}


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

                                                            {/* {
                                                                order.status != 'completed' && (
                                                                    <>
                                                                        {step.payment_status !== 'paid' || step.status !== 'completed'
                                                                            ? (
                                                                                <button
                                                                                    onClick={() => setStepIdForUpdateRequirements(step.id)}
                                                                                    className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md transition-colors duration-200"
                                                                                >
                                                                                    تحديث المتطلبات
                                                                                </button>
                                                                            ) : null}
                                                                    </>
                                                                )
                                                            } */}
                                                        </div>
                                                    </div>

                                                    {/* Card 2: data_req_user and data_user_file_upload */}
                                                    <div className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-200">
                                                        <h3 className="text-lg font-medium mb-2 text-gray-700">بيانات من المستخدم</h3>

                                                        {/* User Data */}
                                                        <p className="text-sm mb-2">
                                                            {step.data_req_user ? step.data_req_user : "لا توجد بيانات مرفقة"}
                                                        </p>

                                                        <div className="flex items-center space-x-4 gap-4 flex-wrap">
                                                            {/* File Open Button */}
                                                            {step.data_user_file_upload ? (
                                                                <button
                                                                    onClick={() => openLinkInNewTab(step.data_user_file_upload)}
                                                                    className="flex items-center bg-indigo-500 text-white hover:bg-indigo-600 py-2 px-6 border border-indigo-500 rounded-lg transition-transform duration-200 transform hover:scale-105"
                                                                >
                                                                    <i className="bi bi-file-earmark-arrow-down h-5 w-5 mr-2"></i>
                                                                    <span className="text-sm font-medium">فتح الملف</span>
                                                                </button>
                                                            ) : (
                                                                <p className="text-sm text-gray-500">لا يوجد ملف مرفق</p>
                                                            )}

                                                            {/* Update Button */}
                                                            {
                                                                order.status != 'completed' && (
                                                                    <>
                                                                        {step.payment_status !== 'paid' || step.status !== 'completed' ? (
                                                                            <button
                                                                                onClick={() => setDataReqUser(step.id)}
                                                                                className="flex items-center bg-green-500 text-white hover:bg-green-600 py-2 px-6 border border-green-500 rounded-lg transition-transform duration-200 transform hover:scale-105"
                                                                            >
                                                                                تحديث البيانات
                                                                            </button>
                                                                        ) : null}
                                                                    </>
                                                                )
                                                            }
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
                                                            {/* {
                                                                order.status != 'completed' && (
                                                                    <>
                                                                        {step.payment_status !== 'paid' || step.status !== 'completed' ? (
                                                                            <button
                                                                                onClick={() => setStepIdForUpdateResult(step.id)}
                                                                                className="flex items-center bg-green-500 text-white hover:bg-green-600 py-2 px-6 border border-green-500 rounded-lg transition-transform duration-200 transform hover:scale-105"
                                                                            >
                                                                                تحديث النتيجة
                                                                            </button>
                                                                        ) : null}
                                                                    </>
                                                                )
                                                            } */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {orderData.length === 0 && (
                        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-6">
                            {/* Illustration */}
                            <div className="mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 10h11m4 4H3m0 4h14a1 1 0 001-1v-2a1 1 0 00-1-1H3m0-4h7a1 1 0 001-1V7a1 1 0 00-1-1H3m0 0a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V7a1 1 0 00-1-1H3z"
                                    />
                                </svg>
                            </div>
                            {/* Text */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                لا توجد طلبات
                            </h3>
                            <p className="text-sm text-gray-600 text-center max-w-md">
                                يبدو أنه ليس لديك أي طلبات حالياً. يمكنك العودة لاحقاً لمراجعة الطلبات الجديدة.
                            </p>
                        </div>
                    )}

                </div>
            </SidebarLayout>

            {/* User Details Modal */}
            <UserDetailsOrder
                id={showModalUserDetailsId}
                onClose={() => setShowModalUserDetailsId(null)}
            />


            {/* <EmployeeDetailsOrder
                id={showModalEmployeeDetailsId}
                onClose={() => setShowModalEmployeeDetailsId(null)}
            /> */}

            {/* 
            <OrderStatusUpdateModal
                orderId={orderIDforUpdateStatus}
                onClose={() => setOrderIDforUpdateStatus(null)}
                refreshData={refreshData}
            /> */}

            {/* <PaymentStepUpdateModal
                stepId={stepIdforUpdatePaymentStatus}
                onClose={() => setStepIdforUpdatePaymentStatus(null)}
                refreshData={refreshData}
            /> */}

            {/* <StepStatusUpdateModal
                stepId={idStepForUpdateMainStatus}
                onClose={() => setIdStepForUpdateMainStatus(null)}
                refreshData={refreshData}
            /> */}

            {/* <RequirementsFromEmployeeModal
                stepId={stepIdForUpdateRequirements}
                onClose={() => setStepIdForUpdateRequirements(null)}
                refreshData={refreshData}
            /> */}

            <UserUploadDataModal
                stepid={dataReqUser}
                onClose={() => setDataReqUser(null)}
                refreshData={refreshData}
            />

            {/* <StepResultModal
                stepId={setpIdForUpdateResult}
                onClose={() => setStepIdForUpdateResult(null)}
                refreshData={refreshData}
            /> */}
        </>
    );
}