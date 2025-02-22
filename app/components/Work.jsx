"use client"
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { EXPERIENCES } from '../constants';

const Work = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id='experience'>
      <h2
        className='my-10 text-center text-3xl lg:text-8xl'
        data-aos='fade-up'
      >
        Work Experience
      </h2>

      <div className='mx-auto max-w-6xl'>
        {EXPERIENCES.map((experience, id) => (
          <div
            key={id}
            className='mx-4 mb-20'
            data-aos='fade-up'
            data-aos-delay={id * 200}
          >
            <h2 className='font-medium lg:text-2xl'>
              {experience.company}
            </h2>

            <div className='flex justify-between'>
              <p className='py-4 tracking-wide lg:text-xl'>
                {experience.role}
              </p>

              <p className='py-4 lg:text-xl'>
                {experience.year}
              </p>
            </div>
            <p className='font-sans text-gray-400'>
              {experience.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
