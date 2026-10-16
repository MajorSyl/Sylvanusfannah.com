/**
 * All site content lives here, separated by section.
 *
 * Every user-facing string is a `Localized` object ({ en, es }) so the
 * English/Spanish toggle works everywhere. The shape is intentionally flat
 * and serializable (no JSX, no functions) so each section can later be mapped
 * 1:1 to a Keystatic singleton/collection without touching the components.
 */

export type Locale = "en" | "es";
export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "en";

export type Localized = { en: string; es: string };

export const t = (value: Localized, locale: Locale) => value[locale];

/* ───────────────────────────── Site / SEO ───────────────────────────── */

export const site = {
  name: "Sylvanus Fannah",
  domain: "sylvanusfannah.com",
  role: {
    en: "Full-stack developer & founder",
    es: "Desarrollador full-stack y fundador",
  },
  tagline: { en: "I build systems that work.", es: "Construyo sistemas que funcionan." },
  seoTitle: {
    en: "Sylvanus Fannah — Full-stack developer, AI automation & business systems",
    es: "Sylvanus Fannah — Desarrollador full-stack, automatización con IA y sistemas de negocio",
  },
  seoDescription: {
    en: "I build AI automations, web and mobile apps, and business systems for clients worldwide. Reliable delivery, clear communication, in English and Spanish.",
    es: "Construyo automatizaciones con IA, apps web y móviles y sistemas de negocio para clientes en todo el mundo. Entregas puntuales y comunicación clara, en inglés y español.",
  },
  keywords: [
    "Sylvanus Fannah",
    "full-stack developer",
    "AI automation",
    "WhatsApp chatbot",
    "web app development",
    "mobile app development",
    "business systems",
    "POS",
    "inventory system",
    "business intelligence dashboards",
    "freelance developer",
    "remote developer",
  ],
};

export const nav = {
  links: [
    { href: "#services", label: { en: "Services", es: "Servicios" } },
    { href: "#work", label: { en: "Work", es: "Proyectos" } },
    { href: "#ventures", label: { en: "Ventures", es: "Empresas" } },
    { href: "#about", label: { en: "About", es: "Sobre mí" } },
  ],
  cta: { en: "Request a quote", es: "Solicitar cotización" },
};

/* ──────────────────────────────── Hero ──────────────────────────────── */

export const hero = {
  eyebrow: {
    en: "Available for freelance & contract work",
    es: "Disponible para proyectos freelance y por contrato",
  },
  name: "Sylvanus Fannah",
  tagline: site.tagline,
  intro: {
    en: "Full-stack developer and founder. I build AI automations, web and mobile apps, and business systems — delivered on time, with clear communication from kickoff to launch.",
    es: "Desarrollador full-stack y fundador. Construyo automatizaciones con IA, apps web y móviles y sistemas de negocio — entregados a tiempo, con comunicación clara desde el inicio hasta el lanzamiento.",
  },
  /** Put your photo at /public/images/sylvanus.jpg. A placeholder is shown until it exists. */
  photo: "/images/sylvanus.jpg",
  photoAlt: { en: "Portrait of Sylvanus Fannah", es: "Retrato de Sylvanus Fannah" },
  primaryCta: { en: "Request a quote", es: "Solicitar cotización" },
  secondaryCta: { en: "See my work", es: "Ver mi trabajo" },
  proofPoints: [
    { en: "Remote, worldwide", es: "Remoto, en todo el mundo" },
    { en: "English & Spanish", es: "Inglés y español" },
    { en: "On-time delivery", es: "Entregas a tiempo" },
  ],
};

/* ────────────────────────────── Services ────────────────────────────── */

export type ServiceCategoryId = "ai-automation" | "software" | "business-intelligence" | "business-setup";

export type ServiceCategory = {
  id: ServiceCategoryId;
  icon: "bot" | "code" | "chart" | "briefcase";
  title: Localized;
  summary: Localized;
  items: { title: Localized; description: Localized }[];
};

