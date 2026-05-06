import fiscoData from '../../data/fisco.json';
import exchangesData from '../../data/exchanges.json';
import walletsData from '../../data/wallets.json';
import identityData from '../../data/identity.json';
import communitiesData from '../../data/communities.json';
import spendData from '../../data/spend.json';
import vpnData from '../../data/vpn.json';
import globalFaqData from '../../data/global_faq.json';

const DB = {
  'fisco.json': fiscoData,
  'exchanges.json': exchangesData,
  'wallets.json': walletsData,
  'identity.json': identityData,
  'communities.json': communitiesData,
  'spend.json': spendData,
  'vpn.json': vpnData,
  'global_faq.json': globalFaqData
};

export async function GET({ request }) {
  const url = new URL(request.url);
  const file = url.searchParams.get('file');

  if (!file || !DB[file]) {
    return new Response(JSON.stringify({ error: 'File non valido' }), { status: 400 });
  }

  // Restituisce l'oggetto importato staticamente (Sicuro per Vercel Serverless)
  return new Response(JSON.stringify(DB[file]), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const password = request.headers.get('x-admin-password');
  const ADMIN_PWD = import.meta.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'privacy2026';
  if (password !== ADMIN_PWD) {
    return new Response(JSON.stringify({ error: 'Non autorizzato' }), { status: 401 });
  }

  try {
    const data = await request.json();
    const { file, content } = data;

    if (!file || !DB[file]) {
      return new Response(JSON.stringify({ error: 'File non valido' }), { status: 400 });
    }

    // Carica Enviroment Variables previste su Vercel (o da .env locale)
    const TOKEN = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
    const OWNER = import.meta.env.GITHUB_OWNER || process.env.GITHUB_OWNER;
    const REPO = import.meta.env.GITHUB_REPO || process.env.GITHUB_REPO;

    if (!TOKEN || !OWNER || !REPO) {
        return new Response(JSON.stringify({ error: 'GitHub tokens mancanti su .env' }), { status: 500 });
    }

    const pathAPI = `src/data/${file}`;
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${pathAPI}`;

    // 1. Fetch current file SHA from GitHub (Required to update files)
    const getRes = await fetch(url, { headers: { 'Authorization': `Bearer ${TOKEN}`, 'User-Agent': 'Astro-CMS' } });
    if (!getRes.ok) throw new Error("File introvabile su Github");
    const fileRemoteData = await getRes.json();
    const sha = fileRemoteData.sha;

    // 2. Commit new content to GitHub via API
    const newContentStr = JSON.stringify(content, null, 2);
    // Base64 encoding compatible inside browsers/serverless
    const encodedContent = Buffer.from(newContentStr).toString('base64');

    const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'User-Agent': 'Astro-CMS',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: `CMS Update: ${file}`,
            content: encodedContent,
            sha: sha
        })
    });

    if (!putRes.ok) throw new Error("Errore durante il Commit API");

    return new Response(JSON.stringify({ success: true, message: 'Commit Inviato. Vercel sta Rebuildando! (Attendere 40 secondi)' }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
