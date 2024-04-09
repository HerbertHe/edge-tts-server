/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from "@iconify/tailwind"
export default {
    content: ["./index.html", "./src/**/*.{jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [addDynamicIconSelectors()],
}
