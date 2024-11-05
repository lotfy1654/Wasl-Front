const pricingData = {
    title: "خطط الأسعار الخاصة بنا",
    subtitle: "أسعار تنافسية",
    description: "تتوفر العديد من أشكال لوريم إيبسوم، لكن الغالبية قد خضعت لبعض التعديلات في الشكل أو الكلمات.",
    plans: [
        {
            name: "الخطة الأساسية",
            price: "$49",
            period: "/شهر",
            features: [
                "جميع المكونات",
                "استخدام غير محدود في المشاريع",
                "استخدام تجاري",
                "دعم عبر البريد الإلكتروني",
                "وصول مدى الحياة",
                "تحديثات مجانية مدى الحياة"
            ],
            buttonText: "اشترِ الآن"
        },
        {
            name: "الخطة المتقدمة",
            price: "$99",
            period: "/شهر",
            features: [
                "جميع المكونات",
                "استخدام غير محدود في المشاريع",
                "دعم أولوي",
                "مساعدة فورية عبر الهاتف",
                "دعم عبر البريد الإلكتروني",
                "تحديثات مجانية مدى الحياة"
            ],
            buttonText: "اشترِ الآن"
        },
        {
            name: "الخطة الممتازة",
            price: "$199",
            period: "/شهر",
            features: [
                "جميع المكونات",
                "استخدام غير محدود في المشاريع",
                "استخدام تجاري",
                "دعم 24/7 عبر الهاتف والبريد الإلكتروني",
                "دورة تدريبية خاصة",
                "تحديثات مجانية مدى الحياة"
            ],
            buttonText: "اشترِ الآن"
        }
    ]
};

export default function PricingSection() {


    return (
        <section id="pricing" className="pt-[120px] pb-20 background-light relative" dir="rtl">
            <div className="container overflow-hidden">
                <div className="flex flex-wrap mx-[-16px]">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[655px] text-center mb-20 wow fadeInUp" data-wow-delay=".1s"
                            style={{ visibility: "visible", animationDelay: "0.1s" }}>
                            <span className="text-lg font-semibold text-primary mb-2 block">{pricingData.subtitle}</span>
                            <h2 className="text-black font-bold text-3xl sm:text-4xl md:text-[45px] mb-5">{pricingData.title}</h2>
                            <p className="text-body-color text-base md:text-lg leading-relaxed max-w-[570px] mx-auto">
                                {pricingData.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center mx-[-16px]">
                    {pricingData.plans.map((plan, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4"
                            data-aos="fade-up" // AOS animation
                        >
                            <div className="bg-white shadow-pricing p-10 md:px-8 lg:py-10 lg:px-6 xl:p-10 text-center rounded-sm relative z-10 mb-10 
                                transition-transform transform hover:scale-105 hover:shadow-lg rounded border">
                                <div className="flex justify-center items-end">
                                    <h2 className="font-bold text-black text-[42px] mb-2">
                                        {plan.price}
                                        <span className="text-lg font-medium text-body-color"> {plan.period} </span>
                                    </h2>
                                </div>
                                <p className="text-base text-body-color leading-relaxed font-medium pb-9 mb-9 border-b border-[#E9ECF8]">
                                    لوريم إيبسوم هو نص تجريبي يستخدم في صناعة الطباعة والتصميم.
                                </p>
                                <div className="mb-8">
                                    {plan.features.map((feature, index) => (
                                        <p key={index} className="font-medium text-base text-body-color mb-3 flex items-center">
                                            <span className="mr-2 text-primary">✔️</span>
                                            <span className="text-body-color me-2">
                                                {feature}
                                            </span>
                                        </p>
                                    ))}
                                </div>
                                <a href="javascript:void(0)" className="flex items-center justify-center p-3 rounded-sm bg-primary text-semibold text-base text-white hover:shadow-signUp transition duration-300 ease-in-out">
                                    {plan.buttonText}
                                </a>
                                <div className="absolute right-0 top-0 z-[-1]">
                                    {/* SVG shapes for background */}
                                    <svg width="37" height="154" viewBox="0 0 37 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.1" x="17.5237" y="78.0005" width="24.7822" height="24.7822" rx="4" transform="rotate(45 17.5237 78.0005)" fill="#4A6CF7"></rect>
                                        <rect opacity="0.3" x="47.585" y="92.9392" width="41.1567" height="45.1468" rx="5" transform="rotate(45 47.585 92.9392)" fill="#4A6CF7"></rect>
                                        <rect opacity="0.8" x="57.7432" y="-2.99951" width="78.8328" height="78.8328" rx="10" transform="rotate(45 57.7432 -2.99951)" fill="#4A6CF7"></rect>
                                    </svg>
                                </div>
                                <div className="absolute left-0 bottom-0 z-[-1]">
                                    {/* SVG shapes for background */}
                                    <svg width="229" height="182" viewBox="0 0 229 182" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.05" x="-0.639709" y="21.1696" width="46.669" height="45.7644" rx="10" transform="rotate(45 -0.639709 21.1696)" fill="url(#paint0_linear_25:114)"></rect>
                                        <rect opacity="0.05" x="40.1691" y="0.000488281" width="34.3355" height="33.67" rx="5" transform="rotate(45 40.1691 0.000488281)" fill="url(#paint1_linear_25:114)"></rect>
                                        <rect opacity="0.07" x="60.9458" y="42.1696" width="237" height="380.347" rx="22" transform="rotate(45 60.9458 42.1696)" fill="url(#paint2_linear_25:114)"></rect>
                                        <defs>
                                            <linearGradient id="paint0_linear_25:114" x1="29.5176" y1="14.0581" x2="14.35" y2="82.5021" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#4A6CF7"></stop>
                                                <stop offset="0.822917" stop-color="#4A6CF7" stop-opacity="0"></stop>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_25:114" x1="62.3565" y1="-5.23156" x2="51.1974" y2="45.1244" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#4A6CF7"></stop>
                                                <stop offset="0.822917" stop-color="#4A6CF7" stop-opacity="0"></stop>
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_25:114" x1="74.6106" y1="15.6017" x2="115.198" y2="62.4302" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#4A6CF7"></stop>
                                                <stop offset="0.822917" stop-color="#4A6CF7" stop-opacity="0"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
