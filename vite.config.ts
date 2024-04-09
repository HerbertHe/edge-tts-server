import { defineConfig } from "vite"

export default defineConfig({
    server: {
        proxy: {
            "/tts": "http://localhost:8088",
            "/a": "http://localhost:8088"
        },
    },
    publicDir: "assets",
    build: {
        outDir: "public"
    }
})
