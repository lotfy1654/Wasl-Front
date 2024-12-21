'use client';
import { Api_Uri } from "@/app/_api/api";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { NoContentRed } from "@/components/NoContent";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
    const [catgoryId, setcatgoryId] = useState(null);
    const [allBlogPosts, setAllBlogPosts] = useState([]);

    useEffect(() => {
        const searchId = new URLSearchParams(window.location.search);
        const id = searchId.get('id');
        setcatgoryId(id);
    }, []);

    useEffect(() => {
        if (!catgoryId) return;
        axios.get(`${Api_Uri}/blog/category/${catgoryId}`)
            .then((res) => {
                setAllBlogPosts(res.data);
            })
            .catch((err) => {
                setAllBlogPosts([]);
            });
    }, [catgoryId]);

    function formatDateToArabic(dateString) {
        const date = new Date(dateString);
        const arabicMonths = [
            "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
            "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];
        const day = date.getDate();
        const month = arabicMonths[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    return (
        <>
            <Navbar />
            <div dir="rtl">
                <section className="pb-20">
                    <div className="container mx-auto px-4">
                        <section className="pt-[140px]">
                            <div className="container">
                                <div
                                    className="wow fadeInUp rounded-lg bg-light-bg dark:bg-dark"
                                    data-wow-delay="0s"
                                    data-aos="fade-up"
                                >
                                    <div className="-mx-4 flex flex-wrap background-light pt-4 rounded border">
                                        <div className="w-full px-4 sm:w-1/2">
                                            <h1 className="mb-4 text-xl font-bold text-black dark:text-white sm:mb-0">
                                                تفاصيل القسم
                                            </h1>
                                        </div>
                                        <div className="w-full px-4 sm:w-1/2 mb-4">
                                            <ul className="flex items-center sm:justify-end">
                                                <li className="text-base font-medium text-black dark:text-white">
                                                    <a className="hover:text-primary" href="/">
                                                        الرئيسية
                                                    </a>
                                                    <span className="px-[10px]"> / </span>
                                                </li>
                                                <li className="text-base font-medium text-black dark:text-white">
                                                    تفاصيل المدونة
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="pb-24">
                            <div className="mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                                {allBlogPosts.map((resource, index) => (
                                    <article
                                        key={resource.id}
                                        className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-xl"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        <img
                                            src={resource.image}
                                            alt={resource.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <div className="flex items-center gap-x-4 text-xs text-gray-500">
                                                <time dateTime={resource.created_at}>
                                                    {formatDateToArabic(resource.created_at)}
                                                </time>
                                                <a
                                                    href={`/blog?id=${resource.id}`}
                                                    className="inline-block py-1.5 px-3 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100"
                                                >
                                                    {resource.category.name}
                                                </a>
                                            </div>
                                            <div className="group relative mt-3">
                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                                                    <a href={`/blog?id=${resource.id}`}>
                                                        {resource.title}
                                                    </a>
                                                </h3>
                                                <p className="mt-5 text-sm text-gray-600 line-clamp-3">{resource.sub_description}</p>
                                            </div>
                                            <div className="mt-8 flex items-center gap-x-4">
                                                <img alt={resource.author_name} src={resource.author_image} className="w-10 h-10 rounded-full bg-gray-50" />
                                                <div className="text-sm">
                                                    <p className="font-semibold text-gray-900">{resource.author_name}</p>
                                                    <p className="text-gray-600">{resource.author_position}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            {
                                allBlogPosts.length === 0 && (
                                    <NoContentRed
                                        title="لا توجد مقالات في هذا القسم"
                                    />
                                )
                            }
                        </section>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

