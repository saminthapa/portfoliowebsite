import {
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa6";

import project1 from "../assets/stk_travel.jpg";
import project2 from "../assets/car_rental.jpg";
import project3 from "../assets/yatrax.jpg";
// import project4 from "../assets/project4.webp";
// import project5 from "../assets/project5.webp";
// import project6 from "../assets/project6.webp";
// import project7 from "../assets/project7.webp";
// import project8 from "../assets/project8.webp";
// import project9 from "../assets/project9.webp";

export const LINKS = [
  { id: "projects", name: "projects" },
  { id: "about", name: "about" },
  // { id: "experience", name: "experience" },
  { id: "contact", name: "Contact" },
];

export const MARQUEE_TEXT =
  " React.js , Next.js , TailwindCSS , Javascript , Typescript , Node.js , MongoDB , MySql , PostgreSQL , PrismaORM , Git , Postman , ";

export const PROJECTS = [
  {
    id: 1,
    title: "Travel App Website",
    description:
      "Built with Next.js , TypeScript and tailwindCSS, STK Travel offers a seamless platform for discovering nature-based destinations and planning outdoor adventures.",
    imgSrc: project1,
    link: "https://stk-travel.vercel.app/",
  },
  {
    id: 2,
    title: "Car Rental Website",
    description:
      "Built with Next.js, Clerk for authentication, and Hygraph as the CMS, this car rental platform offers a seamless booking experience.",
    imgSrc: project2,
    link: "https://car-rental-saminthapa.vercel.app/",
  },
  {
    id: 3,
    title: "IT Company Website",
    description:
      "Built with Next.js , TypeScript, tailwindCSS, Aceternity UI, Framer Motion and more.",
    imgSrc: project3,
    link: "https://yatrax.vercel.app/",
  },
  // {
  //   id: 4,
  //   title: "Blog Platform",
  //   description:
  //     "A blogging platform with user authentication and content management.",
  //   imgSrc: project4,
  //   link: "https://example.com/blog-platform",
  // },
  // {
  //   id: 5,
  //   title: "Task Management Tool",
  //   description: "A task management tool to organize and prioritize work.",
  //   imgSrc: project5,
  //   link: "https://example.com/task-management-tool",
  // },
  // {
  //   id: 6,
  //   title: "Online Learning Platform",
  //   description:
  //     "An online learning platform offering various courses and resources.",
  //   imgSrc: project6,
  //   link: "https://example.com/online-learning-platform",
  // },
  // {
  //   id: 7,
  //   title: "Fitness Tracker",
  //   description: "A mobile application to track fitness activities and goals.",
  //   imgSrc: project7,
  //   link: "https://example.com/fitness-tracker",
  // },
  // {
  //   id: 8,
  //   title: "Recipe App",
  //   description: "An app for browsing and saving various cooking recipes.",
  //   imgSrc: project8,
  //   link: "https://example.com/recipe-app",
  // },
  // {
  //   id: 9,
  //   title: "Weather Dashboard",
  //   description:
  //     "A weather dashboard providing current weather data and forecasts.",
  //   imgSrc: project9,
  //   link: "https://example.com/weather-dashboard",
  // },
];

export const ABOUT =
  "As a passionate Full Stack Developer, I build scalable and high-performance web applications with a focus on seamless user experiences. Proficient in React.js, Next.js, and TailwindCSS for the frontend, I also specialize in backend development using Node.js, MongoDB, and MySQL. With strong skills in JavaScript and TypeScript, I stay updated with modern technologies to create efficient and future-ready solutions.";

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
  // {
  //   href: "https://x.com/",
  //   icon: <FaDiscord fontSize={26} className="hover:opacity-80" />,
  // },
  {
    href: "https://www.instagram.com/im_saminthapa/",
    icon: <FaInstagram fontSize={26} className="hover:text-lime-300" />,
  },
  {
    href: "https://x.com/SaminThapa10",
    icon: <FaXTwitter fontSize={26} className="hover:text-lime-300" />,
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
];

export const CONTACT = {
  text: "I’m always eager to take on new challenges and collaborate on exciting projects. Whether you have a clear vision or just want to explore possibilities, let’s connect and create something impactful together. Feel free to reach out and let’s make it happen!",
  email: "thapasamin4@gmail.com",
  phone: "+977 9768887374",
};
