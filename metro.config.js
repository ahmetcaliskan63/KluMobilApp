const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /.*\/node_modules\/.*\.gradle\/.*/,
  /.*\/node_modules\/@react-native\/gradle-plugin\/.*/
];

module.exports = config;
