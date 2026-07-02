export const languages = {
  it: 'Italiano',
  en: 'English',
} as const;

export const defaultLang = 'it' as const;

export type Lang = keyof typeof languages;

export const ui = {
  it: {
    // Site name
    'site.suffix': 'Italian Privacy Toolkit',

    // Desktop Navigation
    'nav.home': 'Home',
    'nav.tax': 'Tasse & Burocrazia',
    'nav.exchange': 'Exchange',
    'nav.purchase': 'Acquisto',
    'nav.spend': 'Spendi Crypto',
    'nav.wallets': 'Portafogli',
    'nav.privacy-coins': 'Privacy Coins',
    'nav.misc': 'Varie',
    'nav.guides': 'Guide & Tutorial',
    'nav.mica': 'MiCA',

    // Mobile Navigation
    'nav.mobile.title': 'Menu Navigazione',
    'nav.mobile.home': 'Home',
    'nav.mobile.tax': 'Tasse & Obblighi',
    'nav.mobile.exchange': 'Exchange (CEX/DEX)',
    'nav.mobile.purchase': 'Acquisto (P2P/Ramp)',
    'nav.mobile.spend': 'Spendi Crypto',
    'nav.mobile.wallets': 'Portafogli & Storage',
    'nav.mobile.privacy-coins': 'Privacy Coins',
    'nav.mobile.misc': 'Varie',
    'nav.mobile.guides': 'Guide & Tutorial',
    'nav.mobile.mica': 'MiCA Exchange Europa',
    'nav.mobile.about': 'Chi Siamo',

    // Navigation links (href)
    'link.home': '/',
    'link.tax': '/fisco/',
    'link.exchange': '/exchange/',
    'link.purchase': '/acquisto/',
    'link.spend': '/spend/',
    'link.wallets': '/wallets/',
    'link.privacy-coins': '/privacy-coins/',
    'link.misc': '/varie/',
    'link.guides': '/guide/',
    'link.mica': '/exchange-crypto-mica/',
    'link.about': '/chi-siamo/',
    'link.contact': '/contatti/',
    'link.privacy-policy': '/privacy-policy/',
    'link.cookie-policy': '/cookie-policy/',

    // Footer
    'footer.about': 'Chi Siamo',
    'footer.contact': 'Contatti',
    'footer.privacy': 'Privacy Policy',
    'footer.cookie': 'Cookie Policy',
    'footer.copyright': 'Strumenti per la Privacy Finanziaria in Italia.',
    'footer.disclaimer.title': 'Informativa & Disclaimer di Responsabilità',
    'footer.disclaimer.text': 'Questo sito è un portale a scopo puramente <strong>educativo e informativo</strong>. Non offriamo consulenza finanziaria, <strong>non richiediamo mai l\'invio di fondi o criptovalute</strong> e non gestiamo portafogli di terzi. Tutte le piattaforme e i servizi citati in questo hub sono catalogati a scopo didattico. L\'architettura del Web3 e della DeFi è altamente sperimentale. Gli autori non si assumono alcuna responsabilità legale o patrimoniale derivante dall\'utilizzo di queste applicazioni di terze parti. Fai sempre la tua ricerca (DYOR) prima di interagire con le piattaforme indicate.',

    // Sponsor banner
    'sponsor.title': 'Sito Sostenuto da DeGate Wallet',
    'sponsor.description': 'Il modo più facile e privacy oriented per gestire le tue crypto.',
    'sponsor.cta.desktop': 'Self-Custody con Swap Integrato — Inizia Ora',
    'sponsor.cta.mobile': 'Inizia con DeGate',

    // Theme toggle
    'theme.toggle': 'Cambia tema',
    'menu.open': 'Apri menu',
    'menu.close': 'Chiudi menu',

    // Search
    'search.placeholder': 'Cosa ti preoccupa o cosa vuoi sapere?',
    'search.default.title': '🔥 Domande più cliccate in Italia',
    'search.results.title': 'Trovate {count} risposte',
    'search.no.results': 'Nessuna risposta esatta per "{query}". Esplora per macro aree:',
    'search.close': '× Chiudi',
    'search.back': 'Indietro',
    'search.oracle.title': "Risposta dell'Oracolo",
    'search.oracle.cta': 'Approfondisci',
    'search.oracle.fallback': 'Leggi Guida Completa',
    'search.fallback.visit': 'Visita la sezione dedicata per scoprire le funzionalità e i vantaggi orientati alla privacy.',
    'search.fallback.open': 'Apri la Sezione',

    // Search fallback categories
    'search.cat.tax': 'Fisco & DAC8',
    'search.cat.tax.sub': 'Obblighi 2026',
    'search.cat.exchange': 'Exchange',
    'search.cat.exchange.sub': 'CEX vs DEX',
    'search.cat.wallets': 'Web3 Wallets',
    'search.cat.wallets.sub': 'Self Custodial',
    'search.cat.misc': 'VPN & Varie',
    'search.cat.misc.sub': 'Strumenti Extra',

    // Compare Module
    'compare.title': 'Confronto Interattivo',
    'compare.subtitle': 'Trascina o clicca gli elementi qui sotto per confrontarne le caratteristiche affiancate.',
    'compare.available': 'Elementi Disponibili',
    'compare.scroll': 'Scorri',
    'compare.drag': 'Trascina Qui',
    'compare.remove': 'Rimuovi',
    'compare.website': 'Sito Ufficiale ➔',

    // Guides page
    'guides.title': 'Guide & Tutorial',
    'guides.subtitle': 'Approfondimenti pratici, tutorial step-by-step e analisi dettagliate sugli strumenti di privacy nel mondo crypto.',
    'guides.read': 'Leggi Guida',
    'guides.back': 'Torna alle Guide',

    // Common
    'common.recommended.for': 'Consigliato Per',
  },

  en: {
    // Site name
    'site.suffix': 'Privacy Crypto Toolkit',

    // Desktop Navigation
    'nav.home': 'Home',
    'nav.tax': '',
    'nav.exchange': 'Exchanges',
    'nav.purchase': 'Purchase',
    'nav.spend': 'Spend Crypto',
    'nav.wallets': 'Wallets',
    'nav.privacy-coins': 'Privacy Coins',
    'nav.misc': 'Miscellaneous',
    'nav.guides': 'Guides & Tutorials',
    'nav.mica': 'MiCA',

    // Mobile Navigation
    'nav.mobile.title': 'Navigation Menu',
    'nav.mobile.home': 'Home',
    'nav.mobile.tax': '',
    'nav.mobile.exchange': 'Exchanges (CEX/DEX)',
    'nav.mobile.purchase': 'Purchase (P2P/Ramp)',
    'nav.mobile.spend': 'Spend Crypto',
    'nav.mobile.wallets': 'Wallets & Storage',
    'nav.mobile.privacy-coins': 'Privacy Coins',
    'nav.mobile.misc': 'Miscellaneous',
    'nav.mobile.guides': 'Guides & Tutorials',
    'nav.mobile.mica': 'MiCA Exchanges Europe',
    'nav.mobile.about': 'About Us',

    // Navigation links (href)
    'link.home': '/en/',
    'link.tax': '',
    'link.exchange': '/en/exchange/',
    'link.purchase': '/en/purchase/',
    'link.spend': '/en/spend/',
    'link.wallets': '/en/wallets/',
    'link.privacy-coins': '/en/privacy-coins/',
    'link.misc': '/en/miscellaneous/',
    'link.guides': '/en/guide/',
    'link.mica': '/en/mica-compliant-crypto-exchanges/',
    'link.about': '/en/about-us/',
    'link.contact': '/en/contact/',
    'link.privacy-policy': '/en/privacy-policy/',
    'link.cookie-policy': '/en/cookie-policy/',

    // Footer
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.cookie': 'Cookie Policy',
    'footer.copyright': 'Tools for Crypto Financial Privacy.',
    'footer.disclaimer.title': 'Disclaimer & Liability Notice',
    'footer.disclaimer.text': 'This website is a portal for purely <strong>educational and informational</strong> purposes. We do not offer financial advice, <strong>we never request the transfer of funds or cryptocurrencies</strong>, and we do not manage third-party wallets. All platforms and services mentioned on this hub are catalogued for educational purposes. Web3 and DeFi architecture is highly experimental. The authors assume no legal or financial liability arising from the use of these third-party applications. Always do your own research (DYOR) before interacting with the platforms listed.',

    // Sponsor banner
    'sponsor.title': 'Powered by DeGate Wallet',
    'sponsor.description': 'The easiest, privacy-oriented way to manage your crypto.',
    'sponsor.cta.desktop': 'Self-Custody with Built-in Swap — Start Now',
    'sponsor.cta.mobile': 'Start with DeGate',

    // Theme toggle
    'theme.toggle': 'Toggle theme',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',

    // Search
    'search.placeholder': 'What concerns you or what do you want to know?',
    'search.default.title': '🔥 Most popular questions',
    'search.results.title': 'Found {count} answers',
    'search.no.results': 'No exact answers for "{query}". Explore by category:',
    'search.close': '× Close',
    'search.back': 'Back',
    'search.oracle.title': 'Oracle Answer',
    'search.oracle.cta': 'Learn More',
    'search.oracle.fallback': 'Read Full Guide',
    'search.fallback.visit': 'Visit the dedicated section to discover privacy-oriented features and advantages.',
    'search.fallback.open': 'Open Section',

    // Search fallback categories
    'search.cat.tax': '',
    'search.cat.tax.sub': '',
    'search.cat.exchange': 'Exchanges',
    'search.cat.exchange.sub': 'CEX vs DEX',
    'search.cat.wallets': 'Web3 Wallets',
    'search.cat.wallets.sub': 'Self Custodial',
    'search.cat.misc': 'VPN & Tools',
    'search.cat.misc.sub': 'Extra Tools',

    // Compare Module
    'compare.title': 'Interactive Comparison',
    'compare.subtitle': 'Drag or click the items below to compare their features side by side.',
    'compare.available': 'Available Items',
    'compare.scroll': 'Scroll',
    'compare.drag': 'Drop Here',
    'compare.remove': 'Remove',
    'compare.website': 'Official Website ➔',

    // Guides page
    'guides.title': 'Guides & Tutorials',
    'guides.subtitle': 'Practical insights, step-by-step tutorials, and detailed analyses of privacy tools in the crypto world.',
    'guides.read': 'Read Guide',
    'guides.back': 'Back to Guides',

    // Common
    'common.recommended.for': 'Recommended For',
  },
} as const;

