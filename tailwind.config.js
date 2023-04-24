const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 */
module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      emerald: colors.emerald,
      bronze: {
        DEFAULT: "#CE882B",
        500: "#CE882B",
      },
      pink: {
        DEFAULT: "#F8EAE6",
        500: "#F8EAE6",
      },
      peach: {
        DEFAULT: "#F2AAA2",
        50: "#FFE1DE",
        100: "#FFD8D4",
        200: "#FFCFC9",
        300: "#FFC6BF",
        400: "#FCB9B2",
        500: "#F2AAA2",
        600: "#E89A92",
        700: "#DE8B83",
        800: "#D47D74",
        900: "#C97067",
      },
      lightpeach: {
        DEFAULT: "#FED0BB",
        50: "#FEF4EF",
        100: "#FEEDE5",
        200: "#FEE6DA",
        300: "#FEDFD0",
        400: "#FED8C6",
        500: "#FED0BB",
        600: "#FECAB2",
        700: "#FEC3A8",
        800: "#FEBC9D",
        900: "#FEB593",
      },
      darkpeach: {
        DEFAULT: "#C98686",
        50: "#F0C5C5",
        100: "#E8B7B7",
        200: "#E0ABAB",
        300: "#D99E9E",
        400: "#D19292",
        500: "#C98686",
        600: "#BF7878",
        700: "#B56B6B",
        800: "#AB5E5E",
        900: "#A15252",
      },
      purplegray: {
        DEFAULT: "#5D4E60",
        50: "#938E94",
        100: "#88808A",
        200: "#7D7380",
        300: "#736675",
        400: "#685A6B",
        500: "#5D4E60",
        600: "#534357",
        700: "#49384D",
        800: "#3F2E42",
        900: "#352438",
      },
      purplegrey: {
        DEFAULT: "#5D4E60",
        50: "#938E94",
        100: "#88808A",
        200: "#7D7380",
        300: "#736675",
        400: "#685A6B",
        500: "#5D4E60",
        600: "#534357",
        700: "#49384D",
        800: "#3F2E42",
        900: "#352438",
      },
      whitepeach: {
        DEFAULT: "#FEF9FF",
        300: "#FEF9FF",
        400: "#FBF5FC",
        500: "#F8F0FA",
        600: "#F5EBF7",
        700: "#F2E6F5",
      },
    },
    screens: {
      sm: "480px",
      md: "640px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        serif: ["Roboto Slab", ...defaultTheme.fontFamily.serif],
      },
      padding: {
        38: "152px",
        52.5: "210px",
        64.5: "258px",
      },
      // top/right/bottom/left
      inset: {
        28: "112px",
        30: "120px",
        38: "152px",
        52.5: "210px",
        64.5: "258px",
      },
    },
  },
};
