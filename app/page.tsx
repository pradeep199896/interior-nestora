import Image from "next/image";
import { ArrowDown, MapPin, Compass, Layers, Heart } from "lucide-react";
import { company, seo } from "@/lib/config";
import { metadata as makeMetadata } from "@/lib/seo";
import { Consultation, Eyebrow, FinalCTA, WhatsApp } from "@/components/ui";
import {
  FAQ,
  FeaturedProjects,
  Process,
  Reviews,
  ServicePreview,
  WhyUs,
} from "@/components/sections";
export const metadata = {
  ...makeMetadata(seo.home.title, seo.home.description, "/"),
  title: { absolute: seo.home.title },
};
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    url: company.siteUrl,
    email: company.email,
    telephone: company.phone,
    areaServed: { "@type": "City", name: "Hyderabad" },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero">
        <Image
          src="/images/hero.webp"
          alt="AI-generated concept of a warm contemporary living room with wood finishes and soft lighting"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <Eyebrow>Thoughtful interiors. Meaningful living.</Eyebrow>
          <h1>
            Beautiful Homes,
            <br />
            Thoughtfully
            <br />
            <em>Designed.</em>
          </h1>
          <p>{company.description}</p>
          <div className="actions">
            <Consultation />
            <WhatsApp />
          </div>
          <div className="hero-location">
            <MapPin size={14} />
            DESIGNED FOR HOMES IN HYDERABAD
          </div>
        </div>
        <a className="hero-scroll" href="#services">
          <span>Discover the Nestora way</span>
          <ArrowDown size={16} />
        </a>
        <div className="hero-note">
          <span className="hero-note-title">THE ART OF FEELING AT HOME</span>
          <span>AI-generated design concept</span>
        </div>
      </section>
      <div className="values-strip wrap">
        <span>
          <Compass />
          Designed around you
        </span>
        <span>
          <Layers />
          Thoughtfully planned spaces
        </span>
        <span>
          <Heart />
          Beauty in the everyday
        </span>
        <span className="strip-caption">
          YOUR HOME. YOUR STORY. OUR DESIGN.
        </span>
      </div>
      <ServicePreview />
      <FeaturedProjects />
      <WhyUs />
      <Process />
      <Reviews />
      <FAQ />
      <FinalCTA />
    </>
  );
}
