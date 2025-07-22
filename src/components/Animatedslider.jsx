import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const categories = [
  {
    title: 'Property',
    image: '/assets/316.png', // Place images in public/assets
  },
  {
    title: 'Sites',
    image: '/assets/2014612456_1_1_180904_122005-w1920-h1279.jpg',
  },
  {
    title: 'Shops',
    image: '/assets/shops.jpg',
  },
  {
    title: 'Apartments',
    image: '/assets/WhatsApp Image 2025-07-22 at 8.30.57 PM.jpeg',
  },
];

const Animatedslider = () => {
  useGSAP(() => {
    const main = document.querySelector('.main');
    main?.addEventListener('mousemove', function (e) {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to('.imagediv', {
        x: `${-moveX * 0.4}%`,
      });

      const scale = 1 + moveX * 0.07;
      const clampedScale = Math.max(0.98, Math.min(1.05, scale));

      gsap.to('.logo', {
        scaleX: clampedScale,
        scaleY: clampedScale,
        duration: 0.9,
        ease: 'power2.out',
      });
    });
  });

  return (
    <div className="relative w-full h-screen overflow-hidden main bg-black">
      {/* Background */}
      <div className="landing w-full h-full absolute top-0 left-0 z-10">
        <div className="imagediv w-full h-full relative">
          <img
            className="absolute top-0 right-0 w-full h-full object-cover opacity-15"
            src="cartoonbackground.png"
            alt=""
          />
          <img
            className="absolute top-1/2 -right-64 logo transform -translate-x-1/2 -translate-y-1/2 w-3/12 object-cover opacity-80"
            src="ChatGPT Image Jul 11, 2025, 11_47_00 AM.png"
            alt=""
          />
        </div>
      </div>

      {/* Grid Cards (Left Center) */}
      <div className="relative z-20 h-full flex items-center justify-start pl-10">
  <div className="grid grid-cols-2 gap-10 p-12 rounded-3xl shadow-2xl max-w-4xl">
    {categories.map((cat, index) => (
      <div
        key={index}
        className="w-56 h-56 rounded-2xl bg-neutral-600 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center"
      >
        <img
          src={cat.image}
          alt={cat.title}
          className="w-24 h-24 mb-4 object-contain"
        />
        <h3 className="text-xl font-bold text-gray-800">{cat.title}</h3>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Animatedslider;
