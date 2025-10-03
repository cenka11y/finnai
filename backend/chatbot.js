// SOUAI Chatbot - Intelligent Assistant
// Kullanıcı yardım ve rehberlik sistemi

const { User, Course, Service } = require('./database');

// Chatbot mesaj kategorileri ve intent tanıma
const INTENTS = {
    // Selamlama
    GREETING: {
        keywords: ['moi', 'hei', 'terve', 'hello', 'hi', 'merhaba', 'selam'],
        responses: [
            'Moi! SOUAI asistanınız burada! Size nasıl yardımcı olabilirim? 😊',
            'Hei! Hoş geldiniz! SOUAI platformu hakkında sorularınızı yanıtlayabilirim.',
            'Terve! Size Finlandiya\'da yaşam ve Fin dili öğrenme konularında yardımcı olabilirim.'
        ]
    },

    // Kurs soruları
    COURSE_INQUIRY: {
        keywords: ['kurs', 'course', 'oppi', 'suomi', 'finnish', 'öğren', 'study', 'lesson'],
        responses: [
            'Fin dili kurslarımız CEFR standartlarına göre A1\'den B2\'ye kadar seviyelerde mevcut. Hangi seviyede başlamak istersiniz?',
            'Mevcut kurslarımızı görmek için kurs listesini kontrol edebilirsiniz. Size uygun seviyeyi tespit etmek için seviye testiyle başlayabilirsiniz.'
        ]
    },

    // CV konuları
    CV_HELP: {
        keywords: ['cv', 'ansioluettelo', 'resume', 'iş', 'work', 'työ', 'hakemus', 'application'],
        responses: [
            'CV Builder ile Finlandiya iş piyasasına uygun CV\'nizi oluşturabilirsiniz. Hem Fince hem İngilizce versiyonlar hazırlayabiliriz.',
            'Finlandiya\'da iş başvurusu yaparken CV\'nizde önemli olan detayları size rehberlik edebilirim.'
        ]
    },

    // Belediye hizmetleri
    MUNICIPAL_SERVICES: {
        keywords: ['belediye', 'kunta', 'hizmet', 'service', 'maistraatti', 'kela', 'te-palvelut', 'dvv'],
        responses: [
            'Finlandiya\'da çeşitli kamu hizmetleri mevcuttur. Hangi konuda bilgiye ihtiyacınız var? (Kela, TE-palvelut, Maistraatti, vb.)',
            'Belediye hizmetleri bölümünden ihtiyacınız olan hizmetleri bulabilirsiniz. Size en yakın hizmet noktalarını gösterebilirim.'
        ]
    },

    // Dil seviyesi
    LANGUAGE_LEVEL: {
        keywords: ['seviye', 'level', 'a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'cefr', 'testi', 'test'],
        responses: [
            'CEFR seviye sistemi: A1-A2 (Temel), B1-B2 (Orta), C1-C2 (İleri). Hangi seviyedesiniz?',
            'Seviye testimizle mevcut Fin dili seviyenizi belirleyebilir ve size uygun kursları önerebilirim.'
        ]
    },

    // Genel yardım
    HELP: {
        keywords: ['yardım', 'help', 'apu', 'nasıl', 'how', 'ne', 'what', 'miten', 'mikä'],
        responses: [
            'Size şu konularda yardımcı olabilirim:\n• Fin dili kursları\n• CV hazırlama\n• Belediye hizmetleri\n• Finlandiya yaşam rehberliği\n\nHangi konuda yardıma ihtiyacınız var?',
            'SOUAI platformunda kaybolmuş gibi mi hissediyorsunuz? Size adım adım rehberlik edebilirim!'
        ]
    },

    // Finlandiya yaşam
    LIFE_IN_FINLAND: {
        keywords: ['finlandiya', 'finland', 'suomi', 'yaşam', 'life', 'elämä', 'kültür', 'culture'],
        responses: [
            'Finlandiya\'da yaşam hakkında merak ettiklerinizi yanıtlayabilirim. Sosyal haklar, iş bulma, eğitim sistemi gibi konularda yardımcı olabilirim.',
            'Finlandiya\'ya yeni gelmiş gibi görünüyorsunuz! Size en önemli bilgileri paylaşabilirim.'
        ]
    }
};

// Intent tanıma fonksiyonu
function detectIntent(message) {
    const cleanMessage = message.toLowerCase().trim();
    
    for (const [intentName, intent] of Object.entries(INTENTS)) {
        for (const keyword of intent.keywords) {
            if (cleanMessage.includes(keyword)) {
                return {
                    intent: intentName,
                    confidence: 0.8,
                    responses: intent.responses
                };
            }
        }
    }
    
    return {
        intent: 'UNKNOWN',
        confidence: 0.1,
        responses: [
            'Özür dilerim, bu konuda size nasıl yardımcı olacağımı tam anlayamadım. Şu konularda yardımcı olabilirim: kurslar, CV, belediye hizmetleri, Finlandiya yaşamı.',
            'Bu sorunuzu daha açık bir şekilde sorabilir misiniz? Size en iyi şekilde yardımcı olmak istiyorum! 😊'
        ]
    };
}

// Özelleştirilmiş yanıt oluşturma
async function generatePersonalizedResponse(intent, message, userId = null) {
    let response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
    
    // Kullanıcı varsa kişiselleştirilmiş öneriler
    if (userId) {
        try {
            const user = await User.findById(userId);
            const profile = await User.getProfile(userId);
            
            if (intent.intent === 'COURSE_INQUIRY') {
                const courses = await Course.findAll();
                const userLevel = profile?.currentCEFRLevel || 'A1';
                const recommendedCourse = courses.find(c => c.cefrLevel === userLevel);
                
                if (recommendedCourse) {
                    response += `\n\n💡 Size özel öneri: "${recommendedCourse.title.fi}" kursu seviyenize uygun görünüyor!`;
                }
            }
            
            if (intent.intent === 'MUNICIPAL_SERVICES') {
                const services = await Service.findAll({ 
                    city: profile?.city || 'Helsinki' 
                });
                
                if (services.length > 0) {
                    response += `\n\n📍 ${profile?.city || 'Helsinki'} için ${services.length} hizmet bulundu.`;
                }
            }
            
        } catch (error) {
            console.log('User data fetch error:', error);
        }
    }
    
    return response;
}

// FAQ database
const FAQ_DATA = [
    {
        question: "SOUAI platformu nedir?",
        answer: "SOUAI, Finlandiya'da yaşayan göçmenler için kapsamlı bir dijital platform. Fin dili öğrenme, iş bulma ve günlük yaşam konularında yardım sağlar."
    },
    {
        question: "Kurslar ücretsiz mi?",
        answer: "Evet! Tüm Fin dili kurslarımız ücretsizdir. Finlandiya devletinin desteğiyle sunulmaktadır."
    },
    {
        question: "Seviye testini nasıl yapabilirim?",
        answer: "Ana sayfadan 'Seviye Testi' butonuna tıklayarak 15 dakikalık değerlendirmeyi tamamlayabilirsiniz."
    },
    {
        question: "CV'mi nasıl oluştururum?",
        answer: "CV Builder bölümüne giderek adım adım CV'nizi oluşturabilirsiniz. Hem Fince hem İngilizce versiyonlar hazırlayabilirsiniz."
    },
    {
        question: "Belediye hizmetleri nasıl bulurum?",
        answer: "Hizmetler bölümünden şehrinizi seçerek size en yakın kamu hizmetlerini görüntüleyebilirsiniz."
    }
];

// FAQ arama
function searchFAQ(query) {
    const results = FAQ_DATA.filter(faq => 
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase())
    );
    
    return results.slice(0, 3); // En fazla 3 sonuç
}

