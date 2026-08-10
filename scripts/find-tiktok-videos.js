const https = require('https');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml',
            'Accept-Language': 'es-ES,es;q=0.9',
          },
        },
        (res) => {
          if (res.statusCode === 301 || res.statusCode === 302) {
            return fetchText(res.headers.location).then(resolve).catch(reject);
          }
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => resolve(data));
        }
      )
      .on('error', reject);
  });
}

async function main() {
  const html = await fetchText('https://www.tiktok.com/@agency_fraxplorer_peru');
  const marker = '__UNIVERSAL_DATA_FOR_REHYDRATION__';
  const idx = html.indexOf(marker);
  if (idx === -1) {
    console.log('No hydration data found, length', html.length);
    const ids = [...html.matchAll(/"id":"(\d{15,25})"/g)].map((m) => m[1]);
    console.log('Possible IDs:', [...new Set(ids)].slice(0, 20));
    return;
  }
  const start = html.indexOf('{', idx);
  const end = html.indexOf('</script>', start);
  const jsonStr = html.slice(start, end);
  try {
    const data = JSON.parse(jsonStr);
    const scope = data?.__DEFAULT_SCOPE__;
    const itemList = scope?.['webapp.user-detail']?.itemList;
    console.log('itemList count:', itemList?.length ?? 0);
    if (itemList) {
      itemList.slice(0, 8).forEach((item) => {
        const id = item?.id;
        const desc = item?.desc?.slice(0, 80);
        console.log({ id, desc, url: `https://www.tiktok.com/@agency_fraxplorer_peru/video/${id}` });
      });
    } else {
      console.log('Keys:', Object.keys(scope || {}));
    }
  } catch (e) {
    console.error('Parse error', e.message);
  }
}

main().catch(console.error);
