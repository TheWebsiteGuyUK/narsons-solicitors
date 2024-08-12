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
  header_headline: string;
  header_image: string;
  header_content: string;
  heroButtons: { label: string; href: string }[];

}

type Schema = {
  global: Global;
  home_page: HomePage;
  services: Services[];
}

// Initialize Directus instance
const directus = createDirectus<Schema>(import.meta.env.PUBLIC_API).with(rest());

export default directus;
