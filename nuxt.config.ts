// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Stitch Flair",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500&family=Roboto+Slab:wght@300;400;500;600;700;800&display=swap",
        },
      ],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@formkit/nuxt"],
  tailwindcss: {
    exposeConfig: true,
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    injectPosition: "first",
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_PASSWORD: process.env.SUPABASE_PASSWORD,
      EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    },
  },
  routeRules: {
    // Product page generated on-demand, revalidates in background
    "/oauth/redirect": { ssr: false },
  },
});
