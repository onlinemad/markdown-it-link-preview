const fetch = require('sync-fetch')

function getHtmlSync(url) {
  const xhr = fetch(url)
  if (xhr.status !== 200) {
    const statusText = xhr.statusText ? xhr.statusText : '';
    throw new Error(
        'XMLHttpRequest(' + url + ') status:' + xhr.status + ' ' + statusText,
    );
  }
  return xhr.text()
}
module.exports = getHtmlSync;
