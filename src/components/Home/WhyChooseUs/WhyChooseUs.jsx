'use client';
import { Api_Uri } from '@/app/_api/api';
import axios from 'axios';
import { useEffect, useState } from 'react';


import { BuildingLibraryIcon, TruckIcon, UsersIcon, LightBulbIcon } from '@heroicons/react/24/solid';


export default function WhyChooseUs() {


    const [dattaWhyChooseUs, setDataWhyChooseUs] = useState([]);

    useEffect(() => {
        axios.get(`${Api_Uri}/home/why-choose-us`)
            .then((response) => {
                setDataWhyChooseUs(response.data.data);
            })
            .catch((error) => {
                setDataWhyChooseUs([]);
            });
    }, []);

    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0" dir='rtl'>
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    aria-hidden="true"
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                >
                    <defs>
                        <pattern
                            x="50%"
                            y={-1}
                            id="pattern"
                            width={200}
                            height={200}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect fill="url(#pattern)" width="100%" height="100%" strokeWidth={0} />
                </svg>
            </div>
            <div className="mx-auto max-w-7xl">
                <h2 className="text-center text-4xl font-semibold tracking-tight text-gray-900 mb-8">
                    لماذا تختارنا
                </h2>
                <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                    {dattaWhyChooseUs.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="flex flex-col items-center"
                                data-aos="fade-up"
                                data-aos-delay={index * 300} // Delay for staggered animation
                                data-aos-offset="200" // Adjusts the scroll trigger point
                            >
                                {/* <Icon className="h-16 w-16 text-indigo-600 mb-4 main-color" /> */}
                                <i className={`${feature.icon} h-16 w-16 text-indigo-600 mb-4 main-color fs-1`}>
                                </i>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-center text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
