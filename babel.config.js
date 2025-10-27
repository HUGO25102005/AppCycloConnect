module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    root: ["./src"],
                    alias: {
                        "@": "./src",
                        "@core": "./src/core",
                        "@features": "./src/features",
                        "@shared": "./src/shared",
                        "@assets": "./src/assets",
                        "@app": "./src/app",
                        // Feature-specific aliases
                        "@auth": "./src/features/auth",
                        "@lists": "./src/features/lists",
                        "@theme": "./src/features/theme",
                        "@firebase": "./src/firebase",
                    },
                    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                }
            ]
        ]
    };
};