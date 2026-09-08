import Image from "next/image";
import Link from "next/link";
import Portfolio from "@/components/portfolio";
import ProjectEnquiry from "@/components/project-enquiry";
import { metadata as makeMetadata } from "@/lib/seo";
import { projects } from "@/lib/projects";
export const metadata = makeMetadata(
  "Our Projects",
  "Spaces designed with intention. Explore ongoing 3D designs and completed interior project stories from Nestora Interiors.",
  "/projects",
);
export default function Projects() {
  const featured = projects[0];
  return (
    <>
      <section className="wrap portfolio-hero">
        <div className="portfolio-hero-copy">
          <p className="eyebrow">Nestora Interiors / Selected work</p>
          <h1>Our Projects</h1>
          <h2>
            Spaces designed
            <br />
            with <em>intention.</em>
          </h2>
          <p>
            Thoughtful, functional and beautiful interiors. From the first
            design to the finishing details, explore how we bring a home
            together.
          </p>
          <div className="portfolio-jumps">
            <a href="#ongoing">
              Ongoing projects <span>↗</span>
            </a>
            <a href="#completed">
              Completed projects <span>↗</span>
            </a>
          </div>
          <span className="hero-index">
            A considered approach. A personal space.
          </span>
        </div>
        {featured && (
          <figure className="portfolio-hero-visual">
            <Link href={`/projects/${featured.slug}`}>
              <Image
                src={featured.coverImage.src}
                alt={featured.coverImage.alt}
                fill
                preload
                sizes="(max-width: 700px) 88vw, 50vw"
              />
            </Link>
            <figcaption>
              <span>
                {featured.status === "Ongoing"
                  ? "3D design / Living room"
                  : "Completed interior"}
              </span>
              <span>Selected work — 01</span>
            </figcaption>
          </figure>
        )}
      </section>
      <Portfolio />
      <ProjectEnquiry />
    </>
  );
}
