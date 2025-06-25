import React, { useState } from 'react';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: slide1,
    title1: 'BEST PLACE',
    title2: 'FOR YOU',
    subtitle1: 'BEAUTY &',
    subtitle2: 'RELAXSATION',
    text: 'Welcome to our salon! Where you can enjoy & relax your life',
  },
  {
    id: 2,
    image: slide2,
    title1: 'GET GLOWING',
    title2: 'SKIN',
    subtitle1: 'Facials &',
    subtitle2: 'Treatments',
    text: 'Rejuvenate your soul & style.',
  },
  {
    id: 3,
    image: slide3,
    title1: 'HAIR THAT',
    title2: 'TURNS HEADS',
    subtitle1: 'Cuts, Colors',
    subtitle2: '& Styles',
    text: 'Crafted by professionals.',
  },
];

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7 } },
};

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img src={slide.image} className="w-full h-full object-cover" />

          {i === activeIndex && (
            <div className="absolute top-1/2 -translate-y-1/2 w-full px-4">
              <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4 text-black"
                  >
                    {/* Title */}
                    <motion.h2
                      className="text-3xl md:text-5xl font-semibold"
                      variants={fadeLeft}
                    >
                      <span>{slide.title1}</span>{' '}
                      {slide.title2 && (
                        <span className="text-[#EC5598]">{slide.title2}</span>
                      )}
                    </motion.h2>

                    {/* Subtitle */}
                    {(slide.subtitle1 || slide.subtitle2) && (
                      <motion.h3
                        className="text-2xl md:text-4xl font-bold"
                        variants={fadeLeft}
                      >
                        <span className="text-[#EC5598]">{slide.subtitle1}</span>{' '}
                        {slide.subtitle2 && <span>{slide.subtitle2}</span>}
                      </motion.h3>
                    )}

                    {/* Description */}
                    <motion.p className="text-lg md:text-xl" variants={fadeLeft}>
                      {slide.text}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 pt-2"
                      variants={fadeUp}
                    >
                      <a
                        href="/services"
                        className="px-6 py-2 rounded-full font-medium bg-[#EC5598] text-white hover:bg-pink-600 transition"
                      >
                        SEE ALL SERVICES
                      </a>
                      <a
                        href="/about"
                        className="px-6 py-2 rounded-full font-medium border-2 border-[#EC5598] text-[#EC5598] hover:bg-[#EC5598] hover:text-white transition"
                      >
                        MORE DETAILS
                      </a>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2 z-20">
        <button onClick={prevSlide} className="btn btn-circle">❮</button>
        <button onClick={nextSlide} className="btn btn-circle">❯</button>
      </div>
    </div>
  );
};

export default Slider;
