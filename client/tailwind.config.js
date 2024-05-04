/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#191641",
        lightBlue: '#1916414D',
        gray: "#9CA3AF",
      }
    },
  },
  plugins: [],
}

