import React from 'react'
import Navbar from './Navbar'
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react'

const Animatedslider = () => {

    useGSAP(()=>{
const main=document.querySelector(".main");
main.addEventListener("mousemove",function (e) {
    const moveX=(e.clientX/window.innerWidth - 0.5) *40;

    gsap.to(".imagediv",{
        x:`${-moveX*0.4}%`
    })
    const scale = 1 + moveX * 0.07; // small, smooth change
    const clampedScale = Math.max(0.98, Math.min(1.05, scale)); // clamp to avoid drastic changes

    gsap.to(".logo", {
      scaleX: clampedScale,
      scaleY: clampedScale,
      duration: 0.9,
      ease: "power2.out"
    });
})

    })
  return (
    <div>
      <div className='main w-full'>
        <div className='landing w-full h-screen bg-black absolute' >
            <div className='imagediv w-full h-screen relative'>
                <img className='absolute top-0 right-0  w-full h-full overflow-x-hidden scale-[10px] object-cover opacity-15' src="cartoonbackground.png" alt="" />
                <img
  className="absolute top-1/2 -right-64 scale-95 logo transform -translate-x-1/2 -translate-y-1/2 w-3/12 object-cover opacity-80"
  src="ChatGPT Image Jul 11, 2025, 11_47_00 AM.png"
  alt=""
/>

           
  </div>
        </div>



      </div>

  
   
      
      {/* <Navbar /> */}
    </div>
  )
}

export default Animatedslider
