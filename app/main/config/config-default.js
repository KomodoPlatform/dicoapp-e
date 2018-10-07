const def = {
  barterdex: 'http://127.0.0.1:7783',
  APPNAME: 'dicoapp',
  minWindowSize: {
    width: 1056,
    height: process.platform === 'darwin' ? 600 : 650
  },
  loginWindowSize: {
    width: 1056,
    height: process.platform === 'darwin' ? 600 : 650
    // width: 680,
    // height: process.platform === 'darwin' ? 500 : 550
  }
};

exports.default = function loadDefault(config) {
  return config.set(def);
};
