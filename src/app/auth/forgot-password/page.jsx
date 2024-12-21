import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import ShapOne from "@/image/home/hero-shape-1.svg";
import ShapTwo from "@/image/home/hero-shape-2.svg";
import Image from 'next/image';

export default function ForgotPasswordPage() {

    return (
        <>
            <Navbar />
            <section dir="rtl" className="relative z-10 pt-[130px] mb-5 overflow-hidden">
                <div className="background-blue"></div>
                <Image
                    alt="shape"
                    loading="lazy"
                    width="411"
                    height="276"
                    decoding="async"
                    className="absolute left-0 top-0 -z-10"
                    src={ShapOne}
                    style={{ color: "transparent" }}
                />
                <Image
                    alt="shape"
                    loading="lazy"
                    width="820"
                    height="692"
                    decoding="async"
                    className="absolute right-0 top-0 -z-10"
                    src={ShapTwo}
                    style={{ color: "transparent" }}
                />
                <div className="container">
                    <div className="mx-[-16px] flex flex-wrap" data-aos="fade-up">
                        <div className="w-full px-4">
                            <div>
                                <div className="wow fadeInUp mx-auto max-w-[500px] rounded-md border border-[#f5f5f5] bg-white p-4 md:p-12 lg:p-12 dark:border-0 dark:bg-dark sm:p-[60px]">
                                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                        استرجاع كلمة المرور
                                    </h3>
                                    <p className="mb-11 text-center text-base font-medium text-body-color">
                                        أدخل بريدك الإلكتروني لاسترجاع كلمة المرور الخاصة بك.
                                    </p>
                                    <form>
                                        <div className="mb-8" data-aos="fade-up">
                                            <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                بريدك الإلكتروني
                                            </label>
                                            <input
                                                placeholder="أدخل بريدك الإلكتروني"
                                                required
                                                className="shadow-one dark:shadow-signUp w-full rounded-2 border border-body-color border-opacity-50 bg-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-opacity-30 dark:bg-[#1F2656]"
                                                type="email"
                                                name="email"
                                                data-aos="fade-up"
                                            />
                                        </div>
                                        <div data-aos="fade-up">
                                            <button
                                                aria-label="send password recovery link"
                                                className="hover:shadow-signUp flex w-full items-center justify-center rounded-2 bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80"
                                            >
                                                إرسال رابط استرجاع
                                            </button>
                                        </div>
                                    </form>
                                    <p className="mt-4 fs-6 text-center text-sm font-medium text-body-color">
                                        تذكرت كلمة المرور؟
                                        <a href="/auth/signin" className="text-primary hover:underline pe-2">
                                            تسجيل الدخول
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
