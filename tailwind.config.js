const defaultTheme = require("tailwindcss/defaultTheme");

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 */
module.exports = {
  theme: {
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
    },
  },
};
