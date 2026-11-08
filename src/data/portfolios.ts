export type PortfolioGroup = "cv" | "web";

export const groups: {id: PortfolioGroup; title: string}[] = [
  {id: "cv", title: "AI & Computer Vision"},
  {id: "web", title: "Web Development"}
];

export type Portfolio = {
  title: string;
  group: PortfolioGroup;
  image: string;
  imageAlt?: string;
  link: string;
  linkKind?: "site" | "repo";
  tags: string[];
  description: string;
  location?: string;
};

export const portfolios: Portfolio[] = [
  {
    title: "Exercise Form Analyzer",
    group: "cv",
    image: "/portfolios/cv-exercise-pushup.webp",
    imageAlt: "/portfolios/cv-exercise-squat.webp",
    link: "https://github.com/ArgyaSabih/exercise_form_analyzer",
    linkKind: "repo",
    tags: ["YOLOv8-Pose", "OpenCV", "NumPy"],
    description:
      "Built a pose-based analyzer for squats and push-ups that measures knee, torso, elbow and body-line angles, counts reps, and reports which rep failed, why, and by how many degrees, then writes an annotated video; also runs on a live webcam. Designed ranked fault detection (for example hips up versus hips down) with per-rep JSON summaries for evaluation, backed by 222 automated tests."
  },
  {
    title: "Real Time Object Detection System",
    group: "cv",
    image: "/portfolios/cv-detect-phone.webp",
    imageAlt: "/portfolios/cv-detect-person.webp",
    link: "https://github.com/ArgyaSabih/real-time-object-detection-system",
    linkKind: "repo",
    tags: ["OpenCV", "YOLO26n", "ONNX", "OpenVINO"],
    description:
      "Built a desktop app that runs YOLO on webcam video across 80 COCO classes, with bounding boxes, confidence scores, live threshold control and an FPS panel; models exported to ONNX and OpenVINO at 3 input sizes (320, 416, 640). Measured on CPU only (Ryzen 5 6600H): 16.7 FPS, 64.5 ms p95 inference latency (target 200 ms), 0.89 mean confidence and 329 MB memory. A 29.5-minute stability run processed 25,024 frames with 0 read failures and no memory leak."
  },
  {
    title: "Cerita Neira",
    group: "web",
    image: "/portfolios/portfolio-1.webp",
    link: "https://ceritaneira.com",
    tags: ["Next.js", "TailwindCSS", "GSAP"],
    description:
      "Developed the website of the KKN-PPM UGM team, presenting digital innovation, village governance and conservation programs in Banda Neira."
  },
  {
    title: "Desa Rajawali Official Website",
    group: "web",
    image: "/portfolios/portfolio-2.webp",
    link: "https://www.desarajawali.id/",
    tags: ["Next.js 14", "TailwindCSS", "Auth.js", "Sanity CMS", "Neon PostgreSQL", "Zod"],
    description:
      "Built a village government platform for KKN-PPM UGM in Banda Neira: a public site (news, gallery, village profile, demographics, contact) and an admin panel for aspiration follow-up, user roles and an activity log. Added a citizen aspiration form with tracking numbers, role-based access control, rate limiting and input validation; wrote a user guide so village staff manage content without code."
  },
  {
    title: "Gelanggang Expo 2024",
    group: "web",
    image: "/portfolios/portfolio-3.webp",
    link: "https://ukm.ugm.ac.id/2024/gelex/",
    tags: ["Next.js", "TailwindCSS", "Firebase"],
    description:
      "Front-end developer at Forkom UGM for UGM's annual student activity expo. Built the expo site presenting 55 student units under 4 Sekber, with an event timeline, FAQ and a mini game that matches new students to units."
  },
  {
    title: "Porsenigama 2024",
    group: "web",
    image: "/portfolios/portfolio-4.webp",
    link: "https://porsenigama24.vercel.app/",
    tags: ["Next.js", "TailwindCSS", "GSAP"],
    description:
      "Front-end developer at Forkom UGM for Porsenigama 2024, UGM's annual sports and arts week. Built the event site with Next.js, TailwindCSS and GSAP animations; it reached 195,474 views."
  },
  {
    title: "PIONIR Gadjah Mada 2025",
    group: "web",
    image: "/portfolios/portfolio-5.webp",
    link: "https://pionir.ugm.ac.id/2025/",
    tags: ["Next.js", "TailwindCSS", "GSAP"],
    description:
      "Front-end developer for the official orientation program for new UGM students (Direktorat Kemahasiswaan UGM), in a 7-member team over 3 months. The pionir.ugm.ac.id site reached 689,692 views, serving 10,000+ new students. Delivered MVP pages with Next.js, TailwindCSS and GSAP: “Kaleidoskop” (search each new-student group with its documentation) and two interactive games, “Kelana Nusa Talenta” and “Kemabara Loka”."
  },
  {
    title: "Porsenigama 2025",
    group: "web",
    image: "/portfolios/portfolio-6.webp",
    link: "https://porsenigama25.vercel.app/2025/porsenigama/",
    tags: ["Next.js", "TailwindCSS", "GSAP", "Strapi CMS", "MySQL"],
    description:
      "As Sub-Coordinator of Web Development at Forkom UGM, led an 8-member web team (2 UI/UX, 4 front-end, 1 back-end, 1 sub-coordinator) through a 2.5-month build; the site reached 124,947 views. Delivered the MVP: a Porsenigama Leaderboard showing faculty scores (Strapi CMS, MySQL) and the interactive game “Gelora Juara”, built with Next.js, TailwindCSS and GSAP."
  }
];

export const slug = (title: string) =>
  "work-" +
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
