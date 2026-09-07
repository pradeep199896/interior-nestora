import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { company, whatsappUrl } from "@/lib/config";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function WhatsApp({
  message,
  label = "Chat on WhatsApp",
  className = "button outline",
}: {
  message?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={17} />
      {label}
      <ArrowUpRight size={16} />
    </a>
  );
}
export function Consultation({
  service,
  label = "Book a Free Consultation",
  className = "button",
}: {
  service?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      className={className}
      href={
        service ? `/contact?service=${encodeURIComponent(service)}` : "/contact"
      }
    >
      {label}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro wrap">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="wrap">
        <Eyebrow>A beautiful beginning</Eyebrow>
        <h2>
          Let’s Design a Home
          <br />
          That Feels Like <em>You.</em>
        </h2>
        <p>
          Planning your dream home in Hyderabad? Connect with Nestora Interiors
          and book your free initial consultation.
        </p>
        <div className="actions">
          <Consultation label="Book a Consultation" />
          <WhatsApp />
          <a className="text-link" href={`mailto:${company.email}`}>
            Send an Email <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
