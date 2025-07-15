const { getDefaultConfig } = require("expo/metro-config");
const { addLiveStoreDevtoolsMiddleware } = require("@livestore/devtools-expo");

const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

addLiveStoreDevtoolsMiddleware(config, { schemaPath: './livestore/schema.ts' })

module.exports = withNativeWind(config, { input: "./global.css" });
