"use client";
import { useState } from "react";
import { categories, rooms, projects } from "@/lib/content";
import { ProjectCard } from "./sections";
import { WhatsApp } from "./ui";
export default function Portfolio() {
  const [style, setStyle] = useState("All");
  const [room, setRoom] = useState("All");
  const filtered = projects.filter(
    (p) =>
      (style === "All" || p.style === style) &&
      (room === "All" || p.room === room),
  );
  return (
    <div className="wrap">
      <div className="filters" role="group" aria-label="Filter by design style">
        <span>Style</span>
        {["All", ...categories].map((s) => (
          <button
            className="filter"
            key={s}
            aria-pressed={style === s}
            onClick={() => setStyle(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="filters" role="group" aria-label="Filter by room type">
        <span>Space</span>
        {["All", ...rooms].map((s) => (
          <button
            className="filter"
            key={s}
            aria-pressed={room === s}
            onClick={() => setRoom(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <p role="status" className="fine-print">
        {filtered.length} sample{" "}
        {filtered.length === 1 ? "project" : "projects"} · Reference imagery,
        with sample names and descriptions.
      </p>
      {filtered.length ? (
        <div className="portfolio-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Your space could be next.</h2>
          <p>
            We’re preparing more design references for this selection. Tell us
            what you have in mind.
          </p>
          <button
            className="button"
            onClick={() => {
              setStyle("All");
              setRoom("All");
            }}
          >
            Reset Filters
          </button>
          <div className="mt-5">
            <WhatsApp />
          </div>
        </div>
      )}
    </div>
  );
}
