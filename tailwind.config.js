/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Link: "#c180b6",
        primary: {
          50: "#dfcadd",
          100: "#d4b9d1",
          200: "#c9a7c6",
          300: "#be95ba",
          400: "#b384af",
          500: "#a972a3",
          600: "#9e6198",
          700: "#934f8c",
          800: "#84477e",
          900: "#763f70",
        },
        success: {
          50: "#c0e0c6",
          100: "#abd6b3",
          200: "#96cca1",
          300: "#80c28e",
          400: "#6bb87b",
          500: "#56ad68",
          600: "#41a355",
          700: "#2c9942",
          800: "#288a3b",
          900: "#237a35",
        },
        warning: {
          50: "#fff3b3",
          100: "#ffef99",
          200: "#ffeb80",
          300: "#ffe666",
          400: "#ffe24d",
          500: "#ffde33",
          600: "#ffda1a",
          700: "#ffd600",
          800: "#e6c100",
          900: "#ccab00",
        },
        error: {
          50: "#f3c3c6",
          100: "#efafb3",
          200: "#eb9ba0",
          300: "#e6868d",
          400: "#e2727a",
          500: "#de5e67",
          600: "#da4a54",
          700: "#d63641",
          800: "#c1313b",
          900: "#ab2b34",
        },
        dark: {
          50: "#ccd0d4",
          100: "#99a1a9",
          200: "#808a94",
          300: "#66737f",
          400: "#4d5b69",
          500: "#334454",
          600: "#1a2c3e",
          700: "#001529",
          800: "#001325",
          900: "#001121",
        }
      }
    }
  },
  plugins: [],
}