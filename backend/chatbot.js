// SOUAI Chatbot - Multilingual Finland Immigration Assistant
// Finlandiya göçmen oryantasyonu için çok dilli asistan

const { detectLanguage, getTranslations } = require('./languages');

class FinlandImmigrationChatbot {
  constructor() {
    this.context = {
      user: null,
      conversation: [],
      currentLanguage: 'en'
    };
    
    // Finlandiya göçmen oryantasyonu FAQ veritabanı
    this.faqDatabase = {
      fi: {
        'kurssi': 'Kotoutumiskurssit ovat ilmaisia EU/ETA-kansalaisille ja pakolaisille. TE-toimistosta saat lisätietoja.',
        'suomenkieli': 'Suomen kielen kursseja eri tasoille: A1 (aloittelijat), A2 (perustaso), B1 (keskitaso), B2 (hyvä taso).',
        'työpaikka': 'TE-toimisto auttaa työnhaussa. Tarvitset henkilötunnuksen ja verokortin ennen töiden aloittamista.',
        'kela': 'Kela maksaa toimeentulotukea, asumistukea ja lapsilisiä. Hae heti Suomeen saapuessasi.',
        'asuminen': 'Vuokra-asuntoja löydät oikotie.fi, vuokraovi.com sivustoilta. Tarvitset takuuvuokran.',
        'terveys': 'Terveyspalvelut: Ota yhteyttä lähimpään terveyskeskukseen. EU-kortti tai vakuutus tarvitaan.',
        'verot': 'Hanki verokortti verottajalta ennen töiden aloittamista. Tarvitset henkilötunnuksen.',
        'lapset': 'Koulut ovat ilmaisia. Ilmoita lapsesi kouluun asuinalueen kouluviranomaisille.',
        'pankki': 'Avaa pankkitili henkilötunnuksella. Tarvitset passin ja osoitetodistuksen.',
        'liikenne': 'Julkinen liikenne: HSL (Helsinki), TKL (Tampere), TurkuBus (Turku). Kuukausilippu 50-60€.'
      },
      en: {
        'course': 'Integration courses are free for EU/EEA citizens and refugees. Contact TE office for more information.',
        'finnish': 'Finnish language courses for different levels: A1 (beginners), A2 (basic), B1 (intermediate), B2 (good level).',
        'work': 'TE office helps with job searching. You need personal ID and tax card before starting work.',
        'kela': 'Kela pays income support, housing allowance and child benefits. Apply immediately upon arrival.',
        'housing': 'Find rental apartments on oikotie.fi, vuokraovi.com. You need a security deposit.',
        'health': 'Health services: Contact nearest health center. EU card or insurance required.',
        'taxes': 'Get a tax card from tax office before starting work. You need personal ID number.',
        'children': 'Schools are free. Register your child to school with local education authorities.',
        'bank': 'Open bank account with personal ID. You need passport and address proof.',
        'transport': 'Public transport: HSL (Helsinki), TKL (Tampere), TurkuBus (Turku). Monthly ticket 50-60€.'
      },
      tr: {
        'kurs': 'AB/AEA vatandaşları ve mülteciler için entegrasyon kursları ücretsizdir. TE ofisinden bilgi alın.',
        'fince': 'Farklı seviyeler için Fince dil kursları: A1 (başlangıç), A2 (temel), B1 (orta), B2 (iyi seviye).',
        'iş': 'TE ofisi iş aramada yardımcı olur. İşe başlamadan önce kişisel kimlik numarası ve vergi kartı gerekli.',
        'kela': 'Kela geçim desteği, konut yardımı ve çocuk yardımı öder. Gelir gelmez başvurun.',
        'konut': 'Kiralık daireler oikotie.fi, vuokraovi.com sitelerinde. Depozito gerekli.',
        'sağlık': 'Sağlık hizmetleri: En yakın sağlık merkezine başvurun. AB kartı veya sigorta gerekli.',
        'vergi': 'İşe başlamadan önce vergi dairesinden vergi kartı alın. Kişisel kimlik numarası gerekli.',
        'çocuklar': 'Okullar ücretsizdir. Çocuğunuzu yerel eğitim otoritelerine kaydedin.',
        'banka': 'Kişisel kimlik numarasıyla banka hesabı açın. Pasaport ve adres belgesi gerekli.',
        'ulaşım': 'Toplu taşıma: HSL (Helsinki), TKL (Tampere), TurkuBus (Turku). Aylık bilet 50-60€.'
      },
      ar: {
        'دورة': 'دورات الاندماج مجانية لمواطني الاتحاد الأوروبي واللاجئين. اتصل بمكتب TE للمعلومات.',
        'فنلندية': 'دورات اللغة الفنلندية لمستويات مختلفة: A1 (مبتدئ)، A2 (أساسي)، B1 (متوسط)، B2 (مستوى جيد).',
        'عمل': 'مكتب TE يساعد في البحث عن عمل. تحتاج رقم هوية شخصي وبطاقة ضريبية قبل بدء العمل.',
        'كيلا': 'تدفع كيلا دعم المعيشة وبدل السكن وإعانات الأطفال. تقدم فور الوصول.',
        'سكن': 'ابحث عن شقق للإيجار في oikotie.fi، vuokraovi.com. تحتاج وديعة أمان.',
        'صحة': 'الخدمات الصحية: اتصل بأقرب مركز صحي. مطلوب بطاقة الاتحاد الأوروبي أو التأمين.',
        'ضرائب': 'احصل على بطاقة ضريبية من مصلحة الضرائب قبل بدء العمل. تحتاج رقم هوية شخصي.',
        'أطفال': 'المدارس مجانية. سجل طفلك في المدرسة مع السلطات التعليمية المحلية.',
        'بنك': 'افتح حساب بنكي برقم الهوية الشخصي. تحتاج جواز سفر وإثبات عنوان.',
        'نقل': 'النقل العام: HSL (هلسنكي)، TKL (تامبيري)، TurkuBus (توركو). تذكرة شهرية 50-60€.'
      }
    };

    // Çok dilli anahtar kelimeler
    this.intentKeywords = {
      greeting: {
        fi: ['hei', 'moi', 'terve', 'päivää', 'huomenta'],
        en: ['hello', 'hi', 'good morning', 'good day'],
        tr: ['merhaba', 'selam', 'iyi günler', 'günaydın'],
        ar: ['مرحبا', 'أهلا', 'السلام عليكم', 'صباح الخير']
      },
      course: {
        fi: ['kurssi', 'opiskelu', 'suomen kieli', 'kotoutuminen'],
        en: ['course', 'study', 'finnish language', 'integration'],
        tr: ['kurs', 'ders', 'fince dili', 'entegrasyon'],
        ar: ['دورة', 'دراسة', 'اللغة الفنلندية', 'اندماج']
      },
      work: {
        fi: ['työ', 'työpaikka', 'te-toimisto', 'cv', 'hakemus'],
        en: ['work', 'job', 'employment', 'te office', 'cv', 'application'],
        tr: ['iş', 'çalışma', 'te ofisi', 'cv', 'başvuru'],
        ar: ['عمل', 'وظيفة', 'مكتب TE', 'سيرة ذاتية', 'طلب']
      },
      services: {
        fi: ['kela', 'maistraatti', 'verottaja', 'palvelut'],
        en: ['kela', 'digital services', 'tax office', 'services'],
        tr: ['kela', 'maistraatti', 'vergi dairesi', 'hizmetler'],
        ar: ['كيلا', 'الخدمات الرقمية', 'مصلحة الضرائب', 'خدمات']
      },
      housing: {
        fi: ['asunto', 'vuokra', 'asuminen', 'koti'],
        en: ['apartment', 'rent', 'housing', 'home'],
        tr: ['daire', 'kira', 'konut', 'ev'],
        ar: ['شقة', 'إيجار', 'سكن', 'منزل']
      },
      health: {
        fi: ['terveys', 'lääkäri', 'sairaala', 'terveyskeskus'],
        en: ['health', 'doctor', 'hospital', 'health center'],
        tr: ['sağlık', 'doktor', 'hastane', 'sağlık merkezi'],
        ar: ['صحة', 'طبيب', 'مستشفى', 'مركز صحي']
      }
    };
  }

