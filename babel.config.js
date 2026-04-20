module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // react-native-worklets/plugin MUST be listed last per Reanimated 4 / SDK 54 docs.
    plugins: ['react-native-worklets/plugin'],
  };
};
