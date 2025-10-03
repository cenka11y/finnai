# SUOAI - Wireframes (Lo-Fi)

## Screen 1: Landing Page (Unauthenticated)

```
┌─────────────────────────────────────────────────────────────┐
│ [SUOAI Logo]                        [FI|EN|TR|AR|RU|SO] ⚙  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│        TERVETULOA SUOMEEN - ALOITA MATKASI TÄNÄÄN         │
│        (Welcome to Finland - Start Your Journey Today)     │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   📚 OPPI       │  │   📄 RAKENNA    │  │   🏛️ LÖYDÄ   │ │
│  │   SUOMEA        │  │   CV:SI         │  │   PALVELUT   │ │
│  │   (Learn        │  │   (Build        │  │   (Find      │ │
│  │   Finnish)      │  │   Your CV)      │  │   Services)  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                             │
│                [ALOITA ILMAISEKSI] (Start Free)            │
│                [KIRJAUDU SISÄÄN] (Sign In)                 │
│                                                             │
│  "AI-pohjainen integraatio-alusta Suomen maahanmuuttajille"│
│  (AI-powered integration platform for immigrants in Finland)│
├─────────────────────────────────────────────────────────────┤
│ Tietosuoja | Käyttöehdot | Ota yhteyttä                   │
└─────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Language selector in top-right (flags + text)
- Hero section with value proposition
- Three main feature cards with icons
- Clear CTA buttons
- Trust indicators (privacy, terms)

---

## Screen 2: Onboarding - Language Detection

```
┌─────────────────────────────────────────────────────────────┐
│ [SUOAI Logo]                                    [ X ]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ASKEL 1/4 (Step 1/4)                    │
│                                                             │
│              VALITSE ENSISIJAINEN KIELESI                   │
│              (Choose Your Primary Language)                 │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │      🇫🇮         │  │      🇬🇧         │  │      🇹🇷      │ │
│  │   SUOMI         │  │   ENGLISH       │  │   TÜRKÇE     │ │
│  │   (Finnish)     │  │                 │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │      🇸🇦         │  │      🇷🇺         │  │      🇸🇴      │ │
│  │   العربية        │  │   РУССКИЙ       │  │   SOOMAALI   │ │
│  │   (Arabic)      │  │   (Russian)     │  │   (Somali)   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                             │
│     ℹ️ Voit vaihtaa kieltä myöhemmin asetuksista           │
│     (You can change language later in settings)            │
│                                                             │
│                         [JATKA] (Continue)                 │
├─────────────────────────────────────────────────────────────┤
│ ●○○○ Progress indicator                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 3: Onboarding - Profile Setup

