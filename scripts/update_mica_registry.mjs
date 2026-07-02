/**
 * update_mica_registry.mjs
 * 
 * Fetches the official ESMA CASPS (Crypto-Asset Service Providers) CSV register
 * and converts it into a clean JSON file for the site.
 * 
 * Source: https://www.esma.europa.eu/sites/default/files/2024-12/CASPS.csv
 * 
 * Run locally:   node scripts/update_mica_registry.mjs
 * Run via CI:     GitHub Actions daily cron
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'mica_registry.json');
const CSV_URL = 'https://www.esma.europa.eu/sites/default/files/2024-12/CASPS.csv';

// ─── Notoriety ranking (lower = more famous) ───
// CEX/providers not in this list get rank 999
const NOTORIETY_RANK = {
  'revolut': 1,
  'etoro': 2,
  'e toro': 2,
  'coinbase': 3,
  'coinbase europe': 3,
  'trade republic': 4,
  'kraken': 5,
  'binance': 6,
  'n26': 7,
  'bitpanda': 8,
  'bybit': 9,
  'okx': 10,
  'okx europe': 10,
  'crypto.com': 11,
  'kucoin': 12,
  'kucoin eu': 12,
  'whitebit': 13,
  'whitebit eu': 13,
  'bitvavo': 14,
  'swissborg': 15,
  'bbva': 16,
  'caixabank': 17,
  'commerzbank': 18,
  'trading 212': 19,
  'capital.com': 20,
  'xtb': 21,
  'ig europe': 22,
  'bit2me': 23,
  'lightyear': 24,
  'openbank': 25,
  'tradu': 26,
  'bullish': 27,
  'scalable capital': 28,
  'lunar block': 29,
  'lunar': 29,
  'flatexdegiro': 30,
  'coinmotion': 31,
  'coinfinity': 32,
  '21bitcoin': 33,
  'relai': 34,
  'bitgo': 35,
  'bitgo europe': 35,
  'dz bank': 36,
  'dekabank': 37,
  'kutxabank': 38,
  'cecabank': 39,
  'renta 4': 40,
  'penning': 41,
  'amina': 42,
  'amina eu': 42,
  'naga': 43,
  'naga x': 43,
  'lightspark': 44,
  'gcex': 45,
  'gc exchange': 45,
  'smartbroker': 46,
  'traders place': 47,
  'sutor bank': 48,
  'tangany': 49,
  'tradias': 50,
  'crypto finance': 51,
  'paybis': 52,
  'bitstack': 53,
  'coinhouse': 54,
  'deskoin': 55,
  'circle': 56,
};

// ─── Service code mapping ───
const SERVICE_MAP = {
  'a': 'custody',
  'b': 'trading_platform',
  'c': 'exchange_fiat',
  'd': 'exchange_crypto',
  'e': 'execution',
  'f': 'placing',
  'g': 'reception_transmission',
  'h': 'advice',
  'i': 'portfolio_management',
  'j': 'transfer',
};

// Human-readable labels (IT / EN)
const SERVICE_LABELS = {
  'custody': { it: 'Custodia', en: 'Custody' },
  'trading_platform': { it: 'Piattaforma Trading', en: 'Trading Platform' },
  'exchange_fiat': { it: 'Cambio Fiat↔Crypto', en: 'Fiat↔Crypto Exchange' },
  'exchange_crypto': { it: 'Cambio Crypto↔Crypto', en: 'Crypto↔Crypto Exchange' },
  'execution': { it: 'Esecuzione Ordini', en: 'Order Execution' },
  'placing': { it: 'Collocamento', en: 'Placing' },
  'reception_transmission': { it: 'Ricezione/Trasmissione', en: 'Reception/Transmission' },
  'advice': { it: 'Consulenza', en: 'Advice' },
  'portfolio_management': { it: 'Gestione Portafoglio', en: 'Portfolio Management' },
  'transfer': { it: 'Trasferimento', en: 'Transfer' },
};

/**
 * Single-pass CSV parser that handles:
 * - Quoted fields containing commas
 * - Quoted fields containing newlines
 * - Escaped quotes ("" inside quoted fields)
 */
