const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Resolution settings for modern ESM/CJS packages
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

config.resolver.blockList = [
  /.*\/node_modules\/.*\.gradle\/.*/,
  /.*\/node_modules\/@react-native\/gradle-plugin\/.*/
];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-i18next') {
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, 'node_modules/react-i18next/dist/commonjs/index.js'),
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
