const explorer = require('../explorer');

describe('lib/explorer', () => {
  it('explorer', () => {
    const uuid =
      'c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e';
    expect(explorer(uuid, 'KMD')).toEqual(
      `https://www.kmdexplorer.io/tx/${uuid}`
    );
    expect(explorer(uuid, 'zzz')).toEqual('#not-found');
  });
});
