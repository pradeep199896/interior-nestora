export const projectCategories = [
  "Full Home",
  "Living Room",
  "Bedroom",
  "Modular Kitchen",
  "Wardrobe",
  "TV Unit",
  "Pooja Room",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectImage = {
  src: string;
  label: string;
  alt: string;
  category?: ProjectCategory;
};
type ProjectBase = {
  slug: string;
  name: string;
  location?: string;
  projectType: string;
  categories: ProjectCategory[];
  description: string;
  coverImage: ProjectImage;
  clientRequirement?: string;
  designApproach?: string;
  materialsAndFinishes?: string[];
  colorPalette?: string[];
  lightingConcept?: string;
  highlights?: string[];
};
export type Project = ProjectBase &
  (
    | {
        status: "Ongoing";
        phase: "Design Phase" | "Execution in Progress" | "Ongoing";
        designImages: ProjectImage[];
        galleryImages?: never;
        videoUrl?: never;
      }
    | {
        status: "Completed";
        galleryImages: ProjectImage[];
        videoUrl: string;
        videoDescription: string;
        captionsUrl?: string;
        designImages?: ProjectImage[];
      }
  );
const render = (
  file: string,
  label: string,
  category?: ProjectCategory,
): ProjectImage => ({
  src: `/images/projects/${file}.webp`,
  label,
  alt: `${label} — supplied 3D design`,
  category,
});
const designs = [
  render("living-tv", "Living Room — TV Unit", "TV Unit"),
  render("bedroom-one", "Bedroom 1 — Wardrobe", "Wardrobe"),
  render("bedroom-two", "Bedroom 2 — Wardrobe & Dressing", "Bedroom"),
  render(
    "bedroom-three",
    "Bedroom 3 — Wardrobe, Dressing & Window Seat",
    "Bedroom",
  ),
  render("kitchen", "Kitchen — Modular Kitchen", "Modular Kitchen"),
  render("study", "Study Area — Workstation"),
  render("pooja", "Pooja Unit — Display & Storage", "Pooja Room"),
  render("foldable-table", "Foldable Wall-Mounted Table"),
];
// One residence in the supplied PDF. Descriptive title; client name/location not supplied.
// Add completed entries only with actual finished photography and a verified walkthrough.
export const projects: Project[] = [
  {
    slug: "residence-designs",
    name: "A Residence in Warm Neutrals",
    projectType: "Residential Interiors",
    status: "Ongoing",
    phase: "Design Phase",
    categories: [...projectCategories],
    coverImage: designs[0],
    designImages: designs,
    description:
      "Warm neutrals, sage accents and softly illuminated joinery. A connected design study across living, bedroom, kitchen and everyday spaces.",
    designApproach:
      "Clean contemporary detailing brings the residence together, with integrated storage, coordinated dressing zones and compact solutions for everyday use.",
    colorPalette: ["Warm beige", "Sage / olive", "Dark accents", "Brass tones"],
    materialsAndFinishes: [
      "Warm beige cabinetry with sage fluted accents",
      "Slim brass detailing",
      "Dark stone kitchen worktops",
      "Marble-look backsplash and black glass overheads",
    ],
    lightingConcept:
      "Warm concealed lighting, illuminated display niches, an arched dressing mirror and soft workstation task lighting.",
    highlights: [
      "Floating TV storage with an illuminated display niche",
      "Wardrobes, dressing and window seating in one composition",
      "Parallel kitchen with coordinated upper and lower cabinetry",
      "A framed pooja enclosure with glass doors and lower storage",
    ],
  },
];
