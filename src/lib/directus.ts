import { createDirectus, rest } from '@directus/sdk';

type Global = {
  title: string;
  description: string;
}

type HomePage = {
  title: string;
  content: string | null;
  slug: string;
  image: string | null;
  heroImage: string | null;
  heroImageAlt: string | null;
  heroHeadline: string;
  heroContent: string;
  heroButtons: { label: string; href: string }[];
  Services: string[]; // Array of service IDs
}

type Services = {
  id: number;
  headline: string;
  content: string;
  slug: string;
  image: string;
}

type Schema = {
  global: Global;
  services: Services[];
  home_page: HomePage;
}

// Initialize Directus instance
const directus = createDirectus<Schema>('https://portal.narsonssolicitors.co.uk/').with(rest());

export default directus;
