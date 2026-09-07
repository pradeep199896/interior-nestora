import { company } from "@/lib/config";
import { metadata as makeMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui";
export const metadata = makeMetadata(
  "Privacy Policy",
  "How Nestora Interiors handles information submitted through its website and consultation form.",
  "/privacy-policy",
);
export default function Privacy() {
  return (
    <>
      <PageIntro
        label="Your information"
        title="Privacy Policy"
        description="This policy describes the information collected through this website and how it is used for your enquiry."
      />
      <article className="wrap legal">
        <h2>Information you choose to share</h2>
        <p>
          When you submit a consultation enquiry, we receive your name, contact
          information, project details, preferences and any message you include.
          Please do not submit sensitive personal information that is unrelated
          to your project.
        </p>
        <h2>How we use it</h2>
        <p>
          Nestora Interiors uses the information to respond to your enquiry,
          discuss your requirements and coordinate a consultation. Your consent
          covers this enquiry and does not subscribe you to marketing.
        </p>
        <h2>Service providers</h2>
        <p>
          The website hosting provider processes technical request information.
          Form enquiries are transmitted through Resend to our business email
          inbox. An anti-spam service, Upstash, stores a temporary, hashed
          request identifier to limit repeated submissions. We do not log
          enquiry contents in the application. Providers may process data
          outside India under their own service arrangements.
        </p>
        <h2>WhatsApp and email</h2>
        <p>
          Opening a WhatsApp or email link takes you to a separate service. You
          can review a prepared message before sending it. Those services
          operate under their own privacy policies. We do not automatically send
          a WhatsApp message.
        </p>
        <h2>Retention and your choices</h2>
        <p>
          Enquiries are retained in our business email systems as needed to
          respond and manage any resulting project. You may ask us to correct or
          delete information, or withdraw consent for future enquiry contact, by
          emailing <a href={`mailto:${company.email}`}>{company.email}</a>. Some
          records may need to be retained for an ongoing service or applicable
          obligations.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          This website does not intentionally add advertising cookies or
          third-party analytics. Hosting services may process essential
          technical information for security and operation.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy questions, contact {company.name}, serving{" "}
          {company.serviceArea}, at{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </article>
    </>
  );
}
