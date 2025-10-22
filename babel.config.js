module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        "@": "./src",
                        "@core": "./src/core",
                        "@features": "./src/features",
                        "@shared": "./src/shared",
                        "@assets": "./src/assets",
                        "@app": "./src/app",
                        // Feature-specific aliases
                        "@auth": "./src/features/auth",
                        "@lists": "./src/features/lists"
                    }
                }
            ]
        ]
    };
};