import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

import Shap from "@/image/home/footer-shape-2.svg";
import Image from 'next/image';

export default function Page() {
    return (
        <>
            <Navbar />
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
                                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                                width={200}
                                height={200}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
                    </svg>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base/7 font-semibold text-indigo-600">الشروط والأحكام</p>
                                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    مرحبًا بك في خدمتنا
                                </h1>
                                <p className="mt-6 text-xl/8 text-gray-700">
                                    توضح هذه الشروط والأحكام القواعد واللوائح لاستخدام خدمتنا.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img
                            alt=""
                            src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
                            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        />
                    </div>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">1. قبول الشروط</h2>
                                <p>
                                    باستخدام خدمتنا، فإنك توافق على هذه الشروط والأحكام بالكامل. إذا كنت تعارض أي جزء من هذه الشروط، يجب عليك عدم استخدام خدمتنا.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. التعديلات</h2>
                                <p>
                                    نحتفظ بالحق في تعديل هذه الشروط في أي وقت. إن استمرارك في استخدام الخدمة بعد أي تغييرات من هذا القبيل سيشكل قبولك للشروط الجديدة.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">3. مسؤوليات المستخدمين</h2>
                                <p>
                                    يتحمل المستخدمون مسؤولية الحفاظ على سرية حساباتهم وكلمات مرورهم. توافق على قبول المسؤولية عن جميع الأنشطة التي تحدث تحت حسابك.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">4. تحديد المسؤولية</h2>
                                <p>
                                    لا تكون خدمتنا مسؤولة عن أي أضرار غير مباشرة أو عرضية أو تبعية تنشأ عن استخدام أو عدم القدرة على استخدام الخدمة.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">5. القانون المعمول به</h2>
                                <p>
                                    تخضع هذه الشروط وتفسر وفقًا لقوانين الولاية القضائية التي نعمل بها.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">معلومات الاتصال</h2>
                                <p>
                                    إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على support@example.com.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
