/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundPosition: {
        "right-4": "right",
      },
      fontFamily: {
        spartan: "League Spartan",
      },
      colors: {
        darkPurple: "#7C5DFA",
        lightPurple: "#9277FF",
        purple: "#DFE3FA",
        darkBlue: "#1E2139",
        blue: "#252945",
        grey: "#7E88C3",
        black: "#0C0E16",
        red: "#EC5757",
        lightRed: "#FF9797",
        lightGrey: "#F8F8F8",
        blackv2: "#141625",
        darkGrey: "#373B53",
        green: "#33D69F",
        orange: "#FF8F00",
        lightWhite: "#F9FAFE",
        darkWhite: "#DFE3FA",
      },
      screens: {
        md: "768px",
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
