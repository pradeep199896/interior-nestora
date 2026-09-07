"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, MessageCircle, ArrowUpRight } from "lucide-react";
import { navigation, whatsappUrl } from "@/lib/config";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Nestora Interiors home">
      <span className="logo-mark">
        N<span />
      </span>
      <span>
        NESTORA<small>INTERIORS</small>
      </span>
    </Link>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(([label, url]) => (
            <Link
              key={url}
              href={url}
              aria-current={path === url ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button header-cta" href="/contact">
          Book a Free Consultation
          <ArrowUpRight size={15} />
        </Link>
        <div className="mobile-actions">
          <a
            href={whatsappUrl()}
            aria-label="Chat on WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle />
          </a>
          <button
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {navigation.map(([label, url]) => (
            <Link
              key={url}
              href={url}
              aria-current={path === url ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="button"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Book a Free Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
