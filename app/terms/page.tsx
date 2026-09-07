import { company } from "@/lib/config";
import { metadata as makeMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui";
export const metadata = makeMetadata(
  "Terms and Conditions",
  "Terms for using the Nestora Interiors website, sample designs and consultation enquiry service.",
  "/terms",
);
export default function Terms() {
  return (
    <>
      <PageIntro
        label="Website information"
        title="Terms and Conditions"
        description="Please read these terms when using the Nestora Interiors website."
      />
      <article className="wrap legal">
        <h2>Website and design information</h2>
        <p>
          This website introduces our interior design services in Hyderabad.
          Sample projects and concept images are for inspiration. They do not
          represent verified completed projects, a promised outcome, or a
          quotation.
        </p>
        <h2>Consultation enquiries</h2>
        <p>
          The initial consultation is free. Submitting the form requests a
          conversation; it does not confirm a date, reserve services or create a
          project agreement. We will discuss availability and requirements with
          you directly.
        </p>
        <h2>Project scope and approvals</h2>
        <p>
          Any scope of work, pricing, materials, schedule or other project terms
          will be discussed and agreed separately. Website content does not
          provide fixed prices, delivery guarantees or warranties.
        </p>
        <h2>Use of content</h2>
        <p>
          Images include supplied references and a clearly marked generated
          concept. Please do not reuse website imagery or branding without
          permission from the relevant rights holder.
        </p>
        <h2>External services</h2>
        <p>
          WhatsApp, your email application and other external services are
          subject to their own terms. A link opening does not mean your message
          has been sent or received.
        </p>
        <h2>Appropriate use</h2>
        <p>
          Please submit accurate enquiry information and do not use the website
          to send spam, malicious content or information you are not entitled to
          share.
        </p>
        <h2>Questions</h2>
        <p>
          Contact us at <a href={`mailto:${company.email}`}>{company.email}</a>{" "}
          for questions about this website or to clarify your project
          requirements.
        </p>
      </article>
    </>
  );
}