export const services = {
  eyebrow: { en: "Services", es: "Servicios" },
  heading: {
    en: "What I build for you",
    es: "Lo que construyo para ti",
  },
  intro: {
    en: "Four focused practices. Each project gets a clear scope, a fixed timeline, and regular progress updates.",
    es: "Cuatro áreas especializadas. Cada proyecto tiene un alcance claro, un calendario definido y actualizaciones de avance regulares.",
  },
  categories: [
    {
      id: "ai-automation",
      icon: "bot",
      title: { en: "AI & Automation", es: "IA y automatización" },
      summary: {
        en: "Put repetitive work on autopilot and answer customers instantly.",
        es: "Automatiza el trabajo repetitivo y responde a tus clientes al instante.",
      },
      items: [
        {
          title: { en: "AI agents & WhatsApp chatbots", es: "Agentes de IA y chatbots de WhatsApp" },
          description: {
            en: "Customer support, bookings and orders handled 24/7 — with a clean handoff to your team when it matters.",
            es: "Atención al cliente, reservas y pedidos 24/7 — con traspaso a tu equipo cuando hace falta.",
          },
        },
        {
          title: { en: "Document processing & workflow automation", es: "Procesamiento de documentos y automatización de flujos" },
          description: {
            en: "Extract data from invoices, forms and PDFs, and connect the tools you already use so work moves without manual steps.",
            es: "Extrae datos de facturas, formularios y PDFs, y conecta tus herramientas para eliminar pasos manuales.",
          },
        },
      ],
    },
    {
      id: "software",
      icon: "code",
      title: { en: "Software Development", es: "Desarrollo de software" },
      summary: {
        en: "Production-grade apps and systems, built to be used every day.",
        es: "Apps y sistemas listos para producción, hechos para el uso diario.",
      },
      items: [
        {
          title: { en: "Web apps", es: "Aplicaciones web" },
          description: {
            en: "Fast, secure web applications and portals — from MVP to scale.",
            es: "Aplicaciones y portales web rápidos y seguros — del MVP a la escala.",
          },
        },
        {
          title: { en: "Mobile apps (iOS & Android)", es: "Apps móviles (iOS y Android)" },
          description: {
            en: "Cross-platform apps with native feel, shipped to the App Store and Google Play.",
            es: "Apps multiplataforma con experiencia nativa, publicadas en App Store y Google Play.",
          },
        },
        {
          title: { en: "Business systems", es: "Sistemas de negocio" },
          description: {
            en: "POS, inventory and expiry tracking that keep operations accurate and stock under control.",
            es: "POS, inventario y control de vencimientos para operaciones precisas y stock bajo control.",
          },
        },
        {
          title: { en: "Health-tech", es: "Tecnología para salud" },
          description: {
            en: "Clinic management, appointment booking and pharmacy inventory systems.",
            es: "Sistemas de gestión de clínicas, agendamiento de citas e inventario de farmacia.",
          },
        },
      ],
    },
    {
      id: "business-intelligence",
      icon: "chart",
      title: { en: "Business Intelligence Systems", es: "Sistemas de inteligencia de negocio" },
      summary: {
        en: "See your numbers clearly and decide faster.",
        es: "Ve tus números con claridad y decide más rápido.",
      },
      items: [
        {
          title: { en: "Dashboards & analytics", es: "Dashboards y analítica" },
          description: {
            en: "Sales analytics, automated reporting and data visualization — one source of truth for your business.",
            es: "Analítica de ventas, reportes automáticos y visualización de datos — una sola fuente de verdad para tu negocio.",
          },
        },
      ],
    },
    {
      id: "business-setup",
      icon: "briefcase",
      title: { en: "Business Setup & Brand", es: "Configuración de negocio y marca" },
      summary: {
        en: "A professional foundation: email, domains and a brand people remember.",
        es: "Una base profesional: correo, dominios y una marca que se recuerda.",
      },
      items: [
        {
          title: { en: "Business email & workspace setup", es: "Correo corporativo y espacios de trabajo" },
          description: {
            en: "Microsoft 365, Google Workspace and Zoho — domains, DNS, mailboxes and migrations. I've set these up for companies in Sierra Leone.",
            es: "Microsoft 365, Google Workspace y Zoho — dominios, DNS, buzones y migraciones. Lo he implementado para empresas en Sierra Leona.",
          },
        },
        {
          title: { en: "Graphic design consultancy", es: "Consultoría de diseño gráfico" },
          description: {
            en: "Brand identity, flyers, social media and print design.",
            es: "Identidad de marca, flyers, diseño para redes sociales e impresión.",
          },
        },
      ],
    },
  ] satisfies ServiceCategory[],
};

