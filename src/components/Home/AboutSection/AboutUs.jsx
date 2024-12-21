'use client';
import Image from "next/image";
import "./style.scss";

import AboutImg from "@/image/home/about.png";
import { BsFillPeopleFill, BsFillGearFill, BsLightbulbFill } from 'react-icons/bs';
import { useEffect, useState } from "react";
import axios from "axios";
import { Api_Uri } from "@/app/_api/api";

export default function AboutUs() {

    const [dataAbout, setDataAbout] = useState([]);

    useEffect(() => {
        axios.get(`${Api_Uri}/about-us`)
            .then((response) => {
                setDataAbout(response.data);
            })
            .catch((error) => {
                setDataAbout([]);
            });
    }, []);

    return (
        <section className="about-us border-top border-bottom" >
            <div className="container">
                {
                    dataAbout.map((item, index) => {
                        return (
                            <div className="row align-items-center pt-5 pb-5" key={index}>
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 order-md-1 mb-4 mb-md-0"
                                    data-aos="fade-right">
                                    <div className="about-us__text w-100">
                                        <p className="fs-4 fw-bold mb-4 main-color" data-aos="fade-up">
                                            {item?.title}
                                        </p>
                                        <h2 className="fs-2 fw-bold mb-4 color-text-dark" data-aos="fade-up" data-aos-delay="100">
                                            {item?.sub_description}
                                        </h2>
                                        <p className="fs-5 fw-semibold m-0 color-text-light" data-aos="fade-up" data-aos-delay="200">
                                            {item?.description}
                                            {/* نحن مجموعة من المتخصصين المتفانين الذين يسعون لتقديم
                                            <strong> حلول متكاملة ودعم استثنائي</strong> لتمكينك من الانطلاق في عالم الأعمال بثقة.
                                            من خلال خبرتنا الواسعة في مختلف المجالات، نحن هنا لنقدم لك الدعم اللازم في كل خطوة
                                            على طريق تأسيس شركتك الجديدة، بدءًا من <strong>الخدمات اللوجستية</strong> إلى <strong>الدعم الإداري</strong>.
                                            <br />
                                            <strong>هدفنا هو تعزيز طموحاتك وتحقيق نجاحك.</strong> */}
                                        </p>
                                        <div className="about-us__features mt-4" data-aos="fade-up" data-aos-delay="300">
                                            {
                                                item?.items.map((feature, index) => {
                                                    return (
                                                        <div className="feature" key={index}>
                                                            <i className={`${feature?.icon} feature-icon`}></i>
                                                            <span>{feature?.text}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {/* <div className="feature">
                                                <i className="bi bi-people-fill feature-icon"></i>
                                                <span>دعم شامل ومخصص لاحتياجاتك</span>
                                            </div>
                                            <div className="feature">
                                                <i className="bi bi-gear-fill feature-icon"></i>
                                                <span>خدمات موثوقة من خبراء محترفين</span>
                                            </div>
                                            <div className="feature">
                                                <i className="bi bi-lightbulb-fill feature-icon"></i>
                                                <span>أفكار مبتكرة وحلول مبتكرة</span>
                                            </div> */}
                                        </div>
                                        <div className="about-us__buttons mt-4" data-aos="fade-up" data-aos-delay="400">
                                            <button className="btn btn-primary">
                                                <a href="#contact-us" className="text-decoration-none text-white fs-5">
                                                    تواصل معنا اليوم لنبدأ رحلتنا معًا
                                                </a>
                                            </button>
                                            <button className="btn btn-outline-secondary">
                                                <a href="#services" className="text-decoration-none fs-5 fw-semibold">
                                                    استكشف خدماتنا المتنوعة
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 order-md-0 d-xl-block d-lg-none d-md-block"
                                    data-aos="zoom-in"
                                    data-aos-delay="200"
                                >
                                    <div className="about-us__image">
                                        <img
                                            src={item?.image}
                                            alt="About Us"
                                            className="img-fluid rounded"
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section >
    );
}
