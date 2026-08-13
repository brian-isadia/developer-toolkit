import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

const config = defineConfig({
    resolve: { tsconfigPaths: true },
    plugins: [
        devtools(),
        tailwindcss(),
        tanstackStart(),
        nitro({
            preset: process.env.VERCEL ? "vercel" : "bun",
            vercel: {
                functions: {
                    runtime: "bun1.x",
                },
            },
        }),
        viteReact(),
        babel({ presets: [reactCompilerPreset()] }),
    ],
});

export default config;
