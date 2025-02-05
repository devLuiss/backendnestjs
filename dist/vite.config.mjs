"use strict";
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
    plugins: [tsConfigPaths()],
    test: {
        globals: true,
    },
});
//# sourceMappingURL=vite.config.mjs.map