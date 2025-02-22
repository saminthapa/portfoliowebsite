'use client'

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ABOUT } from '../constants';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id='about'>
      <h2
        className='my-10 text-center text-3xl lg:text-8xl'
        data-aos='fade-up'
      >
        About Me
      </h2>

      <div
        className='flex items-center justify-center'
        data-aos='fade-up'
        data-aos-delay='300'
      >
        <p className='m-8 max-w-6xl text-3xl lg:text-6xl'>
          {ABOUT}
        </p>
      </div>
    </section>
  );
};

export default About;
