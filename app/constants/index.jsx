import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa6";


export const LINKS = [
  { id: "hero", name: "home" },
  { id: "projects", name: "projects" },
  // { id: "about", name: "about" },
  // { id: "experience", name: "experience" },
  { id: "contact", name: "Contact" },
];

export const MARQUEE_TEXT =
  " , React.js , Next.js , TailwindCSS , Typescript , Node.js , PHP , Laravel , MySql , PostgreSQL , PrismaORM , Git , Postman ";


export const EXPERIENCES = [
  {
    company: "Google",
    role: "Software Engineer",
    year: "12/2023 - Present",
    description:
      "Developing and maintaining scalable web applications using modern technologies. Collaborating with cross-functional teams to design and implement new features. Enhancing application performance and ensuring high-quality code through rigorous testing and code reviews. Contributing to the continuous improvement of development processes and best practices.",
  },
  {
    company: "Facebook",
    role: "Frontend Developer",
    year: "01/2021 - 11/2023",
    description:
      "Implemented user interfaces for web applications using React and Redux. Worked closely with designers to ensure seamless user experiences. Optimized components for maximum performance across a vast array of web-capable devices and browsers. Participated in code reviews and provided feedback to maintain high code quality.",
  },
];

export const SOCIAL_MEDIA_LINKS = [
  {
    href: "https://www.facebook.com/samin.thapa.90",
    icon: <FaFacebook fontSize={26} className="hover:text-lime-300" />,
  },
  {
    href: "https://www.instagram.com/saminthapa_/",
    icon: <FaInstagram fontSize={26} className="hover:text-lime-300" />,
  },
  {
    href: "https://github.com/saminthapa",
    icon: <FaGithub fontSize={26} 
    className="hover:text-lime-300" />,
  },
  {
    href: "https://www.linkedin.com/in/samin-thapa-kshetry-96043425b/",
    icon: <FaLinkedin fontSize={26} className="hover:text-lime-300" />,
   },
  {
    href: "https://www.tiktok.com/@saminthapa55?_t=ZS-8wabFhKu8ZO&_r=1",
    icon: <FaTiktok fontSize={26} className="hover:text-lime-300" />,
  },
];

export const CONTACT = {
  text: "I’m always eager to take on new challenges and collaborate on exciting projects. Whether you have a clear vision or just want to explore possibilities, let’s connect and create something impactful together. Feel free to reach out and let’s make it happen!",
  email: "thapasamin4@gmail.com",
  phone: "+977 9768887374",
};
