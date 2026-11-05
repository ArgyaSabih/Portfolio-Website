export type Portfolio = {
  title: string;
  image: string;
  link: string;
  tags: string[];
  description: string;
  location?: string;
};

export const portfolios: Portfolio[] = [
  {
    title: "Cerita Neira",
    image: "/portfolios/portfolio-1.webp",
    location: "Banda Neira, Maluku",
    link: "https://ceritaneira.com",
    tags: ["NextJS", "TailwindCSS", "GSAP"],
    description:
      "Website created for a team from UGM's Community Service Program (KKN-PPM) that positions the Banda Neira community as the subject of change. Based on the integration of digital technology innovation, strengthening village governance, and natural resource conservation, Cerita Neira aims to strengthen local capabilities amidst the tide of cultural globalization."
  },
  {
    title: "Desa Rajawali Official Website",
    image: "/portfolios/portfolio-2.webp",
    location: "Banda Neira, Maluku",
    link: "https://www.desarajawali.id/",
    tags: ["NextJS", "TailwindCSS", "Sanity CMS", "Neon"],
    description:
      "An official digital government and information platform developed for Desa Rajawali, Banda Neira, Central Maluku. The platform streamlines public administrative services, enhances institutional transparency, and serves as an information hub for local residents, showcasing village demographics, ongoing development programs, local news, and community potential."
  },
  {
    title: "Gelanggang Expo 2024",
    image: "/portfolios/portfolio-3.webp",
    link: "https://ukm.ugm.ac.id/2024/gelex/",
    tags: ["NextJS", "TailwindCSS", "Firebase"],
    description:
      'Gelanggang Expo is an annual routine activity that aims to introduce Student Activity Units (UKM) and the community at Gadjah Mada University. The Gelanggang Expo 2024 website has several features such as an event timeline, about gelex, list of UKM and communities, and FAQ. This website also has a mini game "UKM Apakah Aku?" for new academic students who want to find a UKM that is suitable for them.'
  },
  {
    title: "Porsenigama 2024",
    image: "/portfolios/portfolio-4.webp",
    link: "https://porsenigama24.vercel.app/",
    tags: ["NextJS", "TailwindCSS", "GSAP"],
    description:
      "Pekan Olahraga dan Seni Universitas Gadjah Mada is an abbreviation for Universitas Gadjah Mada Sports and Arts Week. It is an annual event at Gadjah Mada University (UGM) that provides a platform for students to compete in various sports and arts. Porsenigama aims to foster sportsmanship, creativity, and a sense of camaraderie among UGM students."
  },
  {
    title: "PIONIR Gadjah Mada 2025",
    image: "/portfolios/portfolio-5.webp",
    link: "https://pionir.ugm.ac.id/2025/",
    tags: ["NextJS", "TailwindCSS", "GSAP"],
    description:
      "PIONIR Gadjah Mada is an orientation and campus introduction activity for new UGM students, also known as Gadjah Mada Muda (Gamada). This official website provides various information about the implementation of PIONIR Gadjah Mada which will be attended by new students of Gadjah Mada University. There are also interactive games that can help Gamada explore Gadjah Mada University."
  },
  {
    title: "Porsenigama 2025",
    image: "/portfolios/portfolio-6.webp",
    link: "https://porsenigama25.vercel.app/2025/porsenigama/",
    tags: ["NextJS", "TailwindCSS", "GSAP"],
    description:
      "Pekan Olahraga dan Seni Universitas Gadjah Mada is an abbreviation for Universitas Gadjah Mada Sports and Arts Week. It is an annual event at Gadjah Mada University (UGM) that provides a platform for students to compete in various sports and arts. Porsenigama aims to foster sportsmanship, creativity, and a sense of camaraderie among UGM students."
  }
];

export const slug = (title: string) =>
  "work-" +
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
