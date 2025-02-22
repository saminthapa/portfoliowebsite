"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CONTACT, SOCIAL_MEDIA_LINKS } from "../constants";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id='contact' className="min-h-screen flex flex-col">
      <div className='mx-auto max-w-6xl'>
        <p className='my-10 text-center text-3xl lg:text-8xl' data-aos='fade-up'>
          Excited to Collaborate?
        </p>

        <p className='p-4 text-center text-xl' data-aos='fade-up' data-aos-delay='200'>
          {CONTACT.text}
        </p>

        <p className='my-4 text-center text-2xl font-medium text-lime-300 lg:pt-6 lg:text-5xl' data-aos='fade-up' data-aos-delay='400'>
          {CONTACT.email}
        </p>

        <p className='my-4 text-center text-2xl font-medium text-lime-300 lg::pb-6 lg:text-5xl' data-aos='fade-up' data-aos-delay='600'>
          {CONTACT.phone}
        </p>
      </div>

      <div className='mt-20 flex items-center justify-center gap-8'>
        {SOCIAL_MEDIA_LINKS.map((link, index) => (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.icon}
          </a>
        ))}
      </div>

      <p className='my-8 text-center text-gray-400 mt-auto' >&copy; Samin Thapa. All rights reserved.</p>
    </section>
  );
};

export default Contact;
