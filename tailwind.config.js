const defaultTheme = require('tailwindcss/defaultTheme')

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 */
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Poppins',
                    ...defaultTheme.fontFamily.sans,
                ]
            }
        }
    }
};