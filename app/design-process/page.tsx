import { PageIntro, FinalCTA } from "@/components/ui";
import { Process, FAQ } from "@/components/sections";
import { metadata as makeMetadata } from "@/lib/seo";
import { seo } from "@/lib/config";
export const metadata = makeMetadata(
  seo.process.title,
  seo.process.description,
  "/design-process",
);
export default function DesignProcess() {
  return (
    <>
      <PageIntro
        label="Our design process"
        title="From a conversation to a place called home."
        description="Creating your home is a collaboration. Our process brings clarity to each stage, with your needs and preferences at the centre."
      />
      <Process />
      <FAQ />
      <FinalCTA />
    </>
  );
}
