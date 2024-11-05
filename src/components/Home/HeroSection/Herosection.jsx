import "./style.scss";
import ShapOne from "@/image/home/hero-shape-1.svg";
import ShapTwo from "@/image/home/hero-shape-2.svg";
import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="hero-section">
            <div className="hero-section__background"></div>
            <Image
                alt="shape"
                loading="lazy"
                width="411"
                height="276"
                decoding="async"
                className="absolute left-0 top-0 -z-10"
                src={ShapOne}
                style={{ color: "transparent;" }}
            />
            <Image
                alt="shape"
                loading="lazy"
                width="820"
                height="692"
                decoding="async"
                className="absolute right-0 top-0 -z-10"
                src={ShapTwo}
                style={{ color: "transparent;" }}
            />
            <div className="container content-hero">
                <div data-aos="fade-down">
                    <h1 className="hero-section__title fs-1 mb-4 fw-semibold" data-aos="fade-down">
                        مرحبًا بكم في وصل
                    </h1>
                    <p className="hero-section__description fs-5 fw-semibold mb-4" data-aos="fade-down">
                        نحن هنا لتقديم الدعم الشامل لرحلتك في عالم الأعمال، من تأسيس شركتك الجديدة إلى الخدمات اللوجستية والدعم الإداري. في وصل، نؤمن بتمكين رواد الأعمال ومساعدتهم على تحقيق أهدافهم بسهولة وثقة.
                    </p>
                    <p className="hero-section__mission mb-4" data-aos="fade-down">
                        من خلال فريق متخصص وخدمات مُخصصة، نحن ملتزمون بتوفير كل ما تحتاجه للنجاح في عالم ريادة الأعمال. انطلق معنا في رحلتك وابدأ في بناء مستقبل أفضل.
                    </p>
                    <div className="hero-section__buttons">
                        <button className="btn btn-primary fw-bold">
                            <a href={`/auth/signin`} className="text-decoration-none">
                                ابدأ الآن
                            </a>
                        </button>
                        <button className="btn btn-secondary fw-bold">
                            <a href={`#about`} className="text-decoration-none">
                                تعرف على خدماتنا
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