  // Dil algılama ve mesaj işleme
  async processChatMessage(message, language = 'en', userId = null) {
    try {
      this.context.currentLanguage = language;
      const translations = getTranslations(language);
      
      // Intent tespit etme
      const intent = this.detectIntent(message, language);
      
      // Uygun yanıt oluşturma
      const response = this.generateResponse(intent, message, language, translations);
      
      // FAQ arama 
      const faqResults = this.searchFAQ(message, language);
      
      // Önerilen aksiyonlar
      const suggestedActions = this.getSuggestedActions(intent, language, translations);
      
      return {
        success: true,
        response: response,
        intent: intent,
        language: language,
        faqResults: faqResults,
        suggestedActions: suggestedActions,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Chatbot error:', error);
      const translations = getTranslations(language);
      return {
        success: false,
        response: translations.errorGeneral || 'Something went wrong',
        error: error.message
      };
    }
  }

  // Intent tespiti
  detectIntent(message, language) {
    const lowerMessage = message.toLowerCase();
    
    for (const [intentName, keywords] of Object.entries(this.intentKeywords)) {
      const langKeywords = keywords[language] || keywords.en;
      
      for (const keyword of langKeywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          return intentName;
        }
      }
    }
    
    return 'general';
  }

  // Yanıt oluşturma
  generateResponse(intent, message, language, translations) {
    const responses = {
      greeting: {
        fi: `${translations.chatGreeting || 'Hei! Olen assistenttisi Suomessa.'}`,
        en: `${translations.chatGreeting || 'Hello! I am your assistant for life in Finland.'}`,
        tr: `${translations.chatGreeting || 'Merhaba! Finlandiya\'daki yaşamınız için asistanınızım.'}`,
        ar: `${translations.chatGreeting || 'مرحباً! أنا مساعدكم للحياة في فنلندا.'}`
      },
      course: {
        fi: translations.chatCourseHelp || 'Suomen kielen kursseja on saatavilla eri tasoille.',
        en: translations.chatCourseHelp || 'Finnish language courses are available for different levels.',
        tr: translations.chatCourseHelp || 'Farklı seviyeler için Fince dil kursları mevcuttur.',
        ar: translations.chatCourseHelp || 'تتوفر دورات اللغة الفنلندية لمستويات مختلفة.'
      },
      work: {
        fi: 'TE-toimisto auttaa työnhaussa. Tarvitset henkilötunnuksen ja verokortin.',
        en: 'TE office helps with job searching. You need personal ID and tax card.',
        tr: 'TE ofisi iş aramada yardımcı olur. Kişisel kimlik numarası ve vergi kartı gerekli.',
        ar: 'مكتب TE يساعد في البحث عن عمل. تحتاج رقم هوية شخصي وبطاقة ضريبية.'
      },
      services: {
        fi: translations.chatServiceHelp || 'Tärkeimmät virastot ovat Maistraatti, TE-toimisto, Kela ja verotoimisto.',
        en: translations.chatServiceHelp || 'The most important authorities are Maistraatti, TE office, Kela and Tax office.',
        tr: translations.chatServiceHelp || 'En önemli kurumlar Maistraatti, TE ofisi, Kela ve Vergi dairesidir.',
        ar: translations.chatServiceHelp || 'أهم السلطات هي Maistraatti ومكتب TE و Kela ومصلحة الضرائب.'
      },
      housing: {
        fi: 'Vuokra-asuntoja löydät oikotie.fi ja vuokraovi.com sivustoilta. Tarvitset takuuvuokran.',
        en: 'Find rental apartments on oikotie.fi and vuokraovi.com. You need a security deposit.',
        tr: 'Kiralık daireler oikotie.fi ve vuokraovi.com sitelerinde. Depozito gerekli.',
        ar: 'ابحث عن شقق للإيجار في oikotie.fi و vuokraovi.com. تحتاج وديعة أمان.'
      },
      health: {
        fi: 'Terveyspalvelut: Ota yhteyttä lähimpään terveyskeskukseen. EU-kortti tai vakuutus tarvitaan.',
        en: 'Health services: Contact nearest health center. EU card or insurance required.',
        tr: 'Sağlık hizmetleri: En yakın sağlık merkezine başvurun. AB kartı veya sigorta gerekli.',
        ar: 'الخدمات الصحية: اتصل بأقرب مركز صحي. مطلوب بطاقة الاتحاد الأوروبي أو التأمين.'
      },
      general: {
        fi: translations.chatGeneralHelp || 'Voin kertoa Suomen kursseista, palveluista tai elämästä Suomessa.',
        en: translations.chatGeneralHelp || 'I can tell you about Finnish courses, services, or life in Finland.',
        tr: translations.chatGeneralHelp || 'Size Fince kursları, hizmetler veya Finlandiya\'daki yaşam hakkında bilgi verebilirim.',
        ar: translations.chatGeneralHelp || 'يمكنني إخباركم عن الدورات الفنلندية أو الخدمات أو الحياة في فنلندا.'
      }
    };

    return responses[intent][language] || responses[intent].en || responses.general[language];
  }

