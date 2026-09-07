import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { company } from "@/lib/config";
import { metadata as makeMetadata } from "@/lib/seo";
import { PageIntro, WhatsApp, FinalCTA } from "@/components/ui";
import { ProjectCard } from "@/components/sections";
import Gallery from "@/components/gallery";
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
        `${p.name}${p.sample ? " — Sample Project" : ""}`,
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
  return (
    <>
      <PageIntro
        label={`${p.sample ? "Sample Project · " : ""}${p.style} · ${p.room}`}
        title={p.name}
        description={
          p.sample
            ? "Design inspiration from supplied interior references. This is a sample project presentation, with no client or completion claims."
            : p.description
        }
      />
      <div className="wrap">
        <Gallery images={p.gallery} name={p.name} sample={p.sample} />
        <section className="project-overview">
          <div>
            <h2>A closer look.</h2>
            <p>{p.description}</p>
            <WhatsApp
              label="Enquire About a Similar Design"
              message={company.projectMessage(p.name)}
            />
          </div>
          <div>
            <h2>Design highlights</h2>
            <ul>
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p>
              Category: {p.style} · Design style: {p.style}
              <br />
              Space type: {p.room}
            </p>
          </div>
        </section>
        {p.slug === "warm-modern-living" && (
          <section className="video-block">
            <h2>Walk through the details.</h2>
            <video
              controls
              playsInline
              preload="none"
              poster="/images/living.webp"
              aria-label="Supplied interior reference walkthrough, presented without audio"
            >
              <source src="/videos/walkthrough.mp4" type="video/mp4" />
            </video>
            <p>
              Supplied reference walkthrough, presented without audio. Visual
              description: living areas, decorative partitions, fitted storage
              and coordinated interior finishes.
            </p>
          </section>
        )}
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
      </div>
      <FinalCTA />
    </>
  );
}
