import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import react from "@astrojs/react";
import swup from '@swup/astro';
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware"
  }),
  site: 'https://narsonssolicitors.co.uk',
  integrations: [react(), tailwind(), 
    swup({
    theme: 'slide',
    animationClass: 'transition-',
    containers: ['main'],
    cache: true,
    preload: true,
    accessibility: true,
    forms: false,
    morph: true,
    parallel: false,
    progress: false,
    routes: false,
    smoothScrolling: true,
    updateBodyClass: false,
    updateHead: true,
    reloadScripts: true,
    debug: false,
    loadOnIdle: true,
    globalInstance: false
  }), 
  playformCompress(), sitemap()]
});