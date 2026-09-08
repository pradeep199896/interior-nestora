"use client";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
export default function Gallery({
  images,
  name,
  sample = false,
}: {
  images: ProjectImage[];
  name: string;
  sample?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const start = useRef(0);
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  const move = (delta: number) =>
    setActive((a) => (a + delta + images.length) % images.length);
  function close() {
    dialog.current?.close();
    document.body.style.overflow = "";
  }
  return (
    <>
      <div className="gallery-grid">
        {images.map((item, i) => (
          <button
            className="gallery-thumb"
            key={item.src}
            aria-label={`Open ${name} image ${i + 1}`}
            onClick={() => {
              setActive(i);
              dialog.current?.showModal();
              document.body.style.overflow = "hidden";
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width:600px) 90vw, 50vw"
            />
            <span>{item.label} ↗</span>
          </button>
        ))}
      </div>
      <dialog
        className="lightbox"
        ref={dialog}
        aria-label={`${name} image gallery`}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        <div
          className="lightbox-inner"
          onTouchStart={(e) => {
            start.current = e.changedTouches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const distance = e.changedTouches[0].clientX - start.current;
            if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
          }}
        >
          <button
            className="lb-close"
            aria-label="Close image gallery"
            onClick={close}
          >
            <X />
          </button>
          <button
            className="lb-prev"
            aria-label="Previous image"
            onClick={() => move(-1)}
          >
            <ChevronLeft />
          </button>
          <div className="lightbox-image">
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              sizes="90vw"
            />
          </div>
          <button
            className="lb-next"
            aria-label="Next image"
            onClick={() => move(1)}
          >
            <ChevronRight />
          </button>
          <p className="lb-count" aria-live="polite">
            {images[active].label} · {active + 1} / {images.length}
            {sample ? " · Sample Project" : ""}
          </p>
        </div>
      </dialog>
    </>
  );
}
