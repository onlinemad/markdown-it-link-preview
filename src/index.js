const getOgData = require('./get_og_data');

function linkPreviewHtml(ogData) {
  let img = ogData.image && ogData.image !== '' ? '<img src="' + ogData.image + '" class="card-img-top lp-img-top" alt="' + ogData.title + '" loading="lazy">' : ''
  return (
    '<div class="card ms-md-5 me-md-5 lp-card">' +
    img +
    '<div class="card-body">' +
    '<h5 class="card-title text-truncate lp-title"><a href="' + ogData.url + '" target="_blank">' + ogData.title + '</a></h5>' +
    '<p class="card-text m-0 lh-sm lp-desc"><small>' + ogData.description + '</small></p>' +
    '<p class="card-text lp-url"><small class="text-muted">' + ogData.url + '</small></p>' +
    '</div>' +
    '</div>'
  );
}

function linkPreviewPlugin(md, options) {
  // Remember old renderer, if overriden, or proxy to default renderer
  const defaultRender =
    md.renderer.rules.link_open ||
    function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  function isLinkPreview(tokens, idx) {
    const t = tokens[idx + 1];
    if (t.type === 'text' && t.content === '@preview') {
      return true;
    } else {
      return false;
    }
  }

  function hideTokensUntilLinkClose(tokens, idx) {
    tokens[idx + 1].content = ''; // hidden ???
    for (let i = idx + 1; i < tokens.length; i++) {
      tokens[i].hidden = true;
      if (tokens[i].type === 'link_close') break;
    }
  }

  function getHref(tokens, idx) {
    const hrefIdx = tokens[idx].attrIndex('href');
    // if (hrefIdx < 0) error;
    return tokens[idx].attrs[hrefIdx][1];
  }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    if (isLinkPreview(tokens, idx)) {
      hideTokensUntilLinkClose(tokens, idx);
      const url = getHref(tokens, idx);
      const ogData = getOgData(url);

      return linkPreviewHtml(ogData);
    } else {
      // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self);
    }
  };
}

module.exports = linkPreviewPlugin;
