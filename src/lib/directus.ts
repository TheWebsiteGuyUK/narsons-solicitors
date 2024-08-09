import { createDirectus, rest } from '@directus/sdk';

type Global = {
  title: string;
  description: string;
  logo: string;
}

type HomePage = {
  title: string;
  content: string;
  slug: string;
  image: string;
  heroImage: string;
  heroImageAlt: string;
  heroHeadline: string;
  heroContent: string;
  heroButtons: { label: string; href: string }[];

}

type Services = {
  title: string;
  content: string;
  slug: string;
  image: string;
  heroImage: string;
  heroImageAlt: string;
  heroHeadline: string;
  heroContent: string;
  heroButtons: { label: string; href: string }[];

}

type Schema = {
  global: Global;
  home_page: HomePage;
  services: Services;
}

// Initialize Directus instance
const directus = createDirectus<Schema>('https://portal.narsonssolicitors.co.uk/').with(rest());

export default directus;
