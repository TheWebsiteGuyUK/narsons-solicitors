import { createDirectus, rest } from '@directus/sdk';

type CompanyDetails = {
  company_name: string;
  phone_number: string;
  email_address: string;
  office_hours: string;
  address_line_1: string;
  address_line_2: string;
  town: string;
  city: string;
  postcode: string;
  company_logo: string;
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
  heroButtons: { label: string; href: string; variant: string }[];
}

type AboutPage = {
  title: string;
  headline: string;
  intro: string;
  our_mission: string;
  our_vision: string;
  our_values: string;
  additional_info: string;
  main_image: string;
  main_image_alt: string;
}

type Team = {
  status: string;
  name: string;
  position: string;
  bio: string;
  picture: string;
}

type LegalPages = {
  title: string;
  slug: string;
  content: string;
  date_updated: string;
  status: string;
}

type Services = {
  status: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  svgIcon: string;
  image: string;
  header_headline: string;
  header_image: string;
  header_image_alt: string;
  header_content: string;
  featured_headline: string;
  featured_services: { service: string; details: string }[];
  fees: string;
  additional_content: string;
}

type Testimonials = {
  status: string;
  client_name: string;
  comments: string;
}

type Schema = {
  company_details: CompanyDetails;
  home_page: HomePage;
  about_page: AboutPage;
  services: Services[];
  testimonials: Testimonials[];
  legal_pages: LegalPages[];
  team: Team[];
}

// Initialize Directus instance
const directus = createDirectus<Schema>(import.meta.env.PUBLIC_API).with(rest());

export default directus;
