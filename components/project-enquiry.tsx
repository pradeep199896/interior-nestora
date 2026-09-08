import { Consultation, WhatsApp, Eyebrow } from "./ui";
export default function ProjectEnquiry() {
  return (
    <section className="final-cta project-enquiry">
      <div className="wrap">
        <Eyebrow>Your home, thoughtfully considered</Eyebrow>
        <h2>
          Planning your <em>dream home?</em>
        </h2>
        <p>Let’s create a space that feels like yours.</p>
        <div className="actions">
          <Consultation label="Get a Free Consultation" />
          <WhatsApp />
        </div>
      </div>
    </section>
  );
}
