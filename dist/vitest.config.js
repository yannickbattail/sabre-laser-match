"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ["tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        reporters: ["verbose"],
        globals: true,
        outputFile: {
            junit: "./junit.xml",
        },
        coverage: {
            provider: "v8",
            reportsDirectory: "./coverage",
            include: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
            exclude: [
                "dist/**",
                "eslint.config.mjs",
                "vitest.config.ts",
                "src/magic-cli.ts",
                "src/utils/Gitlab.ts",
                "src/types/**",
            ],
            thresholds: {
                branches: 80,
                lines: 90,
            },
        },
        setupFiles: ["./tests/setup.ts"],
    },
});
