const fetch = require('sync-fetch')

function getHtmlSync(url) {
  const xhr = fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Edg/95.0.1020.53'
    }
  })
  if (xhr.status !== 200) {
    const statusText = xhr.statusText ? xhr.statusText : '';
    throw new Error(
        'XMLHttpRequest(' + url + ') status:' + xhr.status + ' ' + statusText,
    );
  }
  return xhr.text()
}
module.exports = getHtmlSync;
