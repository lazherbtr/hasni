"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const translations = {
  en: {
    dir: "ltr" as const,
    nav: {
      brand: "VERTEX",
      brandSub: "Sourcing",
      services: "Services",
      process: "Process",
      request: "Submit Request",
      langSwitch: "العربية",
    },
    hero: {
      tagline: "Global Procurement & Sourcing Consultancy",
      headline1: "We Find the",
      headline2: "Right Suppliers",
      headline3: "For Your Business",
      description:
        "Bridging the gap between ambitious companies and world-class suppliers through expert sourcing, rigorous market analysis, and transparent procurement processes.",
      cta: "Submit a Product Request",
      ctaSub: "Free consultation included",
    },
    about: {
      label: "About",
      title: "Your Strategic Sourcing Partner",
      p1: "With deep expertise in global supply chains, we act as the critical bridge between your company and the world's most reliable suppliers. Our approach combines meticulous market research with hands-on supplier evaluation to deliver procurement solutions that drive real business value.",
      p2: "Every sourcing engagement begins with understanding your unique requirements — product specifications, quality standards, pricing targets, and delivery timelines. We then leverage our extensive network and analytical methodology to identify, evaluate, and present the optimal supplier options for your consideration.",
      stat1Label: "Suppliers Vetted",
      stat1Value: "2,400+",
      stat2Label: "Countries Covered",
      stat2Value: "35+",
      stat3Label: "Client Retention",
      stat3Value: "96%",
    },
    services: {
      label: "Services",
      title: "Comprehensive Sourcing Solutions",
      subtitle:
        "End-to-end procurement support designed to optimize your supply chain and reduce sourcing complexity.",
      items: [
        {
          num: "01",
          title: "Product Sourcing",
          desc: "Identifying and securing the right products from verified global suppliers that meet your exact specifications, quality standards, and budget requirements.",
        },
        {
          num: "02",
          title: "Supplier Research",
          desc: "Conducting thorough due diligence on potential suppliers — evaluating production capacity, certifications, financial stability, and track record.",
        },
        {
          num: "03",
          title: "Market Analysis",
          desc: "Providing in-depth market intelligence including pricing trends, competitive landscape analysis, and strategic sourcing recommendations.",
        },
        {
          num: "04",
          title: "Supplier Comparison",
          desc: "Delivering detailed comparison reports across multiple qualified suppliers, enabling data-driven procurement decisions with full transparency.",
        },
        {
          num: "05",
          title: "Procurement Support",
          desc: "Managing the end-to-end procurement cycle — from initial negotiations and contract review to quality assurance and logistics coordination.",
        },
      ],
    },
    process: {
      label: "Process",
      title: "How We Work",
      subtitle:
        "A structured, transparent approach from request to delivery.",
      steps: [
        {
          num: "01",
          title: "Request Submitted",
          desc: "You submit your product sourcing requirements through our detailed briefing form.",
        },
        {
          num: "02",
          title: "Requirements Analyzed",
          desc: "Our team reviews specifications, quantities, quality standards, and timelines.",
        },
        {
          num: "03",
          title: "Suppliers Researched",
          desc: "We identify, vet, and evaluate qualified suppliers from our global network.",
        },
        {
          num: "04",
          title: "Comparison Prepared",
          desc: "A comprehensive comparison report is prepared with pricing, capabilities, and recommendations.",
        },
        {
          num: "05",
          title: "Supplier Selected",
          desc: "You review the options and select the supplier that best fits your needs.",
        },
      ],
    },
    trust: {
      label: "Why Us",
      title: "Built on Trust, Driven by Results",
      items: [
        {
          title: "Professional Process",
          desc: "Every engagement follows a structured, repeatable methodology that ensures consistency and quality across all sourcing projects.",
        },
        {
          title: "Market Expertise",
          desc: "Deep understanding of global markets, supplier ecosystems, and industry-specific procurement challenges.",
        },
        {
          title: "Reliable Research",
          desc: "Rigorous supplier vetting with verified credentials, production audits, and reference checks.",
        },
        {
          title: "Full Transparency",
          desc: "Complete visibility into our sourcing process — from initial research to final recommendation, with no hidden agendas.",
        },
      ],
    },
    form: {
      label: "Get Started",
      title: "Submit Your Sourcing Request",
      subtitle: "Tell us what you're looking for. Every detail matters.",
      sideTitle: "The Briefing",
      sideDesc:
        "Precision in your request leads to precision in our sourcing. The more detail you provide, the more targeted and effective our supplier research will be.",
      sideNote: "All information is treated with strict confidentiality.",
      companyName: "Company Name",
      contactPerson: "Contact Person",
      email: "Email Address",
      phone: "Phone Number",
      productName: "Product Name",
      quantity: "Quantity Required",
      specifications: "Technical Specifications",
      description: "Product Description",
      imageUpload: "Upload Product Images",
      fileUpload: "Upload Supporting Documents",
      notes: "Additional Notes",
      submit: "Submit Request",
      submitting: "Analyzing Requirements...",
      dragDrop: "Drag & drop files here, or click to browse",
      successTitle: "Request Submitted Successfully",
      successDesc:
        "Thank you for your submission. Our team will review your requirements and respond within 24 business hours.",
      successBack: "Submit Another Request",
    },
    footer: {
      brand: "VERTEX Sourcing",
      desc: "Professional procurement and sourcing consultancy bridging companies with world-class suppliers.",
      rights: "© 2025 Vertex Sourcing. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
  ar: {
    dir: "rtl" as const,
    nav: {
      brand: "VERTEX",
      brandSub: "للتوريد",
      services: "خدماتنا",
      process: "آلية العمل",
      request: "تقديم طلب",
      langSwitch: "English",
    },
    hero: {
      tagline: "استشارات التوريد والمشتريات العالمية",
      headline1: "نجد لك",
      headline2: "الموردين المناسبين",
      headline3: "لأعمالك",
      description:
        "نسد الفجوة بين الشركات الطموحة والموردين العالميين من خلال خبرة التوريد المتخصصة، والتحليل الدقيق للسوق، وعمليات الشراء الشفافة.",
      cta: "تقديم طلب منتج",
      ctaSub: "استشارة مجانية متضمنة",
    },
    about: {
      label: "من نحن",
      title: "شريكك الاستراتيجي في التوريد",
      p1: "بخبرة عميقة في سلاسل التوريد العالمية، نعمل كجسر حيوي بين شركتك وأكثر الموردين موثوقية في العالم. يجمع نهجنا بين البحث الدقيق في السوق والتقييم الميداني للموردين لتقديم حلول توريد تحقق قيمة تجارية حقيقية.",
      p2: "تبدأ كل عملية توريد بفهم متطلباتك الفريدة — مواصفات المنتج، ومعايير الجودة، والأسعار المستهدفة، والجداول الزمنية للتسليم. ثم نستفيد من شبكتنا الواسعة ومنهجيتنا التحليلية لتحديد وتقييم وتقديم أفضل خيارات الموردين.",
      stat1Label: "مورد تم فحصه",
      stat1Value: "+2,400",
      stat2Label: "دولة مغطاة",
      stat2Value: "+35",
      stat3Label: "معدل الاحتفاظ بالعملاء",
      stat3Value: "%96",
    },
    services: {
      label: "خدماتنا",
      title: "حلول توريد شاملة",
      subtitle:
        "دعم متكامل للمشتريات مصمم لتحسين سلسلة التوريد وتقليل تعقيد عمليات الشراء.",
      items: [
        {
          num: "01",
          title: "توريد المنتجات",
          desc: "تحديد وتأمين المنتجات المناسبة من موردين عالميين موثقين يلبون مواصفاتك الدقيقة ومعايير الجودة والميزانية.",
        },
        {
          num: "02",
          title: "البحث عن الموردين",
          desc: "إجراء تقييم شامل للموردين المحتملين — تقييم القدرة الإنتاجية والشهادات والاستقرار المالي والسجل التاريخي.",
        },
        {
          num: "03",
          title: "تحليل السوق",
          desc: "تقديم معلومات سوقية معمقة تشمل اتجاهات الأسعار وتحليل المنافسة وتوصيات التوريد الاستراتيجية.",
        },
        {
          num: "04",
          title: "مقارنة الموردين",
          desc: "تقديم تقارير مقارنة مفصلة بين عدة موردين مؤهلين، لتمكين قرارات شراء مبنية على البيانات بشفافية كاملة.",
        },
        {
          num: "05",
          title: "دعم المشتريات",
          desc: "إدارة دورة المشتريات الكاملة — من المفاوضات الأولية ومراجعة العقود إلى ضمان الجودة وتنسيق الخدمات اللوجستية.",
        },
      ],
    },
    process: {
      label: "آلية العمل",
      title: "كيف نعمل",
      subtitle: "نهج منظم وشفاف من الطلب إلى التسليم.",
      steps: [
        {
          num: "01",
          title: "تقديم الطلب",
          desc: "تقوم بتقديم متطلبات التوريد من خلال نموذج الطلب التفصيلي.",
        },
        {
          num: "02",
          title: "تحليل المتطلبات",
          desc: "يراجع فريقنا المواصفات والكميات ومعايير الجودة والجداول الزمنية.",
        },
        {
          num: "03",
          title: "البحث عن الموردين",
          desc: "نحدد ونفحص ونقيّم الموردين المؤهلين من شبكتنا العالمية.",
        },
        {
          num: "04",
          title: "إعداد المقارنة",
          desc: "يتم إعداد تقرير مقارنة شامل بالأسعار والقدرات والتوصيات.",
        },
        {
          num: "05",
          title: "اختيار المورد",
          desc: "تراجع الخيارات وتختار المورد الأنسب لاحتياجاتك.",
        },
      ],
    },
    trust: {
      label: "لماذا نحن",
      title: "مبنيون على الثقة، مدفوعون بالنتائج",
      items: [
        {
          title: "عملية احترافية",
          desc: "كل عملية تتبع منهجية منظمة وقابلة للتكرار تضمن الاتساق والجودة في جميع مشاريع التوريد.",
        },
        {
          title: "خبرة سوقية",
          desc: "فهم عميق للأسواق العالمية وأنظمة الموردين وتحديات المشتريات الخاصة بكل صناعة.",
        },
        {
          title: "بحث موثوق",
          desc: "فحص دقيق للموردين مع بيانات اعتماد موثقة ومراجعات إنتاج وفحوصات مرجعية.",
        },
        {
          title: "شفافية كاملة",
          desc: "رؤية كاملة لعملية التوريد — من البحث الأولي إلى التوصية النهائية، بدون أجندات خفية.",
        },
      ],
    },
    form: {
      label: "ابدأ الآن",
      title: "قدّم طلب التوريد",
      subtitle: "أخبرنا بما تبحث عنه. كل التفاصيل مهمة.",
      sideTitle: "الإحاطة",
      sideDesc:
        "الدقة في طلبك تؤدي إلى دقة في التوريد. كلما قدمت تفاصيل أكثر، كان بحثنا عن الموردين أكثر استهدافاً وفعالية.",
      sideNote: "جميع المعلومات تعامل بسرية تامة.",
      companyName: "اسم الشركة",
      contactPerson: "اسم الشخص المسؤول",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      productName: "اسم المنتج",
      quantity: "الكمية المطلوبة",
      specifications: "المواصفات الفنية",
      description: "وصف المنتج",
      imageUpload: "تحميل صور المنتج",
      fileUpload: "تحميل المستندات الداعمة",
      notes: "ملاحظات إضافية",
      submit: "تقديم الطلب",
      submitting: "جارٍ تحليل المتطلبات...",
      dragDrop: "اسحب وأفلت الملفات هنا، أو انقر للاستعراض",
      successTitle: "تم تقديم الطلب بنجاح",
      successDesc:
        "شكراً لتقديمك. سيراجع فريقنا متطلباتك ويرد خلال 24 ساعة عمل.",
      successBack: "تقديم طلب آخر",
    },
    footer: {
      brand: "VERTEX للتوريد",
      desc: "استشارات احترافية في المشتريات والتوريد تربط الشركات بموردين عالميين.",
      rights: "© 2025 Vertex للتوريد. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
    },
  },
} as const;

type Lang = keyof typeof translations;
type Translations = (typeof translations)[Lang];

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];
  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));
  const isRTL = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