```
┌─────────────────────────────────────────────────────────────┐
│ [SUOAI Logo]                                    [ X ]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ASKEL 2/4 (Step 2/4)                    │
│                                                             │
│                KERRO MEILLE ITSESTÄSI                      │
│                (Tell Us About Yourself)                     │
│                                                             │
│  Mikä on tilanteesi? (What is your situation?)             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ○ Uusi maahanmuuttaja (0-6 kk) (New immigrant 0-6mo)   │ │
│  │ ○ Asukas (6kk-2v) (Resident 6mo-2y)                    │ │
│  │ ○ Vakiintunut asukas (2v+) (Established resident 2y+)  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Missä kaupungissa asut? (Which city do you live in?)      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [Dropdown: Helsinki, Espoo, Vantaa, Tampere, ...]     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Mikä on päätavoitteesi? (What is your main goal?)         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ○ Oppia suomea päivittäiseen elämään                   │ │
│  │   (Learn Finnish for daily life)                       │ │
│  │ ○ Löytää työtä (Find employment)                       │ │
│  │ ○ Integroitua yhteiskuntaan (Integrate into society)   │ │
│  │ ○ Parantaa ammattitaitoja (Improve professional skills)│ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                         [JATKA] (Continue)                 │
├─────────────────────────────────────────────────────────────┤
│ ○●○○ Progress indicator                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 4: Finnish Assessment Test

```
┌─────────────────────────────────────────────────────────────┐
│ [SUOAI Logo]                                    [ X ]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ASKEL 3/4 (Step 3/4)                    │
│                                                             │
│            SUOMEN KIELEN TASON ARVIOINTI                    │
│            (Finnish Language Level Assessment)              │
│                                                             │
│  📊 Kysymys 5/15                                           │
│                                                             │
│  🔊 Kuuntele ja valitse oikea vastaus:                     │
│  (Listen and choose the correct answer:)                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🔊 [Audio Player] "Kiitos, voiko auttaa?"              │ │
│  │ ▶️ Play Again | 🔇 Volume                               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ○ A) Henkilö kiittää ja tarjoaa apua                   │ │
│  │ ○ B) Henkilö kysyy aikaa                               │ │
│  │ ○ C) Henkilö haluaa ostaa jotain                       │ │
│  │ ○ D) Henkilö etsii WC:tä                               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  💬 Vaikeuksia? Voit siirtyä seuraavaan kysymykseen        │
│  (Having trouble? You can skip to the next question)       │
│                                                             │
│                [OHITA] (Skip)    [JATKA] (Continue)        │
├─────────────────────────────────────────────────────────────┤
│ ○○●○ Progress indicator                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 5: Dashboard (Main Hub)

```
┌─────────────────────────────────────────────────────────────┐
│ [SUOAI] 👤 Sari  🔔(3)  🌐FI  ⚙️                          │
├─────────────────────────────────────────────────────────────┤
│ 📚 OPPI  |  📄 CV  |  🏛️ PALVELUT  |  💼 TYÖVALMENNUS     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TERVETULOA TAKAISIN, SARI! (Welcome back, Sari!)          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐   │
│  │ 📈 EDISTYMISESI (Your Progress)                       │   │
│  │                                                       │   │
│  │ Suomen kielen taso: A2 → B1 (67% valmiina)           │   │
│  │ (Finnish level: A2 → B1 (67% complete))              │   │
│  │ ████████████████████░░░░░░                            │   │
│  │                                                       │   │
│  │ Seuraava tavoite: Työelämän sanavarasto              │   │
│  │ (Next goal: Work-life vocabulary)                     │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │ 🎯 SEURAAVA      │  │ ✅ TEHTÄVÄLISTA  │  │ 📊 TILASTOT │ │
│  │ OPPITUNTI        │  │ (Task List)      │  │ (Stats)     │ │
│  │                  │  │                  │  │             │ │
│  │ "Työpaikkahakemus"│  │ □ Päivitä CV     │  │ 📅 7 päivää │ │
│  │ (Job Application) │  │ □ Harjoittele    │  │ 🔥 3 streak │ │
│  │                  │  │   puhelua        │  │ ⭐ 245 pts  │ │
│  │ [ALOITA] (Start) │  │ □ Rekisteröidy   │  │             │ │
│  │                  │  │   kirjastoon     │  │ [KATSO]     │ │
│  └──────────────────┘  └──────────────────┘  └─────────────┘ │
│                                                             │
│  📢 UUTTA: Uusi kurssi "Suomalainen työkulttuurit" saatavilla│
│  (NEW: New course "Finnish work culture" available)         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ 🏠 📚 📄 🗺️ 💼 👤                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 6: Lesson Player (Learning Interface)

```
┌─────────────────────────────────────────────────────────────┐
│ ← TAKAISIN  |  Oppitunti 3.2: Työhakemus  |  🔔 ⚙️         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 Edistyminen: 4/8 harjoitusta (Progress: 4/8 exercises) │
│  ████████████████░░░░░░░░░░░░░░░░                            │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐   │
│  │ 🎯 HARJOITUS: KUUNTELUTEHTÄVÄ                         │   │
│  │ (Exercise: Listening Task)                            │   │
│  │                                                       │   │
│  │ Kuuntele työhaastattelu ja vastaa kysymyksiin:       │   │
│  │ (Listen to the job interview and answer questions:)   │   │
│  │                                                       │   │
│  │ ┌─────────────────────────────────────────────────┐   │   │
│  │ │ 🔊 [██████████████████░░░░] 0:45 / 1:20         │   │   │
│  │ │ ▶️ ⏸️ ⏮️ ⏭️  🔇───●───🔊                         │   │   │
│  │ │                                                 │   │   │
│  │ │ 📝 Seuraa transkriptiota:                       │   │   │
│  │ │ "Kertoisitteko itsestänne?"                     │   │   │
│  │ │ "Olen kokenut markkinointi..."                  │   │   │
│  │ └─────────────────────────────────────────────────┘   │   │
│  │                                                       │   │
│  │ KYSYMYS: Mitä hakija sanoi kokemuksestaan?           │   │
│  │ (Question: What did the applicant say about experience?)│ │
│  │                                                       │   │
│  │ ○ A) Hänellä on 3 vuoden kokemus                     │   │
│  │ ○ B) Hän on vasta valmistunut                        │   │
│  │ ● C) Hänellä on markkinointikokemusta                │   │
│  │ ○ D) Hän ei kertonut kokemuksestaan                  │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                             │
│  💡 VIHJE: Keskity avainsanoihin "markkinointi" ja "kokemus"│
│  (Hint: Focus on keywords "marketing" and "experience")     │
│                                                             │
│                [TARKISTA] (Check)  [OHITA] (Skip)          │
├─────────────────────────────────────────────────────────────┤
│ 🎮 Piste-ennätys: 89% | ⏱️ Aika: 2:34 | 🔥 Putki: 3 päivää │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 7: CV Builder - Template Selection

