import Link from "next/link";
import { ArrowUpRight, MessageCircle, MapPin } from "lucide-react";
import { company, navigation, socialLinks, whatsappUrl } from "@/lib/config";
import { Logo } from "./header";
export default function Footer() {
  return (
    <>
      <footer>
        <div className="wrap footer-grid">
          <div>
            <Logo />
            <p>
              Thoughtfully designed.
              <br />
              Beautifully lived.
            </p>
            <span className="location">
              <MapPin size={15} />
              Serving homes across Hyderabad
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            {navigation.slice(1).map(([name, url]) => (
              <Link key={url} href={url}>
                {name}
              </Link>
            ))}
          </div>
          <div>
            <h3>Our expertise</h3>
            {[
              "Complete Home Interiors",
              "Modular Kitchens",
              "Bedroom Interiors",
              "Wardrobes and Storage",
            ].map((name) => (
              <Link key={name} href="/services">
                {name}
              </Link>
            ))}
          </div>
          <div>
            <h3>Let’s talk about your home</h3>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.phone} <ArrowUpRight size={14} />
            </a>
            <Link className="footer-consult" href="/contact">
              Book a Free Consultation <ArrowUpRight size={15} />
            </Link>
            {socialLinks.map((s) => (
              <a key={s.url} href={s.url}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </span>
          <div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms and Conditions</Link>
          </div>
          <span>Made for the way you live.</span>
        </div>
      </footer>
      <a
        className="floating-wa"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nestora Interiors on WhatsApp"
      >
        <MessageCircle size={25} />
        <span>Let’s talk</span>
      </a>
    </>
  );
}
