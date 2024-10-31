import "./style.scss";

// Service data object with expanded descriptions
const services = [
    {
        id: "business-support",
        icon: "bi bi-briefcase",
        title: "دعم الأعمال",
        description: "نقدم دعمًا قانونيًا وإداريًا شاملاً لمساعدتك في تأسيس شركتك وتوجيهها نحو النجاح. نحن هنا لتقديم المشورة والخدمات اللازمة، بما في ذلك المساعدة في إعداد المستندات القانونية، تقديم النصائح حول الأمور الضريبية، وتوجيهك في عمليات التسجيل والتراخيص. هدفنا هو ضمان أن تبدأ عملك بأمان وثقة."
    },
    {
        id: "logistics-services",
        icon: "bi bi-gear",
        title: "خدمات لوجستية",
        description: "نقدم حلولاً لوجستية متكاملة تساعدك في إدارة سلسلة الإمداد بكفاءة، مما يضمن تسليم المنتجات في الوقت المناسب وبأعلى جودة. تشمل خدماتنا التخزين، الشحن، والتوزيع، بالإضافة إلى استراتيجيات لتقليل التكاليف وتحسين الكفاءة. نحن نعمل معك لتطوير حلول مخصصة تلبي احتياجات عملك."
    },
    {
        id: "entrepreneur-guidance",
        icon: "bi bi-lightbulb",
        title: "إرشادات ريادة الأعمال",
        description: "نقدم برامج إرشادية ودورات تدريبية لمساعدتك في تطوير مهاراتك الريادية وفهم بيئة الأعمال بشكل أعمق. سواء كنت تبحث عن نصائح في تطوير خطة العمل أو تريد تحسين مهاراتك القيادية، نحن نقدم الدعم والإلهام لتساعدك في تحقيق أهدافك."
    },
    {
        id: "networking",
        icon: "bi bi-people",
        title: "شبكة العلاقات",
        description: "نحن نوفر لك فرصة الوصول إلى شبكة واسعة من المحترفين ورواد الأعمال، مما يساعدك في بناء علاقات تجارية قوية. من خلال فعالياتنا وورش العمل، يمكنك التواصل مع أشخاص يشاركونك نفس الاهتمامات، مما يعزز فرص التعاون والشراكة. نحن هنا لفتح الأبواب التي تساعدك في النمو."
    },
    {
        id: "marketing-consultations",
        icon: "bi bi-card-checklist",
        title: "استشارات تسويقية",
        description: "نقدم استشارات تسويقية متخصصة لمساعدتك في تطوير استراتيجيات فعّالة لجذب العملاء وزيادة الوعي بعلامتك التجارية. سنساعدك في تحليل السوق، تحديد الجمهور المستهدف، وتطوير خطة تسويقية شاملة تتضمن أدوات مثل وسائل التواصل الاجتماعي، المحتوى المدفوع، وتحسين محركات البحث (SEO)."
    },
    {
        id: "content-writing",
        icon: "bi bi-file-earmark-text",
        title: "خدمات كتابة المحتوى",
        description: "نقدم خدمات كتابة محتوى احترافية لمساعدتك في التواصل بفعالية مع جمهورك وتعزيز وجودك الرقمي. سواء كنت بحاجة إلى محتوى لموقعك الإلكتروني، مقالات مدونة، أو محتوى تسويقي، فإن فريقنا من الكتاب المحترفين سيساعدك في إنشاء محتوى جذاب يحقق نتائج ملموسة."
    }
];

export default function WhatWeOffer() {
    return (
        <section className="what-we-offer mt-5">
            <div className="container">
                <h2 className="section-title fs-3 fw-bold main-color mb-2">ماذا نقدم</h2>
                <p className="section-description fs-5 fw-normal color-text-light mb-5">
                    نحن نقدم مجموعة شاملة من الخدمات لمساعدتك في بناء وتطوير شركتك.
                    سواء كنت مبتدئًا أو لديك تجربة سابقة، فنحن هنا لدعمك في كل خطوة.
                </p>
                <div className="offer-items text-center w-100">
                    {services.map((service, index) => (
                        <div
                            className="offer-item p-3 rounded d-flex flex-column align-items-center justify-content-center"
                            key={service.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100} // delay increases with each card for staggered effect
                        >
                            <i className={`${service.icon} fs-3 mt-1`}></i>
                            <h3 className="fs-4 mb-3 fw-semibold mt-3">{service.title}</h3>
                            <p className="fs-6 fw-normal">
                                {service.description}
                            </p>
                            <a href={`/service?id=${service.id}`} className="btn rounded mt-3">
                                معرفة المزيد
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