// Ana chatbot işleyici
async function processChatMessage(message, userId = null, sessionId = null) {
    try {
        // Intent tanıma
        const intent = detectIntent(message);
        
        // Kişiselleştirilmiş yanıt oluştur
        const response = await generatePersonalizedResponse(intent, message, userId);
        
        // FAQ arama (düşük güven durumunda)
        let faqResults = [];
        if (intent.confidence < 0.5) {
            faqResults = searchFAQ(message);
        }
        
        // Öneri aksiyonları
        const suggestedActions = getSuggestedActions(intent.intent);
        
        return {
            success: true,
            response: response,
            intent: intent.intent,
            confidence: intent.confidence,
            faqResults: faqResults,
            suggestedActions: suggestedActions,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Chatbot error:', error);
        return {
            success: false,
            response: 'Özür dilerim, şu anda teknik bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin.',
            error: error.message
        };
    }
}

// Öneri aksiyonları
function getSuggestedActions(intent) {
    const actions = {
        'GREETING': [
            { text: 'Kurs Ara', action: 'view_courses' },
            { text: 'Seviye Testi', action: 'take_assessment' },
            { text: 'CV Oluştur', action: 'create_cv' }
        ],
        'COURSE_INQUIRY': [
            { text: 'Kursları Görüntüle', action: 'view_courses' },
            { text: 'Seviye Testi Yap', action: 'take_assessment' }
        ],
        'CV_HELP': [
            { text: 'CV Builder', action: 'create_cv' },
            { text: 'CV Örnekleri', action: 'view_cv_examples' }
        ],
        'MUNICIPAL_SERVICES': [
            { text: 'Hizmetleri Görüntüle', action: 'view_services' },
            { text: 'Şehir Seç', action: 'select_city' }
        ],
        'HELP': [
            { text: 'Kullanım Kılavuzu', action: 'view_guide' },
            { text: 'SSS', action: 'view_faq' }
        ]
    };
    
    return actions[intent] || [
        { text: 'Ana Sayfa', action: 'home' },
        { text: 'Yardım', action: 'help' }
    ];
}

module.exports = {
    processChatMessage,
    detectIntent,
    searchFAQ,
    FAQ_DATA
};