/* ──────────────────────────── Case studies ──────────────────────────── */

export type CaseStudy = {
  slug: string;
  title: string;
  category: Localized;
  platforms: string[];
  problem: Localized;
  built: Localized;
  result: Localized;
  url?: string;
  /** Placeholder cards render with a "coming soon" treatment. */
  placeholder?: boolean;
};

export const caseStudies = {
  eyebrow: { en: "Selected work", es: "Trabajo seleccionado" },
  heading: { en: "Real systems, in real use", es: "Sistemas reales, en uso real" },
  intro: {
    en: "A few projects that show how I work: understand the problem, build the right thing, ship it.",
    es: "Algunos proyectos que muestran cómo trabajo: entender el problema, construir lo correcto y entregarlo.",
  },
  labels: {
    problem: { en: "Problem", es: "Problema" },
    built: { en: "What I built", es: "Lo que construí" },
    result: { en: "Result", es: "Resultado" },
    visit: { en: "Visit live site", es: "Ver sitio en vivo" },
    comingSoon: { en: "Case study coming soon", es: "Caso de estudio próximamente" },
  },
  items: [
    {
      slug: "easyfen",
      title: "Easyfen",
      category: { en: "Real estate platform", es: "Plataforma inmobiliaria" },
      platforms: ["React Native", "Web", "iOS", "Android"],
      problem: {
        en: "Finding a property meant scattered social posts, outdated listings and no reliable way to reach verified agents.",
        es: "Buscar una propiedad implicaba publicaciones dispersas, anuncios desactualizados y ninguna forma fiable de contactar agentes verificados.",
      },
      built: {
        en: "A real estate listing platform: a React Native mobile app and a companion website where agents publish and manage listings.",
        es: "Una plataforma de anuncios inmobiliarios: una app móvil en React Native y un sitio web donde los agentes publican y gestionan sus anuncios.",
      },
      result: {
        en: "Live at easyfen.com with real agent listings.",
        es: "En vivo en easyfen.com con anuncios reales de agentes.",
      },
      url: "https://easyfen.com",
    },
    {
      slug: "expiry-tracking",
      title: "Product Expiry Tracking System",
      category: { en: "Business system · Retail", es: "Sistema de negocio · Retail" },
      platforms: ["Desktop", "iOS", "Android", "Barcode"],
      problem: {
        en: "A shopping mall was losing money to expired stock that went unnoticed on the shelves.",
        es: "Un centro comercial perdía dinero por productos vencidos que pasaban desapercibidos en los estantes.",
      },
      built: {
        en: "A product expiry tracking system for desktop, iOS and Android. Staff register products by scanning the barcode and the system flags items before they expire.",
        es: "Un sistema de control de vencimientos para escritorio, iOS y Android. El personal registra productos escaneando el código de barras y el sistema alerta antes del vencimiento.",
      },
      result: {
        en: "Expiry dates tracked in one place across devices, so the team acts before stock is lost.",
        es: "Fechas de vencimiento centralizadas en todos los dispositivos, para actuar antes de perder mercancía.",
      },
    },
    {
      slug: "ai-chatbot",
      title: "AI WhatsApp Chatbot",
      category: { en: "AI & Automation", es: "IA y automatización" },
      platforms: ["WhatsApp", "AI"],
      problem: {
        en: "Placeholder — describe the client's support or booking bottleneck here.",
        es: "Ejemplo — describe aquí el problema de atención o reservas del cliente.",
      },
      built: {
        en: "Placeholder — describe the AI agent and its integrations here.",
        es: "Ejemplo — describe aquí el agente de IA y sus integraciones.",
      },
      result: {
        en: "Placeholder — add the measurable outcome here.",
        es: "Ejemplo — agrega aquí el resultado medible.",
      },
      placeholder: true,
    },
    {
      slug: "bi-dashboard",
      title: "Business Intelligence Dashboard",
      category: { en: "Business Intelligence", es: "Inteligencia de negocio" },
      platforms: ["Dashboard", "Analytics"],
      problem: {
        en: "Placeholder — describe the reporting problem here.",
        es: "Ejemplo — describe aquí el problema de reportes.",
      },
      built: {
        en: "Placeholder — describe the dashboard, data sources and metrics here.",
        es: "Ejemplo — describe aquí el dashboard, las fuentes de datos y las métricas.",
      },
      result: {
        en: "Placeholder — add the measurable outcome here.",
        es: "Ejemplo — agrega aquí el resultado medible.",
      },
      placeholder: true,
    },
  ] satisfies CaseStudy[],
};

