import Image from "next/image";
import { services } from "@/lib/content";
import { company, seo } from "@/lib/config";
import { metadata as makeMetadata } from "@/lib/seo";
import {
  PageIntro,
  Consultation,
  WhatsApp,
  FinalCTA,
  Eyebrow,
} from "@/components/ui";
export const metadata = makeMetadata(
  seo.services.title,
  seo.services.description,
  "/services",
);
export default function Services() {
  return (
    <>
      <PageIntro
        label="Our expertise"
        title="Considered spaces. Exceptional everyday living."
        description="Home interiors in Hyderabad, shaped around your space, your routines and your personal style. Explore the possibilities, room by room."
      />
      <div className="wrap">
        {services.map((s, i) => (
          <section id={s.id} className="service-detail" key={s.id}>
            <div className="service-photo">
              <Image
                src={s.image}
                alt={`Supplied interior reference illustrating ${s.name.toLowerCase()} materials and detailing`}
                fill
                sizes="(max-width:600px) 90vw, 45vw"
              />
            </div>
            <div>
              <Eyebrow>0{i + 1} / Designed around you</Eyebrow>
              <h2>{s.name}</h2>
              <p>{s.description}</p>
              <p>
                Share your floor plan, style preferences and priorities.
                Together, we can explore a design direction that suits your home
                in Hyderabad.
              </p>
              <div className="actions">
                <WhatsApp
                  label="Enquire on WhatsApp"
                  message={company.serviceMessage(s.name)}
                />
                <Consultation service={s.name} label="Book a Consultation" />
              </div>
            </div>
          </section>
        ))}
      </div>
      <FinalCTA />
    </>
  );
}
