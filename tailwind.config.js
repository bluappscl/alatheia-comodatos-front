/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textgrey: {
          100: "#848484",
          200: "#6e6d6d"
        },
        side: {
          100: "#ffb136",
          200: "#e69f31"
        },
        primary: {
          100: "#e1e6d8",
          200: "#e1e6d7",
          300: "#a9b48b",
          400: "#4f8ec6",
          500: "#71823e",
        },
        success: {
          100: "#f9f4ea",
          200: "#f9f5ea",
          300: "#f2ebd6",
          400: "#e6d9ad",
          500: "#dfd099",
        },
        info: {
          100: "#f7eddb",
          200: "#f0ceb3",
          300: "#df9e67",
          400: "#e09d66",
          500: "#d8853f",
        },
        warning: {
          100: "#eae3cb",
          200: "#f3e2b7",
          300: "#ebd192",
          400: "#e6c36f",
          500: "#e2b34b",
        },
        error: {
          100: "#e7e2de",
          200: "#cbc0bd",
          300: "#b5a79c",
          400: "#9f897a",
          500: "#866c5b",
        },
        bgContainer: {
          100: "#fcfbf7",
          200: "#faf7f0",
          300: "#f8f1e7",
          400: "#f2eee0",
          500: "#f3ead8",
        },
        bgContainer2: {
          100: "#ccccb4",
          200: "#d4d0b8",
          300: "#cec7b5",
          400: "#ccc4b4",
        },
      }
    }
  },
  plugins: [],
}