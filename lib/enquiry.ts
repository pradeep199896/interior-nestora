import { z } from "zod";
import { services } from "./content";
export const propertyTypes = [
  "Apartment",
  "Independent House",
  "Villa",
  "Single Room",
  "Commercial Space",
  "Other",
] as const;
export const propertyStatuses = [
  "Ready to move in",
  "Under construction",
  "Currently occupied",
  "Planning stage",
] as const;
export const budgetRanges = [
  "Prefer to discuss",
  "Below ₹5 lakh",
  "₹5–10 lakh",
  "₹10–20 lakh",
  "₹20–35 lakh",
  "Above ₹35 lakh",
] as const;
export const contactMethods = ["WhatsApp", "Email", "Phone"] as const;
const clean = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((s) =>
      s
        .replace(/[<>]/g, "")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ""),
    );
const required = (max: number) =>
  clean(max).pipe(z.string().min(2, "Please enter at least 2 characters."));
export const enquirySchema = z.object({
  name: required(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{8,22}$/, "Enter a valid phone or WhatsApp number.")
    .refine(
      (v) =>
        v.replace(/\D/g, "").length >= 8 && v.replace(/\D/g, "").length <= 15,
      "Enter 8 to 15 digits.",
    ),
  location: required(150),
  propertyType: z.enum(propertyTypes, {
    error: "Please choose a property type.",
  }),
  propertyStatus: z.enum(propertyStatuses, {
    error: "Please choose a property status.",
  }),
  service: z
    .string()
    .refine(
      (s) => [...services.map((s) => s.name), "Other"].includes(s),
      "Please select a service.",
    ),
  size: clean(80),
  budget: z.enum(budgetRanges, { error: "Please choose a budget range." }),
  date: z
    .string()
    .refine(
      (s) =>
        !s ||
        (/^\d{4}-\d{2}-\d{2}$/.test(s) &&
          !Number.isNaN(Date.parse(s)) &&
          new Date(s).toISOString().slice(0, 10) === s &&
          s >=
            new Date().toLocaleDateString("en-CA", {
              timeZone: "Asia/Kolkata",
            })),
      "Choose today or a future date.",
    ),
  contactMethod: z.enum(contactMethods, {
    error: "Please choose a contact method.",
  }),
  message: clean(3000),
  consent: z.literal(true, {
    error: "Please consent to being contacted about your enquiry.",
  }),
  website: z.string().max(0, "Unable to submit this enquiry."),
  startedAt: z.number().finite(),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export function enquiryText(data: Enquiry) {
  const labels: Record<string, string> = {
    name: "Full name",
    email: "Email",
    phone: "Phone / WhatsApp",
    location: "Project location",
    propertyType: "Property type",
    propertyStatus: "Property status",
    service: "Interested service",
    size: "Approximate property size",
    budget: "Estimated budget range",
    date: "Preferred consultation date (subject to confirmation)",
    contactMethod: "Preferred contact method",
    message: "Message",
    consent: "Consent to enquiry contact",
  };
  return Object.entries(labels)
    .map(
      ([key, label]) =>
        `${label}: ${String(data[key as keyof Enquiry] || "Not specified")}`,
    )
    .join("\n\n");
}
