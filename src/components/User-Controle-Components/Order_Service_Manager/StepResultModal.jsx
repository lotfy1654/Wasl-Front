import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { Api_Uri } from "@/app/_api/api";
import showUnauthorizedAlert from "@/components/NotAuthError";

export default function StepResultModal({ stepId, onClose, refreshData }) {
    const [stepResultText, setStepResultText] = useState("");
    const [stepResultFile, setStepResultFile] = useState(null);
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

    const handleFileChange = (e) => {
        setStepResultFile(e.target.files[0]);
    };

    const handleTextChange = (e) => {
        setStepResultText(e.target.value);
    };

    const clearForm = () => {
        setStepResultText("");
        setStepResultFile(null);
    };

    const handleSubmit = async () => {
        if (!stepResultText && !stepResultFile) {
            Swal.fire({
                icon: "warning",
                text: "يرجى إدخال نص أو تحميل ملف",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) progressBar.style.background = "#ffaa2c";
                },
            });
            return;
        }
        setLoading(true);

        const formData = new FormData();
        if (stepResultText) formData.append("step_result_text", stepResultText);
        if (stepResultFile) formData.append("step_result_file", stepResultFile);

        try {
            const response = await axios.patch(
                `${Api_Uri}/services/orders/steps/${stepId}/update/manager-admin`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Swal.fire({
                icon: "success",
                text: "تم تحديث نتيجة الخطوة بنجاح",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                didOpen: () => {
                    const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                    if (progressBar) progressBar.style.background = "#16a34a";
                },
            });
            refreshData(); // Refresh data after success
            clearForm(); // Clear form after success
            onClose(); // Close modal after success
        } catch (error) {
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
        } finally {
            setLoading(false);
        }
    };

    if (!stepId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" dir="rtl">
            <div className="bg-white rounded-lg shadow-lg w-[40rem] p-6 overflow-y-auto max-h-[70vh]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">تحديث نتيجة الخطوة</h2>
                    <button onClick={onClose} className="text-white bg-red-500 p-1 rounded-full hover:bg-red-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Text Area for Step Result */}
                    <div>
                        <label htmlFor="stepResultText" className="block text-sm font-medium text-gray-700 mb-2">
                            نص نتيجة الخطوة
                        </label>
                        <textarea
                            id="stepResultText"
                            value={stepResultText}
                            onChange={handleTextChange}
                            className="mt-1 block w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="أدخل النص هنا"
                        />
                    </div>

                    {/* File Upload for Step Result */}
                    <div>
                        <label htmlFor="stepResultFile" className="block text-sm font-medium text-gray-700 mb-2">
                            تحميل ملف نتيجة الخطوة
                        </label>
                        <input
                            id="stepResultFile"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-between items-center gap-4 flex-wrap">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 md:w-50 w-full"
                        disabled={loading}
                    >
                        {loading ? "جارٍ التحديث..." : "تحديث النتيجة"}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 md:w-50 w-full"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
}