/* ────────────────────────────── Ventures ────────────────────────────── */

export type Venture = {
  name: string;
  description: Localized;
  /** Leave empty until the venture has a public URL. */
  url?: string;
};

export const ventures = {
  eyebrow: { en: "Ventures", es: "Empresas" },
  heading: { en: "Businesses I founded and run", es: "Empresas que fundé y dirijo" },
  intro: {
    en: "Running my own companies means I build with the client's bottom line in mind.",
    es: "Dirigir mis propias empresas me hace construir pensando en los resultados del cliente.",
  },
  linkLabel: { en: "Visit", es: "Visitar" },
  soonLabel: { en: "Website coming soon", es: "Sitio web próximamente" },
  items: [
    {
      name: "Easyfen",
      description: {
        en: "Real estate platform connecting people with verified agents and listings.",
        es: "Plataforma inmobiliaria que conecta a las personas con agentes y anuncios verificados.",
      },
      url: "https://easyfen.com",
    },
    {
      name: "Syl Express",
      description: {
        en: "A software studio led by Sylvanus, building business systems.",
        es: "Un estudio de software dirigido por Sylvanus, que construye sistemas de negocio.",
      },
      url: "",
    },
    {
      name: "Sylprint",
      description: {
        en: "Printing services for businesses and events.",
        es: "Servicios de impresión para empresas y eventos.",
      },
      url: "",
    },
    {
      name: "Talu",
      description: {
        en: "Marketing agency helping brands grow their audience.",
        es: "Agencia de marketing que ayuda a las marcas a crecer su audiencia.",
      },
      url: "",
    },
  ] satisfies Venture[],
};

/* ──────────────────────────────── About ─────────────────────────────── */

export const about = {
  eyebrow: { en: "About", es: "Sobre mí" },
  heading: { en: "Engineer by training. Builder by choice.", es: "Ingeniero de formación. Constructor por elección." },
  paragraphs: [
    {
      en: "I'm Sylvanus Fannah, a full-stack developer and founder from Sierra Leone, now based in South America. I studied Electronics & Telecommunications Engineering at Njala University, which gave me a systems mindset: understand how every part connects, then make it reliable.",
      es: "Soy Sylvanus Fannah, desarrollador full-stack y fundador de Sierra Leona, actualmente radicado en Sudamérica. Estudié Ingeniería en Electrónica y Telecomunicaciones en la Universidad de Njala, lo que me dio una mentalidad de sistemas: entender cómo se conecta cada parte y luego hacerla confiable.",
    },
    {
      en: "I sharpened my software skills through the Orange Digital Center x Simplon web and mobile development program, then put them to work building my own companies — Easyfen, Syl Express, Sylprint and Talu.",
      es: "Perfeccioné mis habilidades en el programa de desarrollo web y móvil de Orange Digital Center x Simplon, y luego las puse en práctica fundando mis propias empresas — Easyfen, Syl Express, Sylprint y Talu.",
    },
    {
      en: "Today I help clients worldwide turn ideas and messy processes into software that works. You get clear communication, honest timelines and a developer who treats your project like his own business.",
      es: "Hoy ayudo a clientes en todo el mundo a convertir ideas y procesos desordenados en software que funciona. Obtienes comunicación clara, plazos honestos y un desarrollador que trata tu proyecto como su propio negocio.",
    },
  ],
  timeline: [
    {
      label: { en: "Njala University", es: "Universidad de Njala" },
      detail: { en: "Electronics & Telecommunications Engineering", es: "Ingeniería en Electrónica y Telecomunicaciones" },
    },
    {
      label: { en: "Orange Digital Center x Simplon", es: "Orange Digital Center x Simplon" },
      detail: { en: "Web & mobile development training", es: "Formación en desarrollo web y móvil" },
    },
    {
      label: { en: "Founder", es: "Fundador" },
      detail: { en: "Easyfen · Syl Express · Sylprint · Talu", es: "Easyfen · Syl Express · Sylprint · Talu" },
    },
  ],
  principles: [
    {
      title: { en: "Reliable", es: "Confiable" },
      description: { en: "Tested, documented systems that keep running after launch.", es: "Sistemas probados y documentados que siguen funcionando tras el lanzamiento." },
    },
    {
      title: { en: "Clear communication", es: "Comunicación clara" },
      description: { en: "Regular updates in plain language, in English or Spanish.", es: "Actualizaciones regulares en lenguaje claro, en inglés o español." },
    },
    {
      title: { en: "On time", es: "A tiempo" },
      description: { en: "Realistic timelines, agreed up front and delivered.", es: "Plazos realistas, acordados desde el inicio y cumplidos." },
    },
  ],
};

