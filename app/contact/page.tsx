import { company, seo } from "@/lib/config";
import { metadata as makeMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui";
import ContactForm from "@/components/contact-form";
export const metadata = makeMetadata(
  seo.contact.title,
  seo.contact.description,
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return (
    <>
      <PageIntro
        label="Let’s create something personal"
        title="Your beautiful home starts with a conversation."
        description="Book a free initial consultation. Share your ideas, ask your questions, and let’s explore what’s possible for your home in Hyderabad."
      />
      <section className="wrap contact-grid">
        <aside className="contact-info">
          <h2>We’d love to hear from you.</h2>
          <div className="contact-item">
            <span>Company</span>
            {company.name}
          </div>
          <div className="contact-item">
            <span>Service area</span>
            {company.location}
          </div>
          <a className="contact-item" href={`mailto:${company.email}`}>
            <span>Send an email ↗</span>
            {company.email}
          </a>
          <a
            className="contact-item"
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Chat on WhatsApp ↗</span>
            {company.phone}
          </a>
          <p>
            Have a floor plan or a mood board? You can share it with us directly
            through email or WhatsApp.
          </p>
        </aside>
        <ContactForm selectedService={service} />
      </section>
    </>
  );
}
