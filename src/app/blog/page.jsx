import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const blogPosts = [
    {
        id: 1,
        title: "لابوريس نيسي أليكويب ديوم إكسيوليوم كومو...",
        date: "21 أغسطس 2024",
        imageUrl: "https://placehold.co/600x400",
        link: "/blog/laboris-nisi-aliquip-dium-exiuliym-commo-cons",
    },
    {
        id: 2,
        title: "مثال آخر على المشاركة...",
        date: "22 أغسطس 2024",
        imageUrl: "https://placehold.co/600x400",
        link: "/blog/example-another-post",
    },
];


export default function Page() {
    return (
        <>
            <Navbar />
            <div dir="rtl">
                <section className="pb-20">
                    <div className="container">
                        <section className="pb-24 pt-[140px]">
                            <div className="container">
                                <div
                                    className="wow fadeInUp rounded-lg bg-light-bg px-6 dark:bg-dark sm:px-8"
                                    data-wow-delay="0s"
                                    data-aos="fade-up"
                                >
                                    <div className="-mx-4 flex flex-wrap background-light pt-4 rounded border">
                                        <div className="w-full px-4 sm:w-1/2">
                                            <h1 className="mb-4 text-xl font-bold text-black dark:text-white sm:mb-0">
                                                تفاصيل المدونة
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
                        <div className="row">
                            <div className="col-lg-3 col-md-12"
                                data-aos="fade-up"
                            >
                                <div className="background-light p-3 rounded border shadow-sm">
                                    <h3 className="fs-6 color-text-dark fw-bold mb-3 border-bottom border-body-color pb-3">
                                        المشاركات ذات الصلة
                                    </h3>
                                    <ul>
                                        {blogPosts.map((post) => (
                                            <li key={post.id} className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                                                <div className="flex items-center lg:block xl:flex">
                                                    <div className="relative h-[75px] w-full max-w-[85px] overflow-hidden rounded-md lg:mb-1 xl:mb-0">
                                                        <img
                                                            alt="blog"
                                                            loading="lazy"
                                                            object-fit="cover"
                                                            decoding="async"
                                                            className="w-full object-cover"
                                                            src={post.imageUrl}
                                                            sizes="100vw"
                                                        />
                                                    </div>
                                                    <div className="w-full lg:mb-2">
                                                        <h5>
                                                            <a className="mb-[6px] block text-base font-medium leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary me-2" href={post.link}>
                                                                {post.title}
                                                            </a>
                                                        </h5>
                                                        <a className="text-xs font-medium text-body-color-2 me-2" href={post.link}>
                                                            {post.date}
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div class="background-light rounded mt-3 border shadow-sm">
                                    <h3 class="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">الفئة الشائعة</h3>
                                    <ul class="px-8 py-6">
                                        <li>
                                            <a class="mb-3 inline-block text-base font-medium text-body-color-2 hover:text-primary dark:text-body-color dark:hover:text-primary" href="/blog/categories/design">تصميم</a>
                                        </li>
                                        <li>
                                            <a class="mb-3 inline-block text-base font-medium text-body-color-2 hover:text-primary dark:text-body-color dark:hover:text-primary" href="/blog/categories/crypto">تشفير</a>
                                        </li>
                                        <li>
                                            <a class="mb-3 inline-block text-base font-medium text-body-color-2 hover:text-primary dark:text-body-color dark:hover:text-primary" href="/blog/categories/developement">تطوير</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Main Content Section */}
                            <div className="col-lg-9 col-md-12 position-relative"
                                data-aos="fade-up"
                            >
                                <div className="absolute inset-0 -z-10 overflow-hidden opacity-50">
                                    <svg aria-hidden="true" className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
                                        <defs>
                                            <pattern x="50%" y={-1} id="pattern" width={200} height={200} patternUnits="userSpaceOnUse">
                                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                                            </pattern>
                                        </defs>
                                        <rect fill="url(#pattern)" width="100%" height="100%" strokeWidth={0} />
                                    </svg>
                                </div>
                                <div className="blog-header mb-10">
                                    <h2 className="wow fadeInUp mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight" data-wow-delay="0s">
                                        النفقات كمادة أصرت على البناء
                                    </h2>
                                    <div className="wow fadeInUp mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10" data-wow-delay="0s">
                                        <div className="flex flex-wrap items-center">
                                            <div className="mb-2 flex items-center">
                                                <a className="mr-3 flex items-center text-body-color-2 dark:text-body-color" href="/blog/author/juhan-ahamed">
                                                    <span className="pr-2 text-dark dark:text-white">
                                                        <svg width="22" height="22" viewBox="0 0 22 22" className="fill-current">
                                                            <path d="M11.0001 3.66675C11.9725 3.66675 12.9052 4.05306 13.5928 4.74069C14.2804 5.42832 14.6667 6.36095 14.6667 7.33341C14.6667 8.30587 14.2804 9.2385 13.5928 9.92614C12.9052 10.6138 11.9725 11.0001 11.0001 11.0001C10.0276 11.0001 9.09499 10.6138 8.40736 9.92614C7.71972 9.2385 7.33341 8.30587 7.33341 7.33341C7.33341 6.36095 7.71972 5.42832 8.40736 4.74069C9.09499 4.05306 10.0276 3.66675 11.0001 3.66675ZM11.0001 12.8334C15.0517 12.8334 18.3334 14.4742 18.3334 16.5001V18.3334H3.66675V16.5001C3.66675 14.4742 6.94841 12.8334 11.0001 12.8334Z"></path>
                                                        </svg>
                                                    </span>
                                                    بقلم جيوان أحمد
                                                </a>
                                                <a className="flex items-center text-body-color-2 dark:text-body-color" href="/blog/author/juhan-ahamed">
                                                    <span className="pr-2 text-dark dark:text-white">
                                                        <svg width="21" height="21" viewBox="0 0 21 21" className="fill-current">
                                                            <path d="M6.125 10.5H7.875V12.25H6.125V10.5ZM18.375 5.25V17.5C18.375 17.9641 18.1906 18.4092 17.8624 18.7374C17.5342 19.0656 17.0891 19.25 16.625 19.25H4.375C3.40375 19.25 2.625 18.4625 2.625 17.5V5.25C2.625 4.78587 2.80937 4.34075 3.13756 4.01256C3.46575 3.68437 3.91087 3.5 4.375 3.5H5.25V1.75H7V3.5H14V1.75H15.75V3.5H16.625C17.0891 3.5 17.5342 3.68437 17.8624 4.01256C18.1906 4.34075 18.375 4.78587 18.375 5.25ZM4.375 7H16.625V5.25H4.375V7ZM16.625 17.5V8.75H4.375V17.5H16.625ZM13.125 12.25V10.5H14.875V12.25H13.125ZM9.625 12.25V10.5H11.375V12.25H9.625ZM6.125 14H7.875V15.75H6.125V14ZM13.125 15.75V14H14.875V15.75H13.125ZM9.625 15.75V14H11.375V15.75H9.625Z"></path>
                                                        </svg>
                                                    </span>
                                                    21 أغسطس 2024
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="blog-details">
                                    <p className="text-lg mb-5">
                                        النفقات تمثل جزءًا أساسيًا من إدارة المشاريع. إن فهم كيفية مراقبة وتخطيط النفقات يمكن أن يؤدي إلى نتائج مالية أفضل. من المهم دائمًا أن يكون لديك خطة واضحة لكيفية إدارة الموارد المالية.
                                    </p>
                                    <p className="text-lg mb-5">
                                        تعتبر النفقات جزءًا لا يتجزأ من عملية صنع القرار. يساعد تخطيط النفقات الشركات على تحديد مجالات التحسين والفرص المتاحة. من خلال تحليل النفقات، يمكن للشركات اتخاذ قرارات مستنيرة حول كيفية استخدام مواردها بشكل أفضل.
                                    </p>
                                    <blockquote className="bg-blue-100 p-6 border-l-4 border-blue-500 italic text-right text-lg font-medium my-10 rounded-lg">
                                        “إن الفهم العميق لإدارة النفقات يمكن أن يغير الطريقة التي تعمل بها الشركات، ويساعدها على النمو بشكل مستدام. الفشل في إدارة النفقات يمكن أن يؤدي إلى عواقب وخيمة.”
                                        <br />
                                        نيمور رحمان - مصمم منتجات
                                    </blockquote>
                                    <div className="my-10 overflow-hidden">
                                        <img alt="blog image" className="w-50 h-auto rounded-lg" src="https://crypto.demo.nextjstemplates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fd33zuypx%2Fproduction%2Fa1a9953626f4825024108e8199395a3aab2a8930-860x480.png%3Ffit%3Dmax%26auto%3Dformat&w=1080&q=75" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">كيف يمكن أن تؤثر النفقات على الأعمال؟</h3>
                                    <p className="text-lg mb-5">
                                        تؤثر النفقات بشكل مباشر على الربحية والأداء العام للأعمال. من خلال إدارة النفقات بفعالية، يمكن للشركات تحسين هوامش الربح وزيادة العوائد.
                                    </p>
                                    <p className="text-lg mb-5">
                                        يعد تتبع النفقات جزءًا مهمًا من عملية الإدارة المالية. يتيح لك فهم الأنماط والاتجاهات في نفقاتك، مما يساعد في التخطيط للمستقبل.
                                    </p>
                                    <h3 className="text-2xl font-semibold mt-8 mb-3">استراتيجيات لتقليل النفقات</h3>
                                    <p className="text-lg mb-5">
                                        تشمل بعض الاستراتيجيات التي يمكن استخدامها لتقليل النفقات: مراجعة العقود، وتحسين العمليات، واستخدام التكنولوجيا للتقليل من التكاليف.
                                    </p>
                                    <p className="text-lg">
                                        بالإضافة إلى ذلك، يعد التفاوض مع الموردين أحد الطرق الفعالة لتخفيض النفقات على المدى الطويل.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