/* ───────────────────────── Skills & certifications ──────────────────── */

export const skills = {
  eyebrow: { en: "Skills & certifications", es: "Habilidades y certificaciones" },
  heading: { en: "The toolkit", es: "Las herramientas" },
  stackLabel: { en: "Core stack", es: "Stack principal" },
  certsLabel: { en: "Certifications", es: "Certificaciones" },
  stack: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "MongoDB", "Supabase", "Firebase", "Tailwind"],
  certifications: [
    { title: { en: "Google Cloud Infrastructure", es: "Google Cloud Infrastructure" }, issuer: "Google Cloud", year: "2025" },
    { title: { en: "Web & Mobile Development", es: "Desarrollo Web y Móvil" }, issuer: "Orange Digital Center x Simplon", year: "2022" },
    { title: { en: "Digital Marketing", es: "Marketing Digital" }, issuer: "Bluecrest College", year: "2021" },
  ],
};

/* ─────────────────────────────── Contact ────────────────────────────── */

export const budgetOptions = [
  { value: "under-1k", label: { en: "Under $1,000", es: "Menos de $1.000" } },
  { value: "1k-3k", label: { en: "$1,000 – $3,000", es: "$1.000 – $3.000" } },
  { value: "3k-7k", label: { en: "$3,000 – $7,000", es: "$3.000 – $7.000" } },
  { value: "7k-15k", label: { en: "$7,000 – $15,000", es: "$7.000 – $15.000" } },
  { value: "15k-plus", label: { en: "$15,000+", es: "$15.000+" } },
  { value: "not-sure", label: { en: "Not sure yet", es: "Aún no lo sé" } },
] as const;

export const timelineOptions = [
  { value: "asap", label: { en: "As soon as possible", es: "Lo antes posible" } },
  { value: "1-month", label: { en: "Within 1 month", es: "En 1 mes" } },
  { value: "1-3-months", label: { en: "1 – 3 months", es: "1 – 3 meses" } },
  { value: "3-plus-months", label: { en: "3+ months", es: "Más de 3 meses" } },
  { value: "flexible", label: { en: "Flexible", es: "Flexible" } },
] as const;

