import Shap from "@/image/home/testimonial-shape.svg";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: 'أحمد السعيد',
        role: 'مستشار أعمال',
        text: 'خدمة ممتازة! ساعدوني كثيراً في تأسيس شركتي.'
    },
    {
        id: 2,
        name: 'سارة الحسن',
        role: 'خبير لوجستي',
        text: 'شكرًا لكم على دعمكم المستمر! ساعدتموني في تحسين سلاسل التوريد.'
    },
    {
        id: 3,
        name: 'محمد الجاسم',
        role: 'مستشار مالي',
        text: 'تجربتي كانت رائعة! أوصي بشدة بهذه الخدمة.'
    },
    {
        id: 4,
        name: 'علي النصر',
        role: 'مدير مشاريع',
        text: 'عمل احترافي، سأستخدم خدماتهم مرة أخرى.'
    },
    {
        id: 5,
        name: 'فاطمة الزهراء',
        role: 'مستشارة تسويق',
        text: 'دعم ممتاز وفهم عميق لاحتياجاتنا.'
    },
    {
        id: 6,
        name: 'يوسف الرشيد',
        role: 'مستشار قانوني',
        text: 'خدمة رائعة، استجابة سريعة وفعالة.'
    },
];

export default function TestimonialSection() {

    return (
        <div className="py-24 sm:py-32 relative background-light" dir="rtl">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="text-center" data-aos="fade-up">
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        آراء العملاء
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-600">
                        تعرف على ما يقوله عملاؤنا عن خدماتنا.
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-xl relative z-10"
                            data-aos="fade-up"
                            data-aos-delay={index * 100} // Staggered animation delay for each card
                        >
                            <div className="absolute right-0 top-0 z-[-1] opacity-50">
                                <Image alt="shape" loading="lazy" width={254} height={182} decoding="async"
                                    data-nimg="1" src={Shap} style={{ color: "transparent" }} />
                            </div>
                            <div className="flex items-end mb-4 justify-end">
                                <div className="ml-4">
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600 fs-6 fw-semibold">
                                "{testimonial.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
