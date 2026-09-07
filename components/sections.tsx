import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  House,
  LayoutGrid,
  Utensils,
  Sofa,
  BedDouble,
  PanelsTopLeft,
} from "lucide-react";
import { faqs, processSteps, services, projects, reasons } from "@/lib/content";
import { testimonials, company } from "@/lib/config";
import { Consultation, Eyebrow, WhatsApp } from "./ui";
export function ServicePreview() {
  const icons = [House, Utensils, Sofa, BedDouble, LayoutGrid, PanelsTopLeft];
  return (
    <section className="section wrap" id="services">
      <div className="section-heading">
        <div>
          <Eyebrow>Spaces, thoughtfully transformed</Eyebrow>
          <h2>
            Every room.
            <br />
            <em>A little more you.</em>
          </h2>
        </div>
        <div>
          <p>
            From a single room to a complete home,
            <br />
            good design starts with how you live.
          </p>
          <Link className="text-link" href="/services">
            Explore All Services <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="service-grid">
        {services.slice(0, 6).map((s, i) => {
          const Icon = icons[i];
          return (
            <article className="service-card" key={s.id}>
              <Icon size={29} strokeWidth={1} />
              <span className="service-number">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <Link
                className="text-link"
                href={`/contact?service=${encodeURIComponent(s.name)}`}
              >
                Let’s explore <ArrowUpRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>
      <div className="service-more">
        {services.slice(6).map((s) => (
          <Link key={s.id} href={`/services#${s.id}`}>
            {s.name}
            <ArrowUpRight size={13} />
          </Link>
        ))}
      </div>
    </section>
  );
}
export function ProjectCard({
  project: p,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <article className="project-card">
      <Link className="project-image" href={`/projects/${p.slug}`}>
        <Image
          src={p.image}
          alt={`${p.room} with ${p.style.toLowerCase()} interior detailing, supplied design reference`}
          fill
          sizes="(max-width: 700px) 100vw, 45vw"
        />
        {p.sample && <span className="sample-badge">Sample Project</span>}
        <span className="image-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="project-meta">
        {p.style} <span>—</span> {p.room}
      </div>
      <h3>
        <Link href={`/projects/${p.slug}`}>{p.name}</Link>
      </h3>
      <p>{p.description}</p>
      <div className="project-links">
        <Link className="text-link" href={`/projects/${p.slug}`}>
          View Project <ArrowUpRight size={14} />
        </Link>
        <WhatsApp
          message={company.projectMessage(p.name)}
          label="Enquire About This Design"
          className="text-link"
        />
      </div>
    </article>
  );
}
export function FeaturedProjects() {
  return (
    <section className="section project-section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>A glimpse of what’s possible</Eyebrow>
            <h2>
              Spaces with <em>soul.</em>
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            Explore All Projects <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="sample-note">
          Design inspiration using supplied reference imagery. Project names and
          descriptions are samples.
        </p>
        <div className="featured-grid">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
export function WhyUs() {
  return (
    <section className="section wrap why-grid">
      <div className="why-image">
        <Image
          src="/images/detail.webp"
          fill
          sizes="(max-width: 800px) 100vw, 45vw"
          alt="Wood, marble-inspired finishes and warm brass lighting in an interior reference"
        />
        <div className="image-caption">
          Beautiful in detail.
          <br />
          <em>Purposeful by design.</em>
        </div>
      </div>
      <div>
        <Eyebrow>The Nestora way</Eyebrow>
        <h2>
          A home that feels right.
          <br />
          <em>In every detail.</em>
        </h2>
        <p>
          We believe the best interiors are as comfortable to live in as they
          are beautiful to look at.
        </p>
        <div className="reason-grid">
          {reasons.map(([title, text]) => (
            <div key={title}>
              <Check size={18} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <Link className="text-link" href="/about">
          Get to Know Nestora <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="section process-section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>From your first idea to your front door</Eyebrow>
            <h2>
              A thoughtful journey.
              <br />
              <em>A beautiful outcome.</em>
            </h2>
          </div>
          <p>
            Clear steps. Considered decisions.
            <br />A home brought together, with you.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map(([title, text], i) => (
            <article key={title}>
              <span className="step">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="center">
          <Consultation />
        </div>
      </div>
    </section>
  );
}
export function Reviews() {
  return (
    <section className="section wrap reviews">
      <Eyebrow>Stories of home</Eyebrow>
      <h2>Good design begins with listening.</h2>
      {testimonials.length ? (
        testimonials.map((t) => (
          <blockquote key={t.name}>
            <p>“{t.quote}”</p>
            <cite>{t.name}</cite>
          </blockquote>
        ))
      ) : (
        <div className="review-placeholder">
          <span>CLIENT STORIES · COMING SOON</span>
          <p>
            This space is reserved for real experiences from Nestora homeowners.
          </p>
          <small>
            Review placeholder — verified customer testimonials will be added
            here.
          </small>
        </div>
      )}
    </section>
  );
}
export function FAQ() {
  return (
    <section className="section wrap faq-grid">
      <div>
        <Eyebrow>A little clarity</Eyebrow>
        <h2>
          Your questions,
          <br />
          <em>thoughtfully answered.</em>
        </h2>
        <p>Have something else in mind?</p>
        <WhatsApp className="text-link" />
      </div>
      <div>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
