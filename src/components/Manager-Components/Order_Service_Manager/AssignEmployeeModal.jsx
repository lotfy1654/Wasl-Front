import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Api_Uri } from "@/app/_api/api";
import showUnauthorizedAlert from "@/components/NotAuthError";

export default function AssignEmployeeModal({ orderId, onClose  , refreshData}) {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    // Fetch token from localStorage
    useEffect(() => {
        const getToken = localStorage.getItem("wasl-token");
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    // Fetch employees from the API
    useEffect(() => {
        if (!token) return; // Do nothing if `token` is null
        fetchEmployees();

    }, [token, orderId]);

    const fetchEmployees = async () => {
        if (!orderId || !token) return; // Do nothing if `id` or `token` is null

        setLoading(true);
        try {
            const response = await axios.get(`${Api_Uri}/auth/employees`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                showUnauthorizedAlert();
            } else {
                Swal.fire({
                    icon: "error",
                    text: "حدث خطأ ما، يرجى المحاولة مرة أخرى",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) progressBar.style.background = "#d33";
                    },
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission to assign employee to order
    const handleSubmit = async () => {
        if (!selectedEmployee) {
            Swal.fire({
                icon: "warning",
                title: "يرجى اختيار موظف",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) progressBar.style.background = "#f7b924";
                }
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put(
                `${Api_Uri}/services/orders/assign-employee/${orderId}`,
                {
                    "employee_id": selectedEmployee
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Swal.fire({
                icon: "success",
                text: "تم تغيير الموظف بنجاح",
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });
            refreshData();
            onClose(); // Close modal after success
        } catch (error) {
            if (error.response?.status === 401) {
                showUnauthorizedAlert();
            } else {
                Swal.fire({
                    icon: "error",
                    text: "حدث خطأ ما، يرجى المحاولة مرة أخرى",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) progressBar.style.background = "#d33";
                    },
                });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!orderId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" dir="rtl">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">تغيير موظف الطلب</h2>
                    <button onClick={onClose} className="text-white bg-red-500 p-1 rounded-full hover:bg-red-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">رقم الطلب</label>
                        <input
                            id="orderId"
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={orderId}
                            disabled
                        />
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-500">جاري جلب الموظفين...</div>
                    ) : (
                        employees.length > 0 && (
                            <div>
                                <label htmlFor="employeeSelect" className="block text-sm font-medium text-gray-700 mb-2">اختر موظفاً</label>
                                <select
                                    id="employeeSelect"
                                    value={selectedEmployee}
                                    onChange={(e) => setSelectedEmployee(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">اختر موظفاً</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.user.first_name} {employee.user.last_name} ({employee.user.role})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )
                    )}
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-between gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-1/2"
                        disabled={loading}
                    >
                        {loading ? "جارٍ التحديث..." : "تغيير الموظف"}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-gray-800 w-1/2"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
}
