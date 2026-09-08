import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/lib/projects";
export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article
      className={`project-card studio-card ${p.status === "Completed" ? "is-completed" : ""}`}
    >
      <Link
        className="project-image"
        href={`/projects/${p.slug}`}
        aria-label={`${p.status === "Ongoing" ? "View design" : "Watch project"}: ${p.name}`}
      >
        <Image
          src={p.coverImage.src}
          alt={p.coverImage.alt}
          fill
          sizes="(max-width: 700px) 88vw, 55vw"
        />
        <span className="sample-badge">
          {p.status === "Ongoing" ? "3D Design · Ongoing" : "Completed · Film"}
        </span>
        {p.status === "Completed" && (
          <span className="film-play">
            <Play aria-hidden="true" />
          </span>
        )}
      </Link>
      <div className="studio-card-copy">
        <p className="project-meta">
          {p.location || "Location to be added"} · {p.projectType}
        </p>
        <h3>
          <Link href={`/projects/${p.slug}`}>{p.name}</Link>
        </h3>
        <p>{p.description}</p>
        <Link className="text-link" href={`/projects/${p.slug}`}>
          {p.status === "Ongoing" ? "View Design" : "Watch Project"}{" "}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
