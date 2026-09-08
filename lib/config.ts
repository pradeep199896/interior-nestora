export const company = {
  name: "Nestora Interiors",
  location: "Hyderabad, Telangana, India",
  serviceArea: "Hyderabad",
  email: "thenestorainteriors@gmail.com",
  phone: "+91 7013265720",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917013265720",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
  description:
    "Personalized home interiors designed for the way you live. Nestora Interiors brings together thoughtful planning, elegant design, and quality execution for homes across Hyderabad.",
  defaultMessage:
    "Hi Nestora Interiors, I'm interested in home interior design services in Hyderabad. I would like to book a free consultation.",
  serviceMessage: (name: string) =>
    `Hi Nestora Interiors, I’m interested in ${name}. Please share more details and help me book a consultation.`,
  projectMessage: (name: string) =>
    `Hi Nestora Interiors, I liked the ${name} design. I’m interested in a similar interior design for my home in Hyderabad.`,
};
export const whatsappUrl = (message = company.defaultMessage) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
export const navigation = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["About Us", "/about"],
  ["Design Process", "/design-process"],
  ["Contact", "/contact"],
];
export const team: { name: string; role: string; bio: string }[] = [];
export const testimonials: { name: string; quote: string }[] = [];
export const socialLinks: { label: string; url: string }[] = [];
export const seo = {
  home: {
    title: "Nestora Interiors | Home Interior Designers in Hyderabad",
    description:
      "Transform your home with Nestora Interiors. Explore personalized home interiors, modular kitchens, living rooms, bedrooms, wardrobes, lighting, and complete interior solutions in Hyderabad.",
  },
  services: {
    title: "Interior Design Services in Hyderabad",
    description:
      "Explore complete home interiors, modular kitchens, bedrooms, wardrobes, lighting and renovation services from Nestora Interiors in Hyderabad.",
  },
  projects: {
    title: "Interior Design Inspiration & Sample Projects",
    description:
      "Explore ongoing 3D designs and completed interior project stories. Thoughtful spaces by Nestora Interiors.",
  },
  about: {
    title: "About Nestora Interiors",
    description:
      "Our approach to beautiful, functional homes in Hyderabad: personalized planning, considered materials and close collaboration.",
  },
  contact: {
    title: "Book a Free Interior Design Consultation",
    description:
      "Contact Nestora Interiors in Hyderabad through WhatsApp, email or our consultation form. Tell us about your home and design requirements.",
  },
  process: {
    title: "Our Interior Design Process",
    description:
      "From a free consultation and space planning to material approval, execution and final handover: explore our design process.",
  },
};
