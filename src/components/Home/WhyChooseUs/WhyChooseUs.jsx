import { BuildingLibraryIcon, TruckIcon, UsersIcon, LightBulbIcon } from '@heroicons/react/24/solid';


const features = [
    {
        id: 1,
        icon: BuildingLibraryIcon,
        title: 'تأسيس الشركات',
        description: 'نساعدك في جميع خطوات تأسيس شركتك، بدءًا من اختيار الاسم وحتى تسجيلها رسميًا. نفهم أن عملية التأسيس يمكن أن تكون معقدة، لذلك نحن هنا لتقديم الإرشادات اللازمة وتوفير الوثائق المطلوبة لضمان سير العملية بسلاسة وسرعة.'
    },
    {
        id: 2,
        icon: TruckIcon,
        title: 'دعم لوجيستي',
        description: 'نقدم خدمات لوجستية متكاملة لضمان سير العمل بسلاسة ودون أي عوائق. سواء كنت بحاجة إلى نقل البضائع، أو إدارة المخزون، أو التخزين، فإن فريقنا يضمن لك حلاً لوجستياً يناسب احتياجاتك الخاصة ويعزز من كفاءة عملك.'
    },
    {
        id: 3,
        icon: UsersIcon,
        title: 'دعم إداري متكامل',
        description: 'فريقنا يوفر لك الدعم الإداري اللازم لتسهيل عملياتك اليومية وتحقيق الأهداف. نحن نقدم مجموعة شاملة من الخدمات الإدارية، بما في ذلك تنظيم المستندات، وإدارة الموارد البشرية، والتخطيط المالي، مما يتيح لك التركيز على تطوير أعمالك بشكل أكبر.'
    },
    {
        id: 4,
        icon: LightBulbIcon,
        title: 'إنشاء مشاريع مبتكرة',
        description: 'نساعدك في تحويل أفكارك إلى مشاريع ناجحة من خلال الاستشارات والدعم العملي. نقدم لك الأدوات والمعرفة اللازمة لبناء مشاريعك من الألف إلى الياء، مع توفير التوجيه في مجالات مثل التسويق والتكنولوجيا والابتكار، لضمان نجاح مشروعك في السوق.'
    }
];

export default function WhyChooseUs() {

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
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="flex flex-col items-center"
                                data-aos="fade-up"
                                data-aos-delay={index * 300} // Delay for staggered animation
                                data-aos-offset="200" // Adjusts the scroll trigger point
                            >
                                <Icon className="h-16 w-16 text-indigo-600 mb-4 main-color" />
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
