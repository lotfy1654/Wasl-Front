import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Api_Uri } from "@/app/_api/api";
import showUnauthorizedAlert from "@/components/NotAuthError";

export default function PaymentStepUpdateModal({ stepId, onClose, refreshData }) {
    const [paymentStatus, setPaymentStatus] = useState("");
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

    // Handle form submission to update payment status
    const handleSubmit = async () => {
        if (!paymentStatus) {
            Swal.fire({
                icon: "warning",
                text: "يرجى اختيار حالة الدفع",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#f59e0b";
                    }
                }
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.patch(
                `${Api_Uri}/services/orders/steps/${stepId}/update/manager-admin`,
                { payment_status: paymentStatus },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Swal.fire({
                icon: "success",
                title: "تم تحديث حالة الدفع بنجاح",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#16a34a";
                    }
                }
            });
            refreshData(); // Refresh data after success
            onClose(); // Close modal after success
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "حدث خطأ ما، يرجى المحاولة مرة أخرى",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) {
                        progressBar.style.background = "#d33";
                    }
                },
                willClose: () => {
                    onClose(); // Close modal after error
                }
            });
        } finally {
            setLoading(false);
        }
    };

    if (!stepId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" dir="rtl">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">تغيير حالة الدفع</h2>
                    <button onClick={onClose} className="text-white bg-red-500 p-1 rounded-full hover:bg-red-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700">اختر حالة الدفع</label>
                        <select
                            id="paymentStatus"
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">اختر حالة الدفع</option>
                            <option value="unpaid">غير مدفوع</option>
                            <option value="in_progress">جاري التنفيذ</option>
                            <option value="paid">مدفوع</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-100 mb-3"
                        disabled={loading}
                    >
                        {loading ? "جارٍ التحديث..." : "تحديث حالة الدفع"}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 w-100"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
}
