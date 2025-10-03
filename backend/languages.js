// Çok dil desteği - Finlandiya göçmen oryantasyonu
const languages = {
  fi: {
    // Fince
    welcome: "Tervetuloa Suomeen!",
    navigation: "Navigointi",
    courses: "Kurssit",
    services: "Palvelut", 
    profile: "Profiili",
    login: "Kirjaudu sisään",
    register: "Rekisteröidy",
    logout: "Kirjaudu ulos",
    chatbot: "Chat-assistentti",
    
    // Kurssit
    coursesTitle: "Suomen kielen kurssit ja integraatiokoulutus",
    coursesDescription: "Löydä sopiva kurssi suomen kielen oppimiseen ja Suomen yhteiskunnan tuntemiseen",
    
    // Palvelut
    servicesTitle: "Julkiset palvelut ja virastot",
    servicesDescription: "Tärkeimmät virastot ja palvelut uusille asukkaille",
    
    // Chatbot viestit
    chatGreeting: "Hei! Olen sinun henkilökohtainen assistenttisi Suomessa. Kuinka voin auttaa sinua?",
    chatCourseHelp: "Suomen kielen kursseja on saatavilla eri tasoille. TE-toimistosta saat lisätietoja ja mahdollisesti maksutonta koulutusta.",
    chatServiceHelp: "Tärkeimmät virastot ovat Maistraatti (väestökirjanpito), TE-toimisto (työ), Kela (sosiaaliturva) ja verotoimisto.",
    chatGeneralHelp: "Voin kertoa Suomen kursseista, julkisista palveluista, tai yleisesti elämästä Suomessa. Mitä sinua kiinnostaa?",
    
    // Virheet
    errorLogin: "Kirjautuminen epäonnistui",
    errorRegistration: "Rekisteröinti epäonnistui",
    errorGeneral: "Jotain meni pieleen"
  },
  
  en: {
    // English
    welcome: "Welcome to Finland!",
    navigation: "Navigation", 
    courses: "Courses",
    services: "Services",
    profile: "Profile", 
    login: "Login",
    register: "Register",
    logout: "Logout",
    chatbot: "Chat Assistant",
    
    // Courses
    coursesTitle: "Finnish Language Courses & Integration Training",
    coursesDescription: "Find the right course to learn Finnish and understand Finnish society",
    
    // Services  
    servicesTitle: "Public Services & Authorities",
    servicesDescription: "Essential authorities and services for new residents",
    
    // Chatbot messages
    chatGreeting: "Hello! I'm your personal assistant for life in Finland. How can I help you?",
    chatCourseHelp: "Finnish language courses are available for different levels. Contact the TE office for more information and possibly free training.",
    chatServiceHelp: "The most important authorities are the Digital and Population Data Services Agency (civil registration), TE office (employment), Kela (social security), and the Tax Administration.",
    chatGeneralHelp: "I can tell you about Finnish courses, public services, or life in Finland in general. What interests you?",
    
    // Errors
    errorLogin: "Login failed",
    errorRegistration: "Registration failed", 
    errorGeneral: "Something went wrong"
  },
  
  tr: {
    // Türkçe
    welcome: "Finlandiya'ya Hoş Geldiniz!",
    navigation: "Navigasyon",
    courses: "Kurslar", 
    services: "Hizmetler",
    profile: "Profil",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    logout: "Çıkış Yap", 
    chatbot: "Sohbet Asistanı",
    
    // Kurslar
    coursesTitle: "Fince Dil Kursları ve Entegrasyon Eğitimi",
    coursesDescription: "Fince öğrenmek ve Fin toplumunu anlamak için uygun kursu bulun",
    
    // Hizmetler
    servicesTitle: "Kamu Hizmetleri ve Kurumlar", 
    servicesDescription: "Yeni sakinler için önemli kurumlar ve hizmetler",
    
    // Chatbot mesajları
    chatGreeting: "Merhaba! Ben Finlandiya'daki yaşamınız için kişisel asistanınızım. Size nasıl yardımcı olabilirim?",
    chatCourseHelp: "Farklı seviyeler için Fince dil kursları mevcuttur. TE ofisinden daha fazla bilgi ve ücretsiz eğitim alabilirsiniz.",
    chatServiceHelp: "En önemli kurumlar Nüfus İdaresi (nüfus kaydı), TE ofisi (iş), Kela (sosyal güvenlik) ve Vergi İdaresi'dir.",
    chatGeneralHelp: "Size Fince kursları, kamu hizmetleri veya genel olarak Finlandiya'daki yaşam hakkında bilgi verebilirim. Sizi ne ilgilendiriyor?",
    
    // Hatalar  
    errorLogin: "Giriş başarısız",
    errorRegistration: "Kayıt başarısız",
    errorGeneral: "Bir şeyler yanlış gitti"
  },
  
  ar: {
    // العربية
    welcome: "أهلاً بكم في فنلندا!",
    navigation: "التنقل",
    courses: "الدورات",
    services: "الخدمات", 
    profile: "الملف الشخصي",
    login: "تسجيل الدخول",
    register: "التسجيل",
    logout: "تسجيل الخروج",
    chatbot: "مساعد الدردشة",
    
    // الدورات
    coursesTitle: "دورات اللغة الفنلندية والتدريب على الاندماج",
    coursesDescription: "ابحث عن الدورة المناسبة لتعلم الفنلندية وفهم المجتمع الفنلندي",
    
    // الخدمات
    servicesTitle: "الخدمات العامة والسلطات",
    servicesDescription: "السلطات والخدمات الأساسية للسكان الجدد",
    
    // رسائل الشات بوت
    chatGreeting: "مرحباً! أنا مساعدكم الشخصي للحياة في فنلندا. كيف يمكنني مساعدتكم؟",
    chatCourseHelp: "تتوفر دورات اللغة الفنلندية لمستويات مختلفة. اتصلوا بمكتب TE للحصول على مزيد من المعلومات والتدريب المجاني.",
    chatServiceHelp: "أهم السلطات هي وكالة البيانات الرقمية والسكانية (التسجيل المدني)، مكتب TE (العمالة)، كيلا (الضمان الاجتماعي)، وإدارة الضرائب.",
    chatGeneralHelp: "يمكنني إخباركم عن الدورات الفنلندية أو الخدمات العامة أو الحياة في فنلندا بشكل عام. ما الذي يهمكم؟",
    
    // الأخطاء
    errorLogin: "فشل تسجيل الدخول",
    errorRegistration: "فشل التسجيل", 
    errorGeneral: "حدث خطأ ما"
  }
};

// Dil tespiti ve varsayılan dil
function detectLanguage(req) {
  const acceptLanguage = req.headers['accept-language'];
  const langHeader = req.headers['x-language'] || req.query.lang;
  
  if (langHeader && languages[langHeader]) {
    return langHeader;
  }
  
  if (acceptLanguage) {
    // fi, en, tr, ar öncelikli
    if (acceptLanguage.includes('fi')) return 'fi';
    if (acceptLanguage.includes('tr')) return 'tr'; 
    if (acceptLanguage.includes('ar')) return 'ar';
    if (acceptLanguage.includes('en')) return 'en';
  }
  
  return 'en'; // Varsayılan İngilizce
}

function getTranslations(langCode) {
  return languages[langCode] || languages.en;
}

function getAllLanguages() {
  return Object.keys(languages);
}

module.exports = {
  detectLanguage,
  getTranslations, 
  getAllLanguages,
  languages
};