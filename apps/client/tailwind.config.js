/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primaryText": {
          DEFAULT: "#212121"
        },
        "thesis": {
          50: "#EFEFF1",
          100: "#DEDEE3",
          200: "#BDBDC7",
          300: "#9C9CAA",
          400: "#7B7B8E",
          500: "#5E5E6E",
          600: "#4B4B58",
          700: "#383842",
          800: "#26262C",
          900: "#131316",
          950: "#09090B"
        }
      },
      scale: {
        "-flip": "-1",
        "-hover": "98%",
        "-tap": "96%",
      },
      screens: {
        mm: "640px",
      },
      keyframes: {
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
