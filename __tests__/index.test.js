// workaround for "Encoding not recognized: 'UTF-8' (searched as: 'utf8')"
require('../node_modules/iconv-lite').encodingExists('foo');

jest.mock('../src/get_og_data');
const ogData = {};
const getOgData = require('../src/get_og_data');
getOgData.mockImplementation((url) => {
  return ogData;
});

const linkPreviewPlugin = require('../src/index');
const md = require('markdown-it')().use(linkPreviewPlugin);

beforeEach(() => {});
afterEach(() => {});

it('get link preview html', () => {
  /* eslint-disable max-len */
  ogData.title = 'junkawa/figma_jp';
  ogData.description =
    'Japanese Chrome Extension for figma. Contribute to junkawa/figma_jp development by creating an account on GitHub.';
  ogData.site_name = 'GitHub'; // TODO null test
  ogData.image =
    'https://repository-images.githubusercontent.com/292775522/57a0a600-f246-11ea-9b1a-078a5abb05e8';
  ogData.url = 'https://github.com/junkawa/figma_jp';
  const result = md.render('[@preview](https://github.com/junkawa/figma_jp)');
  expect(result).toMatch(
      '<p><div class="card ms-md-5 me-md-5"><img src="https://repository-images.githubusercontent.com/292775522/57a0a600-f246-11ea-9b1a-078a5abb05e8" class="card-img-top" alt="junkawa/figma_jp"><div class="card-body"><h5 class="card-title text-truncate"><h5 class="card-title text-truncate"><a href="https://github.com/junkawa/figma_jp" target="_blank">junkawa/figma_jp</a></h5><p class="card-text m-0 lh-sm lp-desc"><small>Japanese Chrome Extension for figma. Contribute to junkawa/figma_jp development by creating an account on GitHub.</small></p><p class="card-text lp-url"><small class="text-muted">https://github.com/junkawa/figma_jp</small></p></div></div></p>',
  );
  /* eslint-enable max-len */
});
