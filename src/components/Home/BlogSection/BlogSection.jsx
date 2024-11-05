import Shap from "@/image/home/shap-4.svg";
import Image from "next/image";


const resources = [
    {
        id: 1,
        title: 'كيفية تأسيس شركتك بنجاح',
        href: '#',
        description: 'دليل شامل لمساعدتك في فهم متطلبات تأسيس شركتك الخاصة، بما في ذلك الإجراءات القانونية والإدارية.',
        date: 'أكتوبر 30, 2024',
        datetime: '2024-10-30',
        category: { title: 'دليل' },
        author: {
            name: 'أحمد السعيد',
            role: 'مستشار أعمال',
            href: '#',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', // Real image for author
        },
        imageUrl: 'https://crypto.demo.nextjstemplates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fd33zuypx%2Fproduction%2Fa0ca7f2ce7b15da5c3c4bb79e6856ab013fce446-970x430.jpg&w=1920&q=100', // Demo image for each card
    },
    {
        id: 2,
        title: 'استراتيجيات لوجستية فعالة',
        href: '#',
        description: 'اكتشف كيفية تحسين سلاسل التوريد الخاصة بك وزيادة كفاءة العمليات اللوجستية.',
        date: 'أكتوبر 29, 2024',
        datetime: '2024-10-29',
        category: { title: 'لوجستيات' },
        author: {
            name: 'سارة الحسن',
            role: 'خبير لوجستي',
            href: '#',
            imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg', // Real image for author
        },
        imageUrl: 'https://crypto.demo.nextjstemplates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fd33zuypx%2Fproduction%2Fa1a9953626f4825024108e8199395a3aab2a8930-860x480.png&w=1920&q=100', // Demo image for each card
    },
    {
        id: 3,
        title: 'كيفية الحصول على تمويل لمشروعك',
        href: '#',
        description: 'استراتيجيات فعالة للحصول على التمويل اللازم لتطوير مشاريعك وأفكارك.',
        date: 'أكتوبر 28, 2024',
        datetime: '2024-10-28',
        category: { title: 'تمويل' },
        author: {
            name: 'محمد الجاسم',
            role: 'مستشار مالي',
            href: '#',
            imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg', // Real image for author
        },
        imageUrl: 'https://clarity-tailwind.preview.uideck.com/images/blog-01.png', // Demo image for each card
    },
];

export default function BlogSection() {
    return (
        <div className="bg-white py-24 sm:py-32 position-relative z-10" dir="rtl">
            <div className="absolute bottom-0 left-0 -z-10 opacity-50">
                <Image alt="shape" loading="lazy" width="435" height="959" src={Shap} />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0" data-aos="fade-up">
                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-right">
                        استكشف مواردنا
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-600 text-right">
                        تعرف على كيفية تنمية أعمالك من خلال مقالاتنا المتخصصة ونصائح الخبراء.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {resources.map((resource, index) => (
                        <article
                            key={resource.id}
                            className="flex flex-col items-start justify-between bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:scale-105"
                            data-aos="fade-up"
                            data-aos-delay={index * 100} // Stagger animations for each card
                        >
                            <img
                                src={resource.imageUrl}
                                alt={resource.title}
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={resource.datetime} className="text-gray-500">
                                        {resource.date}
                                    </time>
                                    <a
                                        href={`/blog?id=${resource.id}`}
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                        {resource.category.title}
                                    </a>
                                </div>
                                <div className="group relative mt-3">
                                    <h3 className="text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                        <a
                                            href={`/blog?id=${resource.id}`}
                                        >
                                            <span className="absolute inset-0" />
                                            {resource.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{resource.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img alt="" src={resource.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                                    <div className="text-sm/6">
                                        <p className="font-semibold text-gray-900">
                                            <a href={resource.author.href}>
                                                <span className="absolute inset-0" />
                                                {resource.author.name}
                                            </a>
                                        </p>
                                        <p className="text-gray-600">{resource.author.role}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
