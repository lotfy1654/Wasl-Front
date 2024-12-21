'use client';
import { Api_Uri } from "@/app/_api/api";
import showUnauthorizedAlert from "@/components/NotAuthError";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BlogAdmin = () => {
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [token, setToken] = useState('');
    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    const fectAllBlogs = async () => {
        axios.get(`${Api_Uri}/blog`)
            .then((res) => {
                setBlogs(res.data);
            })
            .catch(() => {
                setBlogs([]);
            });
    };

    const fetchCategories = async () => {
        axios.get(`${Api_Uri}/blog/categories`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch(() => {
                setCategories([]);
            });
    };

    useEffect(() => {
        fetchCategories();
        fectAllBlogs();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const handleModalOpen = (blog = null) => {
        if (blog) {
            setIsUpdateMode(true);
            setCurrentBlog(blog);
        } else {
            setIsUpdateMode(false);
            setCurrentBlog({
                author_name: "",
                author_image: "",
                author_position: "",
                category: "",
                title: "",
                sub_description: "",
                content: "",
                quote: "",
                image: "",
                answer_question: [],
            });
        }
        fetchCategories();
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSaveBlog = () => {
        const formDataBlog = new FormData();
        formDataBlog.append("author_name", currentBlog.author_name);
        if (currentBlog.author_image instanceof File) {
            formDataBlog.append("author_image", currentBlog.author_image);
        }
        formDataBlog.append("author_position", currentBlog.author_position);
        formDataBlog.append("category", currentBlog.category.id || currentBlog.category);
        formDataBlog.append("title", currentBlog.title);
        formDataBlog.append("sub_description", currentBlog.sub_description);
        formDataBlog.append("content", currentBlog.content);
        formDataBlog.append("quote", currentBlog.quote);
        if (currentBlog.image instanceof File) {
            formDataBlog.append("image", currentBlog.image);
        }
        formDataBlog.append("answer_question", JSON.stringify(currentBlog.answer_question));
        if (isUpdateMode) {
            axios.put(`${Api_Uri}/blog/update/${currentBlog.id}`, formDataBlog, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                Swal.fire({
                    icon: "success",
                    text: "تم تحديث المدونة بنجاح.",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    }
                });
                fectAllBlogs();
            }).catch((err) => {
                if (err?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: "error",
                    text: err?.response?.data?.message || err?.response?.data || "حدث خطأ ما.",
                    showConfirmButton: false,
                    showCancelButton: false,
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
            );

        } else {
            // Add new blog
            axios.post(`${Api_Uri}/blog/create`, formDataBlog, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                Swal.fire({
                    icon: "success",
                    text: "تمت إضافة المدونة بنجاح.",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                        if (progressBar) {
                            progressBar.style.background = "#16a34a";
                        }
                    }
                });
                fectAllBlogs();
            }).catch((err) => {
                if (err?.response?.status === 401) {
                    showUnauthorizedAlert();
                    return;
                }
                Swal.fire({
                    icon: "error",
                    text: err?.response?.data?.message || err?.response?.data || "حدث خطأ ما.",
                    showConfirmButton: false,
                    showCancelButton: false,
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
        }
        handleModalClose();
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...currentBlog.answer_question];
        updatedQuestions[index][field] = value;
        setCurrentBlog({ ...currentBlog, answer_question: updatedQuestions });
    };

    const handleAddQuestion = () => {
        setCurrentBlog({
            ...currentBlog,
            answer_question: [
                ...currentBlog.answer_question,
                { question: "", answer: "" },
            ],
        });
    };

    const handleDeleteBlog = (id) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "هل تريد حذف هذه المدونة؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Api_Uri}/blog/delete/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                }).then((res) => {
                    Swal.fire({
                        icon: "success",
                        text: "تم حذف المدونة بنجاح.",
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: () => {
                            const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
                            if (progressBar) {
                                progressBar.style.background = "#16a34a";
                            }
                        }
                    });
                    fectAllBlogs();
                }).catch((err) => {
                    if (err?.response?.status === 401) {
                        showUnauthorizedAlert();
                        return;
                    }
                    Swal.fire({
                        icon: "error",
                        text: err?.response?.data?.message || err?.response?.data || "حدث خطأ ما.",
                        showConfirmButton: false,
                        showCancelButton: false,
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
            }
        });
    };



    return (
        <div className="border-t border-gray-200 mt-10 pt-3">
            <div
                className="flex items-center justify-between mb-6 flex-wrap"
            >
                <h2 className="text-2xl font-bold">إدارة المدونة</h2>
                <button
                    onClick={() => handleModalOpen()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-3"
                >
                    إضافة مدونة جديدة
                </button>
            </div>

            {blogs.map((blog) => (
                <div key={blog.id} className="mb-8 p-6 border border-gray-200 rounded-lg shadow-lg">
                    {/* Blog Header with Category, Author Info */}
                    <div className="flex items-center justify-between gap-6 mb-6">
                        <div className="flex items-center gap-6">
                            <img
                                src={blog.author_image}
                                alt={blog.author_name}
                                className="w-16 h-16 rounded-full border-2 border-indigo-500"
                            />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{blog.title}</h3>
                                <p className="text-gray-500 text-sm mt-2">{blog.author_name} - {blog.author_position}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-between text-right">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 transition-colors">
                                {blog.category.name}
                            </button>
                        </div>
                    </div>
                    {/* Blog Image and Content */}
                    <div className="mt-4">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <p className="mt-4 text-gray-700">{blog.content}</p>
                    </div>

                    {/* Questions Table */}
                    <div className="mt-6">
                        <h4 className="text-xl font-semibold mb-6">الأسئلة والإجابات</h4>
                        {blog.answer_question.length === 0 ? (
                            <p className="text-gray-600">لا توجد أسئلة بعد.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                {blog.answer_question.map((item, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-bold text-blue-700 mb-2">السؤال</label>
                                                <p className="text-gray-800 text-base">{item.question}</p>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-bold text-blue-700 mb-2">الإجابة</label>
                                                <p className="text-gray-800 text-base">{item.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        className="border-t border-gray-200 py-4 flex items-center justify-start gap-4 mt-5"
                    >
                        <button
                            onClick={() => handleModalOpen(blog)}
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-3"
                        >
                            تعديل
                        </button>
                        <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="bg-red-500 text-white py-2 px-4 rounded mt-3"
                        >
                            حذف
                        </button>
                    </div>
                </div>
            ))}


            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
                    onClick={handleModalClose}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/2 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-4">
                            {isUpdateMode ? "تحديث المدونة" : "إضافة مدونة جديدة"}
                        </h2>

                        <div className="mb-4">
                            <label className="block font-bold text-blue-700 mb-2">اسم الكاتب</label>
                            <input
                                type="text"
                                value={currentBlog.author_name}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, author_name: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold text-blue-700 mb-2">وظيفة الكاتب</label>
                            <input
                                type="text"
                                value={currentBlog.author_position}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, author_position: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold text-blue-700 mb-2">التصنيف</label>
                            <select
                                value={currentBlog.category}
                                onChange={(e) =>
                                    setCurrentBlog({ ...currentBlog, category: e.target.value })
                                }
                                className="w-full border border-gray-300 p-2 rounded"
                            >
                                <option value="" disabled selected>اختر التصنيف</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold text-blue-700 mb-2">العنوان</label>
                            <input
                                type="text"
                                value={currentBlog.title}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold text-blue-700 mb-2">الوصف الفرعي</label>
                            <textarea
                                value={currentBlog.sub_description}
                                onChange={(e) =>
                                    setCurrentBlog({ ...currentBlog, sub_description: e.target.value })
                                }
                                className="w-full border border-gray-300 p-2 rounded"
                                rows="3"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold text-blue-700 mb-2">المحتوى</label>
                            <textarea
                                value={currentBlog.content}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded"
                                rows="5"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold text-blue-700 mb-2">الاقتباس</label>
                            <textarea
                                value={currentBlog.quote}
                                onChange={(e) => setCurrentBlog({ ...currentBlog, quote: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded"
                                rows="3"
                            />
                        </div>

                        <div className="mb-4">
                            <h4 className="font-semibold mb-3">الأسئلة والإجابات</h4>
                            {currentBlog.answer_question.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-wrap gap-4 mb-4 p-4 border border-gray-300 rounded-lg shadow w-full"
                                >
                                    <div className="w-full mb-2">
                                        <label className="block font-bold text-blue-700 mb-2">السؤال</label>
                                        <input
                                            type="text"
                                            value={item.question}
                                            onChange={(e) =>
                                                handleQuestionChange(index, "question", e.target.value)
                                            }
                                            placeholder="السؤال"
                                            className="w-full border border-gray-300 p-2 rounded-lg"
                                        />
                                    </div>
                                    <div className="w-full mb-2">
                                        <label className="block font-bold text-blue-700 mb-2">الإجابة</label>
                                        <input
                                            type="text"
                                            value={item.answer}
                                            onChange={(e) =>
                                                handleQuestionChange(index, "answer", e.target.value)
                                            }
                                            placeholder="الإجابة"
                                            className="w-full border border-gray-300 p-2 rounded-lg"
                                        />
                                    </div>
                                    <div className="w-full flex justify-start">
                                        <button
                                            onClick={() => handleDeleteQuestion(index)}
                                            className="text-white bg-red-500 hover:bg-red-600 py-2 px-6 rounded-lg transition-all duration-300 ease-in-out"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={handleAddQuestion}
                                className="bg-gray-300 text-black py-2 px-4 rounded mt-2"
                            >
                                إضافة سؤال
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Author Image Field */}
                            <div className="mb-4">
                                <label className="block text-lg font-semibold text-blue-800 mb-2">صورة المؤلف</label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setCurrentBlog({ ...currentBlog, author_image: e.target.files[0] })
                                    }
                                    className="w-full py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all hover:border-indigo-500"
                                />
                            </div>

                            {/* Blog Image Field */}
                            <div className="mb-4">
                                <label className="block text-lg font-semibold text-blue-800 mb-2">صورة المدونة</label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setCurrentBlog({ ...currentBlog, image: e.target.files[0] })
                                    }
                                    className="w-full py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all hover:border-indigo-500"
                                />
                            </div>
                        </div>


                        <div className="flex justify-between gap-4 space-x-4">
                            <button
                                onClick={handleSaveBlog}
                                className="bg-blue-500 text-white py-2 px-4 rounded w-1/2"
                            >
                                حفظ
                            </button>
                            <button
                                onClick={handleModalClose}
                                className="bg-red-500 text-white py-2 px-4 rounded w-1/2"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogAdmin;
