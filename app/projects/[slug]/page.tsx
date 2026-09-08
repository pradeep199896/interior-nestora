import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { metadata as makeMetadata } from "@/lib/seo";
import Gallery from "@/components/gallery";
import ProjectEnquiry from "@/components/project-enquiry";
import { ProjectCard } from "@/components/project-card";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? makeMetadata(
        `${p.name} — ${p.status}`,
        p.description,
        `/projects/${slug}`,
      )
    : { title: "Project not found" };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const ongoing = p.status === "Ongoing";
  const images = p.status === "Ongoing" ? p.designImages : p.galleryImages;
  return (
    <>
      <div className="wrap project-detail">
        <Link className="text-link back-projects" href="/projects">
          ← All projects
        </Link>
        <header className="detail-heading">
          <p className="eyebrow">
            {ongoing
              ? "The design journal / 3D visualisations"
              : "The finished spaces / Project film"}
          </p>
          <h1>{p.name}</h1>
          <p>{p.description}</p>
          <dl className="project-facts">
            <div>
              <dt>Location</dt>
              <dd>{p.location || "To be added"}</dd>
            </div>
            <div>
              <dt>Project type</dt>
              <dd>{p.projectType}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className="status-dot" />
                {p.status}
              </dd>
            </div>
            {p.status === "Ongoing" && (
              <div>
                <dt>Current stage</dt>
                <dd>{p.phase}</dd>
              </div>
            )}
          </dl>
        </header>
        {p.status === "Completed" ? (
          <section
            className="video-block"
            aria-label="Completed project walkthrough"
          >
            <video
              controls
              playsInline
              preload="none"
              poster={p.coverImage.src}
              aria-label={`${p.name} completed interior walkthrough`}
            >
              <source src={p.videoUrl} />
              {p.captionsUrl && (
                <track
                  kind="captions"
                  src={p.captionsUrl}
                  srcLang="en"
                  label="English"
                  default
                />
              )}
            </video>
            <p>{p.videoDescription}</p>
          </section>
        ) : (
          <figure className="detail-hero">
            <Image
              src={p.coverImage.src}
              alt={p.coverImage.alt}
              width={1212}
              height={1536}
              preload
              sizes="(max-width:700px) 88vw, 75vw"
            />
            <figcaption>
              3D design visualisation · {p.coverImage.label}
            </figcaption>
          </figure>
        )}
        <section className="design-gallery">
          <div className="chapter-heading">
            <div>
              <p className="eyebrow">Room by room</p>
              <h2>
                {ongoing
                  ? "A home, in the making."
                  : "Inside the finished home."}
              </h2>
            </div>
            <p>
              {ongoing
                ? "Explore the 3D design details. Select any image for a closer look."
                : "Actual completed-project photography."}
            </p>
          </div>
          {images.length > 0 ? (
            <Gallery images={images} name={p.name} />
          ) : (
            <p>Project photography will be added soon.</p>
          )}
        </section>
        <section className="design-concept">
          <div>
            <p className="eyebrow">Behind the spaces</p>
            <h2>{ongoing ? "The design concept." : "The project story."}</h2>
          </div>
          <div className="concept-details">
            <article>
              <h3>Client requirement</h3>
              <p>{p.clientRequirement || "Project brief to be added."}</p>
            </article>
            <article>
              <h3>Design approach</h3>
              <p>{p.designApproach || "Design notes to be added."}</p>
            </article>
            <article>
              <h3>Materials & finishes</h3>
              {p.materialsAndFinishes?.length ? (
                <ul>
                  {p.materialsAndFinishes.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              ) : (
                <p>Material details to be added.</p>
              )}
            </article>
            {p.colorPalette && (
              <article>
                <h3>Color palette</h3>
                <div className="palette-list">
                  {p.colorPalette.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </article>
            )}
            {p.lightingConcept && (
              <article>
                <h3>Lighting concept</h3>
                <p>{p.lightingConcept}</p>
              </article>
            )}
            {p.highlights && (
              <article>
                <h3>Design highlights</h3>
                <ul>
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        </section>
        {projects.length > 1 && (
          <section className="related">
            <h2>More spaces to explore.</h2>
            <div>
              {projects
                .filter((r) => r.slug !== p.slug)
                .map((r) => (
                  <ProjectCard key={r.slug} project={r} />
                ))}
            </div>
          </section>
        )}
        <Link className="text-link back-projects" href="/projects">
          ← Back to the portfolio
        </Link>
      </div>
      <ProjectEnquiry />
    </>
  );
}
