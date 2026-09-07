import { PageIntro, FinalCTA } from "@/components/ui";
import Portfolio from "@/components/portfolio";
import { metadata as makeMetadata } from "@/lib/seo";
import { seo } from "@/lib/config";
export const metadata = makeMetadata(
  seo.projects.title,
  seo.projects.description,
  "/projects",
);
export default function Projects() {
  return (
    <>
      <PageIntro
        label="The design collection"
        title="Find a little inspiration for your own home."
        description="A collection of spaces, textures and thoughtful details. These sample projects use supplied reference imagery; verified project stories will follow."
      />
      <Portfolio />
      <FinalCTA />
    </>
  );
}
