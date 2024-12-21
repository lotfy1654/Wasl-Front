// Contact us messages page for admin dashboard
'use client';
import SidebarLayout from '@/components/Admin_Components/SideBar/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Api_Uri } from '@/app/_api/api';
import showUnauthorizedAlert from '@/components/NotAuthError';
import Swal from 'sweetalert2';

export default function Page() {

    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const getToken = localStorage.getItem('wasl-token');
        if (getToken) {
            setToken(getToken);
        } else {
            showUnauthorizedAlert();
        }
    }, []);

    useEffect(() => {
        if (!token) return;
        axios.get(`${Api_Uri}/contact-us`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            setMessages(response.data);
        }).catch((error) => {
            if (error?.response?.status === 401) {
                showUnauthorizedAlert();
                return;
            }
            setMessages([]);
        });
    }, [token]);

    return (
        <>
            <SidebarLayout currentTab="messages">
                <div className="container mx-auto my-8 px-4">
                    <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">الرسائل</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">{message.name}</h3>

                                <div className="grid grid-cols-1 gap-3 mb-4">
                                    <div className="text-gray-600">
                                        <p className="text-right text-indigo-800 font-bold mb-2">البريد الإلكتروني:</p>
                                        <p className="ml-2 text-gray-600">{message.email}</p>
                                    </div>
                                    <div className="text-gray-600">
                                        <p className="text-right text-indigo-800 font-bold mb-2">رقم الهاتف:</p>
                                        <p className="ml-2 text-gray-600">{message.phone_number}</p>
                                    </div>
                                    <div className="text-gray-600">
                                        <p className="text-right text-indigo-800 font-bold mb-2">تاريخ الإرسال:</p>
                                        <p className="ml-2 text-gray-600">
                                            {new Date(message.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-4 mt-4 text-gray-700">
                                    <p className="mb-2 font-bold">الرسالة:</p>
                                    <p className="whitespace-pre-line">
                                        {
                                            message.message.length > 20
                                                ?
                                                <span
                                                    className='pointer'
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: 'الرسالة كاملة',
                                                            text: message.message,
                                                            confirmButtonText: 'حسناً',
                                                            confirmButtonColor: '#2563EB'
                                                        });
                                                    }}
                                                >
                                                    {
                                                        message.message.slice(0, 20) + '...'
                                                    }
                                                </span>
                                                :
                                                message.message
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                        {
                            messages.length === 0 && (
                                <div className="text-center text-gray-700 col-span-3">
                                    <p>لا توجد رسائل</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </SidebarLayout>
        </>
    );
}