function parseCSV(text) {
  // Normalize line endings
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  const rows = [];
  let fields = [];
  let field = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        // Escaped quote
        field += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(field.trim());
      field = '';
    } else if (ch === '\n' && !inQuotes) {
      fields.push(field.trim());
      rows.push(fields);
      fields = [];
      field = '';
    } else {
      field += ch;
    }
  }
  
  // Don't forget the last field/row
  fields.push(field.trim());
  if (fields.some(f => f.length > 0)) {
    rows.push(fields);
  }
  
  return rows;
}

/**
 * Extract service codes from the service description string
 */
function parseServices(serviceStr) {
  if (!serviceStr) return [];
  const services = new Set();
  
  // Try to match letter codes like "a.", "b.", etc.
  const letterMatches = serviceStr.match(/\b([a-j])\.\s/gi);
  if (letterMatches) {
    for (const m of letterMatches) {
      const letter = m.trim().replace('.', '').toLowerCase();
      if (SERVICE_MAP[letter]) services.add(SERVICE_MAP[letter]);
    }
  }
  
  // Also try keyword matching for entries without letter codes
  const lower = serviceStr.toLowerCase();
  if (lower.includes('custody') || lower.includes('administration')) services.add('custody');
  if (lower.includes('operation of a trading platform')) services.add('trading_platform');
  if (lower.includes('exchange') && lower.includes('fund')) services.add('exchange_fiat');
  if (lower.includes('exchange') && lower.includes('other crypto')) services.add('exchange_crypto');
  if (lower.includes('execution of order')) services.add('execution');
  if (lower.includes('placing')) services.add('placing');
  if (lower.includes('reception and transmission') || lower.includes('reception or transmission')) services.add('reception_transmission');
  if (lower.includes('advice') || lower.includes('providing advice')) services.add('advice');
  if (lower.includes('portfolio management')) services.add('portfolio_management');
  if (lower.includes('transfer service')) services.add('transfer');
  
  return [...services];
}

/**
 * Parse countries from the passporting string
 */
function parseCountries(countryStr) {
  if (!countryStr) return [];
  // Split by | or , or spaces, clean up
  return countryStr
    .split(/[|,]/)
    .map(c => c.trim().toUpperCase())
    .filter(c => c.length === 2 && /^[A-Z]{2}$/.test(c));
}

/**
 * Parse date from DD/MM/YYYY to YYYY-MM-DD
 */
function parseDate(dateStr) {
  if (!dateStr) return null;
  const match = dateStr.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
}

/**
 * Get notoriety rank for a provider name
 */
function getNotorietyRank(commercialName, legalName) {
  const names = [commercialName, legalName].filter(Boolean).map(n => n.toLowerCase().trim());
  
  for (const name of names) {
    // Exact match first
    if (NOTORIETY_RANK[name] !== undefined) return NOTORIETY_RANK[name];
    
    // Partial match
    for (const [key, rank] of Object.entries(NOTORIETY_RANK)) {
      if (name.includes(key) || key.includes(name)) return rank;
    }
  }
  
  return 999;
}