export const contact = {
  eyebrow: { en: "Contact", es: "Contacto" },
  heading: { en: "Let's build something that works", es: "Construyamos algo que funcione" },
  intro: {
    en: "Tell me about your project. I reply to every request within one business day with next steps.",
    es: "Cuéntame sobre tu proyecto. Respondo cada solicitud en un día hábil con los próximos pasos.",
  },
  /** Not displayed yet. Set `showEmail` to true once the mailbox is live. */
  email: "sylvanus@sylvanusfannah.com",
  showEmail: false,
  whatsapp: {
    display: "+1 (646) 934-8752",
    number: "16469348752",
    label: { en: "Chat on WhatsApp", es: "Escríbeme por WhatsApp" },
    prefill: {
      en: "Hi Sylvanus, I found your website and I'd like to talk about a project.",
      es: "Hola Sylvanus, vi tu sitio web y me gustaría hablar sobre un proyecto.",
    },
  },
  linkedin: {
    url: "https://www.linkedin.com/in/sylvanus-fannah-b2a896216",
    label: { en: "Connect on LinkedIn", es: "Conectar en LinkedIn" },
  },
  hours: { en: "Works in US-friendly hours.", es: "Horario compatible con EE. UU." },
  languages: { en: "Projects in English and Spanish.", es: "Proyectos en inglés y español." },
  form: {
    name: { en: "Name", es: "Nombre" },
    email: { en: "Email", es: "Correo electrónico" },
    company: { en: "Company (optional)", es: "Empresa (opcional)" },
    service: { en: "Service", es: "Servicio" },
    servicePlaceholder: { en: "Select a service", es: "Selecciona un servicio" },
    budget: { en: "Budget range", es: "Presupuesto" },
    budgetPlaceholder: { en: "Select a range", es: "Selecciona un rango" },
    timeline: { en: "Timeline", es: "Plazo" },
    timelinePlaceholder: { en: "Select a timeline", es: "Selecciona un plazo" },
    message: { en: "Project description", es: "Descripción del proyecto" },
    messagePlaceholder: {
      en: "What are you building, who is it for, and what does success look like?",
      es: "¿Qué quieres construir, para quién es y cómo se ve el éxito?",
    },
    submit: { en: "Send request", es: "Enviar solicitud" },
    submitting: { en: "Sending…", es: "Enviando…" },
    privacy: {
      en: "Your details are only used to reply to your request.",
      es: "Tus datos solo se usan para responder a tu solicitud.",
    },
    success: {
      en: "Thank you — your request is in. I'll get back to you within one business day.",
      es: "Gracias — recibí tu solicitud. Te responderé en un día hábil.",
    },
    errors: {
      generic: {
        en: "Something went wrong. Please try again, or message me on WhatsApp.",
        es: "Algo salió mal. Inténtalo de nuevo o escríbeme por WhatsApp.",
      },
      validation: { en: "Please check the highlighted fields.", es: "Revisa los campos marcados." },
      rateLimit: {
        en: "Too many requests. Please wait a few minutes and try again.",
        es: "Demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo.",
      },
      captcha: {
        en: "Please complete the verification and try again.",
        es: "Completa la verificación e inténtalo de nuevo.",
      },
      unavailable: {
        en: "The quote form isn't connected yet. Please reach me on WhatsApp or LinkedIn in the meantime.",
        es: "El formulario aún no está conectado. Mientras tanto, contáctame por WhatsApp o LinkedIn.",
      },
    },
    fieldErrors: {
      name: { en: "Please enter your name.", es: "Ingresa tu nombre." },
      email: { en: "Please enter a valid email.", es: "Ingresa un correo válido." },
      company: { en: "Company name is too long.", es: "El nombre de la empresa es muy largo." },
      service: { en: "Please choose a service.", es: "Elige un servicio." },
      budget: { en: "Please choose a budget range.", es: "Elige un rango de presupuesto." },
      timeline: { en: "Please choose a timeline.", es: "Elige un plazo." },
      message: {
        en: "Please describe your project (at least 20 characters).",
        es: "Describe tu proyecto (al menos 20 caracteres).",
      },
    },
  },
};

/* ─────────────────────────────── Footer ─────────────────────────────── */

export const footer = {
  line: {
    en: "Full-stack developer & founder. Building systems that work, for clients worldwide.",
    es: "Desarrollador full-stack y fundador. Construyendo sistemas que funcionan, para clientes en todo el mundo.",
  },
  rights: { en: "All rights reserved.", es: "Todos los derechos reservados." },
  backToTop: { en: "Back to top", es: "Volver arriba" },
};

export const ui = {
  languageToggle: { en: "Español", es: "English" },
  languageToggleLabel: { en: "Ver en español", es: "View in English" },
  skipToContent: { en: "Skip to content", es: "Saltar al contenido" },
  menu: { en: "Menu", es: "Menú" },
  close: { en: "Close", es: "Cerrar" },
};

export const content = {
  site,
  nav,
  hero,
  services,
  caseStudies,
  ventures,
  about,
  skills,
  contact,
  footer,
  ui,
};
