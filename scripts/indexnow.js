import fs from 'fs';
import path from 'path';

async function submitToIndexNow() {
  const host = 'privacy-crypto.com';
  const key = '4b5e2b0a9d1c4f83b6c2d1e0a9f5b3c2';
  const keyLocation = `https://${host}/${key}.txt`;

  try {
    const sitemapPath = path.resolve('dist', 'sitemap-0.xml');
    
    if (!fs.existsSync(sitemapPath)) {
      console.log('⚠️ [IndexNow] Sitemap non trovata. Ignorato.');
      return;
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Regex per estrarre tutte le URL dai tag <loc>
    const regex = /<loc>(.*?)<\/loc>/g;
    const urlList = [];
    let match;
    while ((match = regex.exec(sitemapContent)) !== null) {
      urlList.push(match[1]);
    }

    if (urlList.length === 0) {
      console.log('⚠️ [IndexNow] Nessuna URL trovata nella sitemap.');
      return;
    }

    const payload = {
      host: host,
      key: key,
      keyLocation: keyLocation,
      urlList: urlList
    };

    const engines = [
      { name: 'Bing', url: 'https://www.bing.com/indexnow', host: 'www.bing.com' },
      { name: 'Yandex', url: 'https://yandex.com/indexnow', host: 'yandex.com' },
      { name: 'Naver', url: 'https://searchadvisor.naver.com/indexnow', host: 'searchadvisor.naver.com' },
    ];

    console.log(`🚀 [IndexNow] Invio di ${urlList.length} URL a ${engines.map(e => e.name).join(', ')}...`);

    const results = await Promise.allSettled(
      engines.map(engine =>
        fetch(engine.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Host': engine.host
          },
          body: JSON.stringify(payload)
        })
      )
    );

    results.forEach((result, i) => {
      const engine = engines[i].name;
      if (result.status === 'fulfilled') {
        const response = result.value;
        if (response.ok) {
          console.log(`✅ [IndexNow][${engine}] Successo! (Status: ${response.status})`);
        } else {
          console.log(`❌ [IndexNow][${engine}] Errore API: Status ${response.status} - ${response.statusText}`);
        }
      } else {
        console.log(`❌ [IndexNow][${engine}] Errore di rete: ${result.reason}`);
      }
    });
  } catch (error) {
    console.error('❌ [IndexNow] Errore nello script:', error);
  }
}

submitToIndexNow();
