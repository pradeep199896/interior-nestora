"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { services } from "@/lib/content";
import {
  enquirySchema,
  propertyTypes,
  propertyStatuses,
  budgetRanges,
  contactMethods,
} from "@/lib/enquiry";
import { WhatsApp } from "./ui";
export default function ContactForm({
  selectedService,
}: {
  selectedService?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [status, setStatus] = useState("");
  const started = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    started.current = Date.now();
    const date = formRef.current?.querySelector<HTMLInputElement>("#date");
    if (date)
      date.min = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });
  }, []);
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      ...Object.fromEntries(fd),
      consent: fd.get("consent") === "on",
      startedAt: started.current,
    };
    const parsed = enquirySchema.safeParse(values);
    setErrors({});
    setStatus("");
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        next[String(issue.path[0])] = issue.message;
      setErrors(next);
      setState("error");
      setStatus("Please review the highlighted fields.");
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setState("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(18000),
      });
      const result = await response.json();
      setStatus(result.message || "Unable to submit. Please try WhatsApp.");
      setErrors(result.errors || {});
      setState(response.ok ? "success" : "error");
      if (response.ok) form.reset();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setState("error");
      setStatus(
        "We could not confirm your enquiry was sent. Please try again or continue on WhatsApp.",
      );
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  function field(
    name: string,
    label: string,
    options?: readonly string[],
    type = "text",
    required = false,
  ) {
    return (
      <label className="field" key={name} htmlFor={name}>
        {label}
        {required ? " *" : " (optional)"}
        {options ? (
          <select
            id={name}
            name={name}
            required={required}
            defaultValue={
              name === "service" &&
              services.some((s) => s.name === selectedService)
                ? selectedService
                : ""
            }
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          >
            <option value="">Select an option</option>
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            maxLength={name === "email" ? 254 : name === "phone" ? 22 : 150}
            autoComplete={
              name === "name"
                ? "name"
                : name === "email"
                  ? "email"
                  : name === "phone"
                    ? "tel"
                    : undefined
            }
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          />
        )}{" "}
        {errors[name] && (
          <span id={`${name}-error`} className="field-error">
            {errors[name]}
          </span>
        )}
      </label>
    );
  }
  return (
    <form
      className="consultation-form"
      ref={formRef}
      onSubmit={submit}
      noValidate
      aria-label="Free consultation enquiry"
    >
      <h2>Tell us about your home.</h2>
      <p>
        A few details are all we need to start a conversation. Fields marked *
        are required.
      </p>
      {state !== "success" && (
        <>
          <div className="form-grid">
            {field("name", "Full name", undefined, "text", true)}
            {field("email", "Email address", undefined, "email", true)}
            {field("phone", "Phone or WhatsApp number", undefined, "tel", true)}
            {field("location", "Project location", undefined, "text", true)}
            {field(
              "propertyType",
              "Property type",
              propertyTypes,
              "text",
              true,
            )}
            {field(
              "propertyStatus",
              "Property status",
              propertyStatuses,
              "text",
              true,
            )}
            {field(
              "service",
              "Interested service",
              [...services.map((s) => s.name), "Other"],
              "text",
              true,
            )}
            {field("size", "Approximate property size (sq ft)")}
            {field(
              "budget",
              "Estimated budget range",
              budgetRanges,
              "text",
              true,
            )}
            {field("date", "Preferred consultation date", undefined, "date")}
            {field(
              "contactMethod",
              "Preferred contact method",
              contactMethods,
              "text",
              true,
            )}
            <label className="field wide" htmlFor="message">
              Anything else you’d like us to know? (optional)
              <textarea
                id="message"
                name="message"
                maxLength={3000}
                placeholder="Your ideas, needs, favourite styles…"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span className="field-error" id="message-error">
                  {errors.message}
                </span>
              )}
            </label>
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className="consent">
            <input
              name="consent"
              type="checkbox"
              required
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I agree to Nestora Interiors contacting me about this enquiry
              using the information I provide. I have read the{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>. *
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="field-error">
              {errors.consent}
            </p>
          )}
        </>
      )}
      <div aria-live="polite" aria-atomic="true">
        {status && (
          <div
            ref={statusRef}
            tabIndex={-1}
            className={`form-status ${state === "success" ? "success" : "error"}`}
            role={state === "error" ? "alert" : "status"}
          >
            {status}
          </div>
        )}
      </div>
      {state === "success" ? (
        <WhatsApp label="Continue on WhatsApp" />
      ) : (
        <>
          <button
            className="button"
            disabled={state === "loading"}
            type="submit"
          >
            {state === "loading" ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Sending your enquiry…
              </>
            ) : (
              <>
                Request a Free Consultation
                <ArrowUpRight size={16} />
              </>
            )}
          </button>
          <p className="fine-print">
            Your preferred date will be confirmed in a follow-up conversation.
          </p>
          {state === "error" && (
            <WhatsApp label="Continue on WhatsApp" className="text-link" />
          )}
        </>
      )}
    </form>
  );
}
