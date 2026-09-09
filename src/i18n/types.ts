export type Locale = 'es' | 'en';

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export type FeatureItem = { icon: string; title: string; description: string };

export type FaqItem = { question: string; answer: string };

export type HomeTourItem = {
  title: string;
  price: string;
  duration: string;
  type: string;
  difficulty: string;
  availability: string;
  image: string;
  href: string;
};

export type ExperienceItem = {
  title: string;
  description: string;
  bullets: string[];
  images: string[];
};

export type TrendingItem = {
  title: string;
  description: string;
  ideal: string;
  image: string;
  href: string;
};

export type DestinationItem = {
  title: string;
  location: string;
  image: string;
  href: string;
};

export type SocialVideoCaption = { id: string; caption: string };

export type LegalPageContent = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export type CookieCategoryCopy = { title: string; description: string };

export type Dictionary = {
  locale: Locale;
  skipLink: string;
  cookies: {
    title: string;
    description: string;
    policyLink: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    save: string;
    close: string;
    alwaysOn: string;
    settingsLabel: string;
    necessary: CookieCategoryCopy;
    analytics: CookieCategoryCopy;
    marketing: CookieCategoryCopy;
  };
  nav: {
    askNow: string;
    about: string;
    openMenu: string;
    closeMenu: string;
    loginWithGoogle: string;
    logout: string;
    loggedInAs: string;
    items: NavItem[];
  };
  footer: {
    tagline: string;
    navigation: string;
    contacts: string;
    schedule: string;
    officeHours: string;
    paymentMethods: string;
    rights: string;
    links: NavChild[];
  };
  hero: {
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    subtitle: string;
    subtitleLong: string;
    cta: string;
    viewTours: string;
    scroll: string;
  };
  sections: {
    whyUs: string;
    stories: string;
    tours: string;
    experiences: string;
    experiencesSub: string;
    trending: string;
    trendingSub: string;
    destinations: string;
    testimonials: string;
    faq: string;
    faqSub: string;
    videos: string;
    legal: string;
    quote: string;
    quoteAuthor: string;
  };
  features: FeatureItem[];
  featuresUi: {
    badge: string;
    title: string;
    subtitle: string;
  };
  faq: FaqItem[];
  faqUi: {
    badge: string;
    title: string;
    subtitle: string;
    telling: string;
    wondering: string;
  };
  tour: {
    from: string;
    duration: string;
    type: string;
    difficulty: string;
    availability: string;
    allYear: string;
    details: string;
    highlights: string;
    itinerary: string;
    includes: string;
    excludes: string;
    recommendations: string;
    gallery: string;
    bookNow: string;
    interested: string;
    bookWhatsapp: string;
    watchVideos: string;
    related: string;
    backHome: string;
    testimonials: string;
    certified: string;
    transport: string;
    smallGroups: string;
    deposit: string;
    enlarge: string;
    photo: string;
    prevPhoto: string;
    nextPhoto: string;
    closeGallery: string;
  };
  booking: {
    reserveBtn: string;
    formTitle: string;
    requiredNote: string;
    firstName: string;
    lastName: string;
    whatsappFieldLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendBtn: string;
    sendEmailBtn: string;
    emailSubject: string;
    sending: string;
    leadSent: string;
    leadError: string;
    whyTitle: string;
    whyCarouselAlt: string;
    prevPhoto: string;
    nextPhoto: string;
    photo: string;
    whatsappGreeting: string;
    tourLabel: string;
    priceLabel: string;
    nameLabel: string;
    benefits: { icon: BookingBenefitIconId; title: string; text: string }[];
  };
  about: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    sectionTitle: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    galleryNote: string;
    followFb: string;
    ctaTitle: string;
    ctaBtn: string;
    backHome: string;
    sections: { title: string; text: string }[];
    heroAlt: string;
  };
  common: {
    readMore: string;
    idealFor: string;
    viewTour: string;
    explore: string;
  };
  marquee: string[];
  welcome: { welcomeTo: string; tagline: string; llamaAlt: string };
  stories: {
    badge: string;
    title: string;
    titleHighlight: string;
    p1: string;
    p1Bold: string;
    p1Rest: string;
    p2: string;
    p2Bold: string;
    cta: string;
    cardLine1: string;
    cardLine2: string;
    statLabel: string;
    imageAlt: string;
  };
  toursCarousel: {
    badge: string;
    title: string;
    subtitle: string;
    viewTourAria: string;
  };
  homeTours: HomeTourItem[];
  experiencesUi: { badge: string; discoverNow: string };
  experiences: ExperienceItem[];
  trendingUi: { badge: string; trendingLabel: string; idealPrefix: string };
  trending: TrendingItem[];
  destinationsUi: { badge: string; subtitle: string };
  destinations: DestinationItem[];
  testimonialsUi: { badge: string; subtitle: string; altPrefix: string };
  legal: {
    badge: string;
    title: string;
    body: string;
    safeTravelsAlt: string;
    responsibleAlt: string;
  };
  videosUi: {
    title: string;
    subtitle: string;
    play: string;
    playVideoPrefix: string;
    close: string;
    prev: string;
    next: string;
    fullscreen: string;
    controlsLabel: string;
    videoPlayerLabel: string;
    openFacebook: string;
    openTiktok: string;
    openYoutube: string;
    openInstagram: string;
    seeMore: string;
    followUs: string;
  };
  socialVideos: SocialVideoCaption[];
  pages: { privacy: LegalPageContent; terms: LegalPageContent };
  whatsapp: { greeting: string; help: string; label: string };
};

export type BookingBenefitIconId =
  | 'experts'
  | 'schedule'
  | 'personal'
  | 'price'
  | 'transport'
  | 'whatsapp'
  | 'guides';