async function main() {
  console.log('📥 Fetching ESMA CASPS register...');
  
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
  }
  
  let csvText = await response.text();
  // Remove BOM if present
  if (csvText.charCodeAt(0) === 0xFEFF) csvText = csvText.slice(1);
  
  console.log(`📄 CSV size: ${(csvText.length / 1024).toFixed(1)} KB`);
  
  const rows = parseCSV(csvText);
  console.log(`📊 Parsed ${rows.length} rows (including header)`);
  
  // Skip header row
  const header = rows[0];
  const dataRows = rows.slice(1).filter(r => r.length >= 10 && r[0]);
  
  // CSV columns (0-indexed):
  // 0: ae_competentAuthority
  // 1: ae_homeMemberState
  // 2: ae_lei_name (legal name)
  // 3: ae_lei
  // 4: ae_lei_cou_code
  // 5: ae_commercial_name
  // 6: ae_address
  // 7: ae_website
  // 8: ae_website_platform
  // 9: ac_authorisationNotificationDate
  // 10: ac_authorisationEndDate
  // 11: ac_serviceCode
  // 12: ac_serviceCode_cou (passported countries)
  // 13: ac_comments
  // 14: ac_lastupdate
  
  // Group by legal name to merge entries with multiple service rows
  const providerMap = new Map();
  
  for (const row of dataRows) {
    const legalName = (row[2] || '').trim();
    if (!legalName) continue;
    
    const key = legalName.toLowerCase();
    
    if (!providerMap.has(key)) {
      let commercialName = (row[5] || '').trim();
      // Clean up messy commercial names
      commercialName = commercialName
        .replace(/[?�""]/g, '')  // Remove special/garbled chars
        .replace(/\s+/g, ' ')   // Normalize whitespace
        .trim();
      // If name contains comma-separated duplicates like "Kraken, Kraken Digital Asset Exchange", take the shortest
      if (commercialName.includes(',')) {
        const parts = commercialName.split(',').map(s => s.trim()).filter(Boolean);
        commercialName = parts.sort((a, b) => a.length - b.length)[0] || commercialName;
      }
      const website = (row[7] || row[8] || '').trim().replace(/\s+/g, '');
      
      providerMap.set(key, {
        name: commercialName || legalName,
        legal_name: legalName,
        country: (row[1] || row[4] || '').trim().toUpperCase(),
        authority: (row[0] || '').trim(),
        website: website.startsWith('http') ? website : (website ? `https://${website}` : ''),
        authorization_date: parseDate(row[9]),
        end_date: parseDate(row[10]) || null,
        services: new Set(),
        passported_countries: new Set(),
        last_update: parseDate(row[14]),
      });
    }
    
    const provider = providerMap.get(key);
    
    // Merge services
    const services = parseServices(row[11]);
    for (const s of services) provider.services.add(s);
    
    // Merge passported countries
    const countries = parseCountries(row[12]);
    for (const c of countries) provider.passported_countries.add(c);
    
    // Update last_update if newer
    const newUpdate = parseDate(row[14]);
    if (newUpdate && (!provider.last_update || newUpdate > provider.last_update)) {
      provider.last_update = newUpdate;
    }
  }
  
  // Services that indicate the provider actually exchanges/trades crypto
  const EXCHANGE_SERVICES = new Set([
    'exchange_fiat',      // exchange crypto ↔ fiat
    'exchange_crypto',    // exchange crypto ↔ crypto  
    'trading_platform',   // operates a trading platform
  ]);

  // Convert to array, filter, and sort by notoriety
  const providers = [...providerMap.values()]
    .filter(p => !p.end_date || p.end_date >= new Date().toISOString().split('T')[0]) // Exclude expired
    .filter(p => [...p.services].some(s => EXCHANGE_SERVICES.has(s))) // Only actual crypto exchanges
    .map(p => ({
      name: p.name,
      legal_name: p.legal_name,
      country: p.country,
      authority: p.authority,
      website: p.website,
      authorization_date: p.authorization_date,
      services: [...p.services].sort(),
      passported_countries: [...p.passported_countries].sort(),
      eu_countries_count: p.passported_countries.size,
      last_update: p.last_update,
      notoriety_rank: getNotorietyRank(p.name, p.legal_name),
    }))
    .sort((a, b) => a.notoriety_rank - b.notoriety_rank);
  
  const registry = {
    last_updated: new Date().toISOString().split('T')[0],
    source_url: CSV_URL,
    total_providers: providers.length,
    service_labels: SERVICE_LABELS,
    providers,
  };
  
  // Check if content changed
  let changed = true;
  if (fs.existsSync(OUTPUT_PATH)) {
    const existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
    // Compare providers only (ignore last_updated date)
    const existingProviders = JSON.stringify(existing.providers);
    const newProviders = JSON.stringify(providers);
    if (existingProviders === newProviders) {
      changed = false;
      console.log('✅ No changes detected in ESMA registry.');
    }
  }
  
  // Always write (update date if nothing else)
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2), 'utf-8');
  console.log(`✅ Written ${providers.length} providers to ${OUTPUT_PATH}`);
  
  // Print top 10 by notoriety
  console.log('\n🏆 Top 15 by notoriety:');
  providers.slice(0, 15).forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.name} (${p.country}) — ${p.services.length} services, ${p.eu_countries_count} EU countries`);
  });
  
  // Exit with code for CI: 0 = changed, 1 = no change
  if (process.env.CI && !changed) {
    console.log('CI mode: no changes, exiting with code 78 (neutral)');
    process.exit(78);
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
