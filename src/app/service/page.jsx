import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { FaLaptopCode, FaPaintBrush, FaMobileAlt } from 'react-icons/fa'; // Import icons
import Shap from "@/image/home/sale-shape.svg";
import Image from 'next/image';
import ShapTwo from "@/image/home/testimonial-shape.svg";

export default function Page() {

    return (
        <>
            <Navbar />
            <section className="relative z-10 overflow-hidden bg-white pb-[50px] pt-[150px]" dir="rtl">
                <div className="container">
                    <div className="mx-[-16px] flex flex-wrap items-center">
                        <div className="w-full px-4 md:w-8/12 lg:w-7/12" data-aos="fade-right" data-aos-duration="1000">
                            <div className="mb-12 max-w-[570px]">
                                <h1 className="mb-5 text-2xl font-bold color-text-dark sm:text-3xl">تفاصيل الخدمة</h1>
                                <p className="text-base font-medium leading-relaxed color-text-light">
                                    نقدم لك مجموعة متنوعة من الحلول والخدمات التي تهدف إلى تحسين تجربة عملائك.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-4/12 lg:w-5/12" data-aos="fade-left" data-aos-duration="1000">
                            <div className="text-end">
                                <ul className="flex items-center md:justify-end">
                                    <li className="flex items-center">
                                        <a className="pr-1 text-base font-medium color-text-light hover:text-primary" href="/">الصفحة الرئيسية</a>
                                        <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                                    </li>
                                    <li className="text-base font-medium text-primary">تفاصيل الخدمة</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SVG Shapes */}
                <span className="absolute right-0 top-0 z-[-1]">
                    {/* SVG content here */}
                </span>
                <span className="absolute bottom-0 left-0 z-[-1]">
                    {/* SVG content here */}
                </span>
            </section>

            <section className="pb-20 pt-[90px] overflow-hidden background-light" dir="rtl">
                <div className="container">
                    <div className="-mx-5 flex flex-wrap">
                        <div className="w-full px-5 lg:w-4/12 position-relative">
                            <div className="space-y-10">
                                <div data-aos="fade-up" data-aos-duration="1000">
                                    <h3 className="mb-[22px] text-[34px] font-bold color-text-dark">الخدمات</h3>
                                    <div className="border-stroke rounded-sm border">
                                        <a className="border-stroke flex w-full items-center gap-3 border-b px-5 py-4 text-lg font-medium duration-200 last-of-type:border-0 color-text-dark hover:text-primary" href="/service/website-development">
                                            <FaLaptopCode size={22} className="text-primary" />
                                            تطوير المواقع
                                        </a>
                                        <a className="border-stroke flex w-full items-center gap-3 border-b px-5 py-4 text-lg font-medium duration-200 last-of-type:border-0 text-primary" href="/service/graphic-design">
                                            <FaPaintBrush size={22} className="text-primary" />
                                            التصميم الجرافيكي
                                        </a>
                                        <a className="border-stroke flex w-full items-center gap-3 border-b px-5 py-4 text-lg font-medium duration-200 last-of-type:border-0 color-text-dark hover:text-primary" href="/service/app-development">
                                            <FaMobileAlt size={22} className="text-primary" />
                                            تطوير التطبيقات
                                        </a>
                                    </div>
                                </div>
                                <div className="bg-primary px-7 py-10 text-center" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="mx-auto w-full max-w-[215px]">
                                        <h3 className="mb-5 text-2xl font-bold text-white">دعونا نتحدث</h3>
                                        <p className="mb-1.5 text-white">(+550) 647 876 093</p>
                                        <p className="mb-9 text-white">support@company.com</p>
                                        <button className="flex h-12 w-full items-center justify-center rounded-full bg-white text-center font-medium color-text-dark">
                                            احصل على مكالمة
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-5 lg:w-8/12 position-relative">
                            <div className="absolute -bottom-40 left-0 h-100 opacity-10">
                                <Image alt="shape" loading="lazy" width="435" height="959" decoding="async" src={Shap} />
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <div className="relative mb-8 aspect-[34/20] rounded-sm bg-stone-100 w-100 h-[400px] overflow-hidden ml-auto">
                                    <img
                                        alt="image"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full object-cover object-center"
                                        sizes="100vw"
                                        src="https://agency.demo.nextjstemplates.com/_next/image?url=%2Fimages%2Fservices%2Fservice-02.jpg&w=1920&q=75"
                                    />
                                </div>

                                <h1 className="mb-7 text-2xl font-bold color-text-dark sm:text-4xl lg:text-3xl">التصميم الجرافيكي</h1>
                                <p className="mb-8 text-base color-text-light sm:text-lg lg:text-base xl:text-lg">
                                    نحن نؤمن بأن التصميم الجرافيكي هو أحد الأدوات الفعالة في نقل رسائل شركتك وخلق انطباع قوي لدى العملاء.
                                    نقدم حلول تصميم فريدة تشمل الشعارات، البوسترات، الهويات البصرية، وغيرها من التصاميم التي تعكس جوهر رؤيتك.
                                    كل تصميم نبتكره يعكس هوية العلامة التجارية بشكل يعزز التواصل مع جمهورك المستهدف.
                                </p>
                                <ul className="list mb-7 list-inside list-disc bg-white bg-opacity-80 p-3 rounded relative"
                                    data-aos="fade-up"
                                >
                                    <div className="absolute left-0 top-0 transform -rotate-180">
                                        <Image
                                            alt="shape"
                                            loading="lazy"
                                            width="254"
                                            height="182"
                                            decoding="async"
                                            data-nimg="1"
                                            src={ShapTwo}
                                            style={{ color: 'transparent' }}
                                        />
                                    </div>
                                    <h4 className="mb-8 text-xl font-bold color-text-dark sm:text-2xl lg:text-xl xl:text-2xl">
                                        <span className="text-primary">01.</span> حلول التسويق
                                    </h4>
                                    <li className="mb-3 text-base sm:text-lg lg:text-base xl:text-lg">
                                        <span className="color-text-light"> تخصيص الحلول التسويقية بما يتناسب مع احتياجات العميل. </span>
                                    </li>
                                    <li className="mb-3 text-base sm:text-lg lg:text-base xl:text-lg">
                                        <span className="color-text-light"> تطوير استراتيجيات التسويق عبر الإنترنت لتوسيع دائرة العملاء. </span>
                                    </li>
                                </ul>
                                <ul className="list mb-7 list-inside list-disc bg-white bg-opacity-80 p-3 rounded relative"
                                    data-aos="fade-up"
                                >
                                    <div className="absolute left-0 top-0 transform -rotate-180">
                                        <Image
                                            alt="shape"
                                            loading="lazy"
                                            width="254"
                                            height="182"
                                            decoding="async"
                                            data-nimg="1"
                                            src={ShapTwo}
                                            style={{ color: 'transparent' }}
                                        />
                                    </div>
                                    <h4 className="mb-8 text-xl font-bold color-text-dark sm:text-2xl lg:text-xl xl:text-2xl">
                                        <span className="text-primary">02.</span> تصميم الهوية البصرية
                                    </h4>
                                    <li className="mb-3 text-base sm:text-lg lg:text-base xl:text-lg">
                                        <span className="color-text-light"> تصميم الشعارات والهوية التجارية المميزة. </span>
                                    </li>
                                    <li className="mb-3 text-base sm:text-lg lg:text-base xl:text-lg">
                                        <span className="color-text-light"> توفير حلول مبتكرة في مجال التصميم.</span>
                                    </li>
                                </ul>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
