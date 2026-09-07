import Image from "next/image";
import { PageIntro, FinalCTA } from "@/components/ui";
import { metadata as makeMetadata } from "@/lib/seo";
import { seo, team } from "@/lib/config";
export const metadata = makeMetadata(
  seo.about.title,
  seo.about.description,
  "/about",
);
export default function About() {
  return (
    <>
      <PageIntro
        label="The Nestora story"
        title="Designing Beautiful, Functional Homes in Hyderabad."
        description="Nestora Interiors creates personalized residential interiors that balance beauty, comfort, and everyday functionality. We work closely with homeowners to understand their lifestyle, preferences, and space requirements before developing thoughtful interior solutions."
      />
      <section className="wrap about-grid">
        <div className="about-photo">
          <Image
            src="/images/living.webp"
            alt="Warm seating and carefully coordinated finishes in a supplied home interior reference"
            fill
            sizes="(max-width:600px) 90vw,45vw"
          />
        </div>
        <div className="about-copy">
          <article>
            <h2>Our Approach</h2>
            <p>
              We start by listening. Your routines, priorities and ideas guide
              the layout, materials and character of your home. Each decision
              connects the bigger picture to the smallest details.
            </p>
          </article>
          <article>
            <h2>Our Design Philosophy</h2>
            <p>
              A beautiful home should feel natural to live in. We bring together
              balanced proportions, practical storage, comfortable lighting and
              a cohesive material palette.
            </p>
          </article>
          <article>
            <h2>How We Work</h2>
            <p>
              We collaborate through planning, design approval and execution,
              keeping conversations clear and decisions considered along the
              way.
            </p>
          </article>
          <article>
            <h2>Areas We Serve</h2>
            <p>
              We serve homeowners across Hyderabad, Telangana. Share your
              project location during your initial consultation.
            </p>
          </article>
          <article>
            <h2>Meet the Team</h2>
            {team.length ? (
              team.map((t) => (
                <div key={t.name} className="pending">
                  <h3>{t.name}</h3>
                  <p>{t.role}</p>
                  <p>{t.bio}</p>
                </div>
              ))
            ) : (
              <div className="pending">
                <p>
                  Team introductions are coming soon. Names, roles and
                  biographies are pending verified company information.
                </p>
              </div>
            )}
          </article>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