  // FAQ arama
  searchFAQ(query, language) {
    const faqData = this.faqDatabase[language] || this.faqDatabase.en;
    const results = [];
    
    const lowerQuery = query.toLowerCase();
    for (const [key, answer] of Object.entries(faqData)) {
      if (lowerQuery.includes(key) || answer.toLowerCase().includes(lowerQuery)) {
        results.push({
          question: key,
          answer: answer
        });
      }
    }
    
    return results.slice(0, 3); // En fazla 3 sonuç
  }

  // Önerilen aksiyonlar
  getSuggestedActions(intent, language, translations) {
    const actions = {
      greeting: [
        { text: translations.courses || 'Courses', action: 'view_courses' },
        { text: translations.services || 'Services', action: 'view_services' }
      ],
      course: [
        { text: translations.courses || 'View Courses', action: 'view_courses' },
        { text: 'A1 Level', action: 'course_a1' }
      ],
      work: [
        { text: 'TE Office', action: 'te_office' },
        { text: 'CV Builder', action: 'cv_builder' }
      ],
      services: [
        { text: 'Kela', action: 'kela_info' },
        { text: 'Maistraatti', action: 'maistraatti_info' }
      ],
      housing: [
        { text: 'Housing Search', action: 'housing_search' },
        { text: 'Rental Guide', action: 'rental_guide' }
      ],
      health: [
        { text: 'Health Centers', action: 'health_centers' },
        { text: 'Emergency', action: 'emergency_info' }
      ]
    };

    return actions[intent] || [
      { text: translations.courses || 'Courses', action: 'view_courses' },
      { text: translations.services || 'Services', action: 'view_services' }
    ];
  }
}

module.exports = {
  FinlandImmigrationChatbot,
  processChatMessage: async (message, language = 'en', userId = null) => {
    const chatbot = new FinlandImmigrationChatbot();
    return await chatbot.processChatMessage(message, language, userId);
  }
};