```
┌─────────────────────────────────────────────────────────────┐
│ ← TAKAISIN  |  CV-Rakentaja  |  💾 TALLENNA  |  👁️ ESIKATSELU │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              VALITSE CV-POHJA (Choose CV Template)          │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │ 🇫🇮 SUOMALAINEN │  │ 🌍 KANSAINVÄLINEN│  │ 🎓 AKATEEMINEN │ │
│  │ (Finnish)       │  │ (International) │  │ (Academic)   │ │
│  │                 │  │                 │  │              │ │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌──────────┐ │ │
│  │ │ [CV Preview]│ │  │ │ [CV Preview]│ │  │ │[CV Preview]│ │ │
│  │ │             │ │  │ │             │ │  │ │          │ │ │
│  │ │ Nimi        │ │  │ │ Name        │ │  │ │ Name     │ │ │
│  │ │ Yhteystiedot│ │  │ │ Contact     │ │  │ │ Contact  │ │ │
│  │ │ Työkokemus  │ │  │ │ Experience  │ │  │ │ Education│ │ │
│  │ │ Koulutus    │ │  │ │ Education   │ │  │ │ Research │ │ │
│  │ │ Taidot      │ │  │ │ Skills      │ │  │ │ Publicat.│ │ │
│  │ └─────────────┘ │  │ └─────────────┘ │  │ └──────────┘ │ │
│  │                 │  │                 │  │              │ │
│  │ ✅ ATS-yhteensopiva│ │ ✅ Globaali    │  │ ✅ Tutkimus- │ │
│  │ ✅ Suomi-spesifi  │ │ ✅ Kielineutraali│ │    orientoitu │ │
│  │                 │  │                 │  │              │ │
│  │ [VALITSE] (Select)│ │ [VALITSE] (Select)│ │ [VALITSE]   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                             │
│  💡 SUOSITUS: Valitse suomalainen pohja, jos haet töitä     │
│     Suomesta. Se noudattaa paikallisia käytäntöjä.         │
│  (Recommendation: Choose Finnish template if applying for   │
│   jobs in Finland. It follows local practices.)            │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🤖 AI-AVUSTAJA: "Huomasin, että etsit markkinointi-    │ │
│  │ töitä. Suomalainen pohja korostaa osaamista ja         │ │
│  │ konkreettisia tuloksia, mikä on tärkeää suomalaisille  │ │
│  │ työnantajille."                                        │ │
│  │ (AI Assistant: "I noticed you're looking for marketing │ │
│  │ jobs. Finnish template emphasizes skills and concrete  │ │
│  │ results, which is important for Finnish employers.")   │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Askel 1/5: Pohjan valinta | Seuraavaksi: Henkilötiedot     │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 8: Services Finder - Main View

```
┌─────────────────────────────────────────────────────────────┐
│ ← TAKAISIN  |  Palveluhaku  |  📍 Helsinki  |  🔍 HAKU      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              LÖYDÄ SOPIVAT PALVELUT (Find Suitable Services)│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🔍 [Hae palveluita...] 🎯 [Suodattimet]               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  📍 HELSINKI | 📋 KAIKKI KATEGORIAT | 👤 KAIKKI KOHDERYHMÄT │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │ 🏠 ASUMINEN JA   │  │ 🏥 TERVEYS JA    │  │ 🎓 KOULUTUS │ │
│  │ REKISTERÖINTI    │  │ VAKUUTUKSET      │  │ JA KURSSIT  │ │
│  │ (Housing &       │  │ (Health &        │  │ (Education  │ │
│  │ Registration)    │  │ Insurance)       │  │ & Training) │ │
│  │                  │  │                  │  │             │ │
│  │ • Väestörekisteri │  │ • Terveyskeskus  │  │ • Suomen   │ │
│  │ • Asunnonhaku    │  │ • Hammashoitola  │  │   kielen   │ │
│  │ • Kotivakuutus   │  │ • Kela           │  │   kurssit  │ │
│  │                  │  │                  │  │ • Ammatti- │ │
│  │ [NÄYTÄ 12] (Show)│  │ [NÄYTÄ 8] (Show) │  │   koulutus │ │
│  └──────────────────┘  └──────────────────┘  │ [NÄYTÄ 15] │ │
│                                              └─────────────┘ │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │ 💼 TYÖLLISYYS    │  │ 👨‍👩‍👧‍👦 PERHE JA  │  │ ⚖️ OIKEUS   │ │
│  │ (Employment)     │  │ LAPSET           │  │ JA NEUVONTA │ │
│  │                  │  │ (Family &        │  │ (Legal &    │ │
│  │ • TE-palvelut    │  │ Children)        │  │ Advisory)   │ │
│  │ • Työnhaku       │  │                  │  │             │ │
│  │ • Yrittäjyys     │  │ • Päivähoito     │  │ • Oikeusapu │ │
│  │                  │  │ • Vanhempainrahat│  │ • Tulkki-   │ │
│  │ [NÄYTÄ 6] (Show) │  │ • Kouluneuvonta  │  │   palvelut │ │
│  └──────────────────┘  │ [NÄYTÄ 9] (Show) │  │ [NÄYTÄ 4]  │ │
│                        └──────────────────┘  └─────────────┘ │
│                                                             │
│  🎯 HENKILÖKOHTAISET SUOSITUKSET (Personal Recommendations) │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Profiilisi perusteella suosittelemme:                   │ │
│  │ • Helsingin työllisyyspalvelut (uusille asukkaille)     │ │
│  │ • Kela: Kotoutumistuki hakemuksen teko                  │ │
│  │ • InfoFinland: Perustietoa Suomesta                     │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ 🏠 📚 📄 🗺️ 💼 👤                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 9: Service Detail Page