// Route mapping: IT slug -> EN slug (for pages with different slugs)
export const routeMap: Record<string, Record<string, string>> = {
  it: {
    '/': '/',
    '/exchange/': '/exchange/',
    '/acquisto/': '/acquisto/',
    '/spend/': '/spend/',
    '/wallets/': '/wallets/',
    '/privacy-coins/': '/privacy-coins/',
    '/varie/': '/varie/',
    '/guide/': '/guide/',
    '/chi-siamo/': '/chi-siamo/',
    '/contatti/': '/contatti/',
    '/privacy-policy/': '/privacy-policy/',
    '/cookie-policy/': '/cookie-policy/',
    '/communities/': '/communities/',
  },
  en: {
    '/': '/en/',
    '/exchange/': '/en/exchange/',
    '/exchange-crypto-mica/': '/en/mica-compliant-crypto-exchanges/',
    '/acquisto/': '/en/purchase/',
    '/spend/': '/en/spend/',
    '/wallets/': '/en/wallets/',
    '/privacy-coins/': '/en/privacy-coins/',
    '/varie/': '/en/miscellaneous/',
    '/guide/': '/en/guide/',
    '/chi-siamo/': '/en/about-us/',
    '/contatti/': '/en/contact/',
    '/privacy-policy/': '/en/privacy-policy/',
    '/cookie-policy/': '/en/cookie-policy/',
    '/communities/': '/en/communities/',
  },
};

// Reverse map: EN path -> IT path (for language switcher)
export const enToItMap: Record<string, string> = {
  '/en/': '/',
  '/en/exchange/': '/exchange/',
  '/en/mica-compliant-crypto-exchanges/': '/exchange-crypto-mica/',
  '/en/purchase/': '/acquisto/',
  '/en/spend/': '/spend/',
  '/en/wallets/': '/wallets/',
  '/en/privacy-coins/': '/privacy-coins/',
  '/en/miscellaneous/': '/varie/',
  '/en/guide/': '/guide/',
  '/en/about-us/': '/chi-siamo/',
  '/en/contact/': '/contatti/',
  '/en/privacy-policy/': '/privacy-policy/',
  '/en/cookie-policy/': '/cookie-policy/',
  '/en/communities/': '/communities/',
};
