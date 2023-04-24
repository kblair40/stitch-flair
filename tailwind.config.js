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
