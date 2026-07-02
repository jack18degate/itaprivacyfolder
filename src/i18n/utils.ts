import { ui, defaultLang, routeMap, enToItMap, type Lang } from './ui';

/**
 * Detect language from URL pathname.
 * /en/... → 'en', everything else → 'it'
 */
export function getLangFromUrl(url: URL): Lang {
  const [, firstSegment] = url.pathname.split('/');
  if (firstSegment === 'en') return 'en';
  return defaultLang;
}

/**
 * Translation function factory.
 * Usage: const t = useTranslations('en'); t('nav.home') → 'Home'
 */
export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return (ui[lang] as any)[key] || ui[defaultLang][key] || key;
  };
}

/**
 * Get the alternate URL for the language switcher.
 * Given the current URL and target language, returns the equivalent path.
 */
export function getAlternateUrl(currentPath: string, targetLang: Lang): string {
  // Normalize path to ensure trailing slash
  let path = currentPath.endsWith('/') ? currentPath : currentPath + '/';

  if (targetLang === 'en') {
    // IT → EN: look up in routeMap
    const enPath = routeMap.en[path];
    if (enPath) return enPath;

    // Handle guide slugs: /guide/[slug]/ → /en/guide/[slug]/
    if (path.startsWith('/guide/') && path !== '/guide/') {
      const slug = path.slice('/guide/'.length, -1);
      let enSlug = slug;
      const decodedSlug = decodeURIComponent(slug);
      if (decodedSlug === 'cosè-un-self-custody-wallet') {
        enSlug = 'self-custody-wallet';
      } else if (decodedSlug === 'crypto-card-e-fisco-differenze-tra-carte-custodial') {
        enSlug = 'crypto-card-differences';
      }
      return `/en/guide/${enSlug}/`;
    }

    // Redirect Fisco pages to English homepage as they are omitted in English
    if (path.startsWith('/fisco/')) {
      return '/en/';
    }

    // Default: prepend /en
    return '/en' + path;
  } else {
    // EN → IT: look up in enToItMap
    const itPath = enToItMap[path];
    if (itPath) return itPath;

    // Handle guide slugs: /en/guide/[slug]/ → /guide/[slug]/
    if (path.startsWith('/en/guide/') && path !== '/en/guide/') {
      const slug = path.slice('/en/guide/'.length, -1);
      let itSlug = slug;
      const decodedSlug = decodeURIComponent(slug);
      if (decodedSlug === 'self-custody-wallet') {
        itSlug = 'cosè-un-self-custody-wallet';
      } else if (decodedSlug === 'crypto-card-differences') {
        itSlug = 'crypto-card-e-fisco-differenze-tra-carte-custodial';
      }
      return `/guide/${itSlug}/`;
    }

    // Default: strip /en prefix
    return path.replace(/^\/en/, '') || '/';
  }
}

/**
 * Get the site base URL.
 */
export const siteUrl = 'https://privacy-crypto.com';

/**
 * Build hreflang alternates for SEO component.
 * Returns array of { hreflang, href } for IT and EN versions.
 */
export function getHreflangAlternates(currentPath: string, lang: Lang) {
  const itPath = lang === 'it' ? currentPath : getAlternateUrl(currentPath, 'it');
  const enPath = lang === 'en' ? currentPath : getAlternateUrl(currentPath, 'en');

  return [
    { hreflang: 'it', href: `${siteUrl}${itPath}` },
    { hreflang: 'en', href: `${siteUrl}${enPath}` },
    { hreflang: 'x-default', href: `${siteUrl}${itPath}` }, // x-default points to Italian (main)
  ];
}

/**
 * Load data file for a given language.
 * Falls back to Italian if English version doesn't exist.
 */
export async function loadLocalizedData(filename: string, lang: Lang) {
  if (lang === 'en') {
    try {
      const data = await import(`../data/en/${filename}.json`);
      return data.default;
    } catch {
      // Fallback to Italian
      const data = await import(`../data/${filename}.json`);
      return data.default;
    }
  }
  const data = await import(`../data/${filename}.json`);
  return data.default;
}
