"use client";
import { useState } from "react";
import { projects, projectCategories } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { Play } from "lucide-react";
export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const filtered = projects.filter(
    (p) =>
      filter === "All" ||
      p.status === filter ||
      p.categories.some((c) => c === filter),
  );
  return (
    <div className="studio-portfolio">
      <div className="wrap portfolio-controls">
        <p className="eyebrow">Explore the portfolio</p>
        <div className="filters" role="group" aria-label="Filter projects">
          {["All", "Ongoing", "Completed", ...projectCategories].map((f) => (
            <button
              key={f}
              className="filter"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <p role="status" className="portfolio-count">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {filter !== "All" ? ` · ${filter}` : ""}
        </p>
      </div>
      {(["Ongoing", "Completed"] as const)
        .filter(
          (status) =>
            !["Ongoing", "Completed"].includes(filter) || status === filter,
        )
        .map((status) => {
          const entries = filtered.filter((p) => p.status === status);
          return (
            <section
              key={status}
              id={status.toLowerCase()}
              className={`portfolio-chapter ${status === "Completed" ? "completed-chapter" : ""}`}
              aria-labelledby={`${status}-title`}
            >
              <div className="wrap">
                <div className="chapter-heading">
                  <div>
                    <p className="eyebrow">
                      {status === "Ongoing"
                        ? "01 / The design journal"
                        : "02 / The finished spaces"}
                    </p>
                    <h2 id={`${status}-title`}>{status} Projects</h2>
                  </div>
                  <div>
                    <h3>
                      {status === "Ongoing"
                        ? "Designs in progress."
                        : "Spaces brought to life."}
                    </h3>
                    <p>
                      {status === "Ongoing"
                        ? "Explore the ideas, details and 3D designs shaping a home."
                        : "A closer look at finished homes, through films and photography."}
                    </p>
                  </div>
                </div>
                {entries.length ? (
                  <div className="studio-project-list">
                    {entries.map((p) => (
                      <ProjectCard key={p.slug} project={p} />
                    ))}
                  </div>
                ) : (
                  <div className="portfolio-empty">
                    {status === "Completed" && (
                      <Play size={28} aria-hidden="true" />
                    )}
                    <h3>
                      {status === "Completed"
                        ? "The next chapter, coming soon."
                        : "More designs to come."}
                    </h3>
                    <p>
                      {status === "Completed"
                        ? "Finished-home walkthroughs and photography will appear here as our project stories are ready to share."
                        : "There are no published designs for this selection yet."}
                    </p>
                    {filter !== "All" && (
                      <button
                        className="filter"
                        onClick={() => setFilter("All")}
                      >
                        View all projects
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          );
        })}
    </div>
  );
}
