'use client';
// Footer.js
import { Api_Uri } from '@/app/_api/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

const Footer = () => {

    const [socialMedia, setSocialMedia] = useState([]);

    useEffect(() => {
        axios.get(`${Api_Uri}/home/social-media`)
            .then(res => {
                setSocialMedia(res.data);
            })
            .catch(err => {
                setSocialMedia([]);
            });
    }, []);


    return (
        <footer dir="rtl" className="relative z-10 py-8 border-t border-gray-300 bg-light">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                <div className="flex flex-wrap items-center justify-center flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between">
                    <div>
                        <p className="text-custom-sm">© 2025 Wasl. جميع الحقوق محفوظة</p>
                    </div>
                    <div>
                        <ul className="flex flex-wrap items-center gap-2.5">
                            <li>
                                <a href="privacy-policy.html" className="group leading-none flex text-custom-sm ease-in duration-200 hover:text-dark">
                                    <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-right-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                                        الخصوصية
                                    </span>
                                </a>
                            </li>
                            <li>
                                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                            </li>
                            <li>
                                <a href="terms.html" className="group leading-none flex text-custom-sm ease-in duration-200 hover:text-dark">
                                    <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-right-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                                        الشروط
                                    </span>
                                </a>
                            </li>
                            <li>
                                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                            </li>
                            <li>
                                <a href="contact.html" className="group leading-none flex text-custom-sm ease-in duration-200 hover:text-dark">
                                    <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-right-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                                        اتصل بنا
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center gap-3">
                            <p className="font-medium text-custom-sm text-dark">تابعونا:</p>
                            <div className="flex items-center gap-1.5">
                                {
                                    socialMedia.map((item, index) => (
                                        <a key={index} href={item.link} aria-label={item.name} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition duration-300 hover:text-dark">
                                            {/* <img src={item.icon} alt={item.name} className="w-6 h-6" /> */}
                                            <i className={item.icon_social}
                                                style={{ fontSize: '1.5rem', color: item.icon_color }}
                                            ></i>
                                        </a>
                                    ))
                                }
                            </div>
                            {/* <div className="flex items-center gap-1.5">
                                <a href="#" aria-label="facebook social link" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition duration-300 hover:text-dark">
                                    <FaFacebookF className="text-blue-600 text-2xl" />
                                </a>
                                <a href="#" aria-label="twitter social link" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition duration-300 hover:text-dark">
                                    <FaTwitter className="text-blue-400 text-2xl" />
                                </a>
                                <a href="#" aria-label="linkedin social link" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition duration-300 hover:text-dark">
                                    <FaLinkedinIn className="text-blue-700 text-2xl" />
                                </a>
                                <a href="#" aria-label="pinterest social link" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition duration-300 hover:text-dark">
                                    <FaPinterestP className="text-red-600 text-2xl" />
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
