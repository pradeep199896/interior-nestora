export const services = [
  [
    "Complete Home Interiors",
    "A considered vision for your whole home. Living, cooking, resting and everything in between.",
    "home",
  ],
  [
    "Modular Kitchens",
    "Beautifully practical kitchens, planned around your workflow, storage needs and daily rituals.",
    "kitchen",
  ],
  [
    "Living Room Interiors",
    "Inviting seating layouts, statement TV units and layered lighting that bring people together.",
    "living",
  ],
  [
    "Bedroom Interiors",
    "A restful retreat with thoughtful wardrobes, dressing areas and coordinated finishes.",
    "bedroom",
  ],
  [
    "Wardrobes and Storage",
    "A place for everything, with space-efficient storage tailored to the way you live.",
    "storage",
  ],
  [
    "False Ceilings",
    "Considered ceiling details that frame your rooms and create a refined sense of space.",
    "ceiling",
  ],
  [
    "Lighting Design",
    "Ambient, task and accent lighting, thoughtfully layered for every moment of the day.",
    "lighting",
  ],
  [
    "TV Units",
    "Clean-lined media walls that balance display, concealed storage and everyday entertainment.",
    "tv",
  ],
  [
    "Pooja Units",
    "Quiet, elegant spaces for daily rituals, thoughtfully integrated into a modern home.",
    "pooja",
  ],
  [
    "Space Planning",
    "Intuitive layouts that make the most of your floor plan and support everyday movement.",
    "planning",
  ],
  [
    "Renovation and Makeovers",
    "Refresh a room or reimagine your home with upgrades shaped around your needs and space.",
    "renovation",
  ],
].map(([name, description, id], i) => ({
  name,
  description,
  id,
  image:
    (
      {
        home: "/images/living.webp",
        kitchen: "/images/kitchen.webp",
        living: "/images/living.webp",
        bedroom: "/images/storage.webp",
        storage: "/images/module.webp",
        pooja: "/images/pooja.webp",
        tv: "/images/tv-detail.webp",
      } as Record<string, string>
    )[id] ||
    ["/images/living.webp", "/images/storage.webp", "/images/detail.webp"][
      i % 3
    ],
}));
export const projects = [
  {
    sample: true,
    slug: "warm-modern-living",
    name: "The Warm Modern Living Room",
    style: "Modern",
    room: "Living Room",
    image: "/images/living.webp",
    gallery: ["/images/living.webp", "/images/tv-detail.webp"],
    description:
      "Warm seating and natural wood textures bring character to an inviting living space. A considered media wall balances practical storage with a quiet composition.",
    highlights: [
      "Warm wood slats add depth and rhythm",
      "Integrated media storage keeps everyday essentials close",
      "Soft lighting brings out natural textures",
    ],
  },
  {
    sample: true,
    slug: "quiet-order",
    name: "A Place for Everything",
    style: "Minimal",
    room: "Bedroom",
    image: "/images/storage.webp",
    gallery: ["/images/storage.webp", "/images/module.webp"],
    description:
      "A calm approach to storage, with full-height wardrobes and coordinated dressing details. This sample explores how purposeful joinery can make a room feel more spacious.",
    highlights: [
      "Full-height storage makes use of vertical space",
      "A coordinated palette creates visual calm",
      "Integrated dressing space supports daily routines",
    ],
  },
  {
    sample: true,
    slug: "considered-details",
    name: "Details That Make a Home",
    style: "Luxury",
    room: "Vanity",
    image: "/images/detail.webp",
    gallery: ["/images/detail.webp", "/images/module.webp"],
    description:
      "The contrast of stone-inspired surfaces, fitted storage and warm lighting creates a refined focal point. A sample study in practical, carefully composed details.",
    highlights: [
      "Warm lighting around the mirror",
      "Compact storage beneath the basin",
      "A balanced combination of cabinetry and stone textures",
    ],
  },
  {
    sample: true,
    slug: "everyday-kitchen",
    name: "The Everyday Kitchen",
    style: "Contemporary",
    room: "Modular Kitchen",
    image: "/images/kitchen.webp",
    gallery: ["/images/kitchen.webp", "/images/kitchen-detail.webp"],
    description:
      "Clean-lined pale cabinetry and a practical L-shaped layout create a simple, functional kitchen. This sample explores storage and preparation space for everyday cooking.",
    highlights: [
      "L-shaped counters support a practical workflow",
      "Upper and lower cabinets provide coordinated storage",
      "A restrained palette keeps the space bright",
    ],
  },
];
export const categories = [
  "Modern",
  "Contemporary",
  "Minimal",
  "Luxury",
  "Space-Saving",
];
export const rooms = ["Living Room", "Bedroom", "Modular Kitchen", "Vanity"];
export const processSteps = [
  [
    "Free Consultation",
    "Tell us about your home, your ideas and what you would love to change.",
  ],
  [
    "Understand Your Requirements",
    "We explore your lifestyle, preferences, space and priorities together.",
  ],
  [
    "Space Planning and Design",
    "Your needs become thoughtful layouts and a cohesive design direction.",
  ],
  [
    "Material and Design Approval",
    "Review the finishes, materials and details before moving forward.",
  ],
  [
    "Execution and Installation",
    "Coordinate the work and installation with clear communication.",
  ],
  [
    "Final Handover",
    "Walk through the finished spaces and review the details together.",
  ],
];
export const reasons = [
  [
    "Personalized Designs",
    "A home that reflects your taste, habits and story.",
  ],
  [
    "Smart Space Planning",
    "Every corner considered. Every square foot purposeful.",
  ],
  [
    "Quality Materials",
    "Thoughtful material choices for looks and everyday use.",
  ],
  [
    "Transparent Communication",
    "Clear conversations from the first idea to the final detail.",
  ],
  ["End-to-End Coordination", "Connected planning, design and execution."],
  [
    "Designs Created for Your Lifestyle",
    "Beautiful spaces that work for your real life.",
  ],
];
export const faqs = [
  [
    "What interior design services do you provide?",
    "We offer complete home interiors, modular kitchens, living rooms, bedrooms, wardrobes, false ceilings, lighting, TV units, pooja units, space planning and renovations.",
  ],
  [
    "Which areas do you serve?",
    "Nestora Interiors serves homes across Hyderabad, Telangana. Share your project location so we can discuss your requirements.",
  ],
  [
    "How can I book a consultation?",
    "Use our consultation form, send an email or chat with us on WhatsApp to request a free initial consultation. Your preferred date is a request and will be confirmed by our team.",
  ],
  [
    "Can you design a single room?",
    "Yes. We can discuss a single room, a kitchen, storage or a wider home transformation.",
  ],
  [
    "Do you provide complete home interiors?",
    "Yes. We plan coordinated interiors across your living rooms, bedrooms, kitchen, storage, lighting and functional spaces.",
  ],
  [
    "Can I share my floor plan before the consultation?",
    "Yes. You can send your floor plan by email or WhatsApp before the consultation. Please avoid including unnecessary personal information.",
  ],
  [
    "How does the design process work?",
    "We begin with a consultation, understand your requirements, develop the layout and design, review materials, coordinate execution and complete a final walkthrough.",
  ],
  [
    "Can I contact Nestora Interiors through WhatsApp?",
    "Yes. Chat with us on +91 7013265720. The link opens a prepared message that you can review and send.",
  ],
];