```
┌─────────────────────────────────────────────────────────────┐
│ ← PALVELUHAKU  |  Väestörekisterikeskus  |  ⭐ 📤 🔗        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🏛️ VÄESTÖREKISTERIKESKUS - HELSINKI                       │
│  (Population Register Centre - Helsinki)                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 📍 Ratamestarinkatu 13, 00520 Helsinki                 │ │
│  │ 📞 029 535 5000  |  🌐 dvv.fi  |  ✉️ kirjaamo@dvv.fi  │ │
│  │ 🕐 Ma-Pe 8:00-16:15  |  ♿ Esteetön kulku               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  📋 MIKÄ TÄMÄ ON? (What is this?)                          │
│  Väestörekisterikeskus hoitaa henkilötietojen rekisteröinnin│
│  ja muutokset. Täällä voit ilmoittaa muutosta osoitteessa, │
│  rekisteröidä avioliiton ja hakea henkilötietoja.          │
│                                                             │
│  👥 KENELLE? (For whom?)                                   │
│  ✅ Kaikille Suomessa asuville                             │
│  ✅ EU-kansalaisille                                        │
│  ✅ Kolmansien maiden kansalaisille                         │
│                                                             │
│  📝 VAADITUT ASIAKIRJAT (Required documents)               │
│  • Henkilöllisyystodistus (kuvallinen)                     │
│  • Oleskelulupa (ei-EU kansalaiset)                        │
│  • Vuokrasopimus tai asunnon omistustodistus                │
│  • Täytetty muuttolomake                                    │
│                                                             │
│  🔄 PROSESSI ASKEL ASKELEELTA (Step-by-step process)       │
│  1️⃣ Varaa aika netistä (dvv.fi) tai soita                  │
│  2️⃣ Kerää tarvittavat asiakirjat                          │
│  3️⃣ Saavu paikalle sovittuna aikana                        │
│  4️⃣ Täytä lomakkeet työntekijän kanssa                     │
│  5️⃣ Maksa mahdolliset maksut (0-50€)                       │
│  6️⃣ Saat vahvistuksen muutoksesta                          │
│                                                             │
│  ⚠️ HUOMAA: (Please note)                                  │
│  Muutto tulee ilmoittaa 7 päivän kuluessa muutosta.        │
│  Palvelu on saatavilla suomeksi, ruotsiksi ja englanniksi. │
│                                                             │
│  🔗 VIRALLISET LINKIT (Official links)                     │
│  • 🌐 Ajanvaraus: ajanvaraus.dvv.fi                        │
│  • 📄 Muuttolomake: dvv.fi/muuttolomake                     │
│  • ℹ️ Lisätietoa: infofinland.fi/vaestorekisteri           │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 📅 TIEDOT TARKISTETTU: 28.9.2025                       │ │
│  │ 📚 LÄHDE: InfoFinland.fi, DVV.fi                       │ │
│  │ ⚠️ Tarkista aina viimeisimmät tiedot viralliselta       │ │
│  │   sivustolta ennen käyntiä.                            │ │
│  │                                                         │ │
│  │ 🚨 [ILMOITA VANHENTUNEESTA TIEDOSTA]                   │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│        [🗺️ NÄYTÄ KARTALLA]    [📤 JAA]    [⭐ TALLENNA]     │
├─────────────────────────────────────────────────────────────┤
│ 🏠 📚 📄 🗺️ 💼 👤                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Screen 10: Admin Panel - Content Review

```
┌─────────────────────────────────────────────────────────────┐
│ [SUOAI ADMIN]  |  📊 Dashboard  |  👤 Sari Admin  |  🚪 Kirjaudu ulos │
├─────────────────────────────────────────────────────────────┤
│ 🏠 📊 📝 👥 🔧 📈 📋 ⚙️                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              SISÄLLÖN TARKISTUSJONOÄ (Content Review Queue) │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🔍 [Hae muutoksia...]  📅 [Päivämäärä] 🏷️ [Tila]       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  📊 YHTEENVETO: 14 odottavaa | 3 hyväksytty tänään | 1 hylätty│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🔄 UUSI PÄIVITYS - KORKEA PRIORITEETTI                  │ │
│  │                                                         │ │
│  │ 📍 Lähde: InfoFinland.fi/terveydenhuolto               │ │
│  │ 🕐 Havaittu: 2.10.2025 14:32                           │ │
│  │ 📊 Muutos: Terveyskeskuksen aukioloajat muuttuneet     │ │
│  │                                                         │ │
│  │ VANHA VERSIO:        │  UUSI VERSIO:                   │ │
│  │ Ma-Pe 8:00-20:00     │  Ma-Pe 7:00-19:00               │ │
│  │ La 9:00-15:00        │  La 8:00-14:00                  │ │
│  │ Su kiinni            │  Su kiinni                      │ │
│  │                      │                                 │ │
│  │ 📋 VAIKUTUS: 127 palvelua Helsingissä                  │ │
│  │ 👥 KÄYTTÄJIÄ: ~2,340 aktiivista                        │ │
│  │                                                         │ │
│  │ [🔍 TARKASTELE] [✅ HYVÄKSY] [❌ HYLKÄÄ] [⏰ MYÖHEMMIN] │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 📄 SISÄLTÖMUUTOS - NORMAALI                             │ │
│  │                                                         │ │
│  │ 📍 Lähde: kotoutuminen.fi/kurssit                      │ │
│  │ 🕐 Havaittu: 2.10.2025 09:15                           │ │
│  │ 📊 Muutos: Uusi suomen kielen kurssi lisätty           │ │
│  │                                                         │ │
│  │ "Integroivaa suomen kieltä työssä oleville" -kurssi    │ │
│  │ Aloitus: 15.10.2025, Kesto: 12 viikkoa                 │ │
│  │ Sijainti: Espoon aikuiskoulutuskeskus                   │ │
│  │                                                         │ │
│  │ [🔍 TARKASTELE] [✅ HYVÄKSY] [❌ HYLKÄÄ] [⏰ MYÖHEMMIN] │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ⚠️ VAROITUS - MAHDOLLINEN ONGELMA                       │ │
│  │                                                         │ │
│  │ 📍 Lähde: infofinland.fi/tyonhaku                      │ │
│  │ 🕐 Havaittu: 1.10.2025 16:45                           │ │
│  │ 📊 Ongelma: Sivu ei ole saatavilla (404 virhe)         │ │
│  │                                                         │ │
│  │ Vaikuttaa 23 palveluun ja 8 oppituntiin                │ │
│  │ Käyttäjät saattavat törmätä rikkinäisiin linkkeihin     │ │
│  │                                                         │ │
│  │ [🔧 KORJAA LINKIT] [📞 OTA YHTEYTTÄ] [📋 RAPORTOI]     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  [📄 NÄYTÄ KAIKKI]  [📊 TILASTOT]  [⚙️ AUTOMAATIOT]        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ 📱 Viimeisin synkronointi: 2.10.2025 15:30 | 🟢 Kaikki OK │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Wireframe Notes

### Design Principles Used:
1. **Mobile-First**: All wireframes prioritize mobile viewports
2. **Task-Oriented Navigation**: Clear paths to main user goals
3. **Progressive Disclosure**: Show overview first, details on demand
4. **Accessibility Focus**: Large touch targets, clear hierarchy
5. **Finnish Context**: Localized content and cultural considerations

### Interaction Patterns:
- **Bottom Navigation**: Primary navigation on mobile
- **Cards Interface**: Information organized in digestible chunks  
- **Progress Indicators**: Clear feedback on user advancement
- **Call-to-Action Hierarchy**: Primary actions prominently displayed
- **Error Prevention**: Clear instructions and validation

### Responsive Considerations:
- Navigation collapses to hamburger menu on mobile
- Content stacks vertically on smaller screens
- Touch targets minimum 44px as per accessibility guidelines
- Text remains legible at all screen sizes

These wireframes serve as the foundation for the visual design and development phases, ensuring all core user flows are addressed before implementation begins.