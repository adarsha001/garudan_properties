import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const animationRef = useRef(null); // Store GSAP animations

  // 1. Reset initial state before animations
  useEffect(() => {
    // Set initial styles before animating
    // gsap.set(navRef.current, { y: -700, opacity: 0 });
    // gsap.set(logoRef.current, { x: -20, opacity: 0 });
    // gsap.set(linksRef.current, { y: 10, opacity: 0 });
    
    return () => {
      // Kill animations on unmount
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  // 2. Run animations after initial render
  useEffect(() => {
    animationRef.current = gsap.timeline()
      .to(navRef.current, {
        y: -1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out"
      })
      .fromTo(logoRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3 },
        "-=0.1"
      )
      .fromTo(linksRef.current,
        { y: 10, opacity: 0 },
        { 
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          // repeat: -1,  // Infinite repeats
          // yoyo: true 
        },
        "-=0.3"
      );
  }, []);

  // Mobile menu animations (same as before)
  // ...

  return (
<nav className="text-[#E4BD64] fixed top-0 left-0 w-full  p-4 shadow-md z-50">

      <div ref={navRef} className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div ref={logoRef} className="text-xl font-bold">
          <Link to="/">Garudan properties</Link>
        </div>

        <div className="hidden md:flex space-x-6" >
          {['Home', 'About', 'Services', 'Contact'].map((item, i) => (
            <Link 
              key={item}
              ref={el => (linksRef.current[i] = el)}
              to={item=== 'Home'? '/':`/${item.toLowerCase()}`}
              className="hover:text-teal-400 "
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile menu button and content */}
        
      </div>
    </nav>
  );
};

export default Navbar;