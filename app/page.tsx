"use client";
import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function Home() {
  const rocketRef = useRef(null);
  const smokeContainerRef = useRef(null);

  useEffect(() => {
    const path = document.getElementById("rocketPath");

    const rocketTimeline = gsap.timeline();
    rocketTimeline.to(rocketRef.current, {
      motionPath: {
        path: path,
        align: path,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      duration: 15,
      ease: 'power1.inOut',
      onUpdate: () => {
        const rect = rocketRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2.5;
        const y = rect.top + rect.height / 2.5;

        const smoke = document.createElement('div');
        smoke.className = 'absolute w-1 h-1 bg-white rounded-full blur-sm';
        smoke.style.left = `${x}px`;
        smoke.style.top = `${y}px`;
        smokeContainerRef.current.appendChild(smoke);

        gsap.to(smoke, {
          opacity: 0,
          scale: 3,
          duration: 3,
          ease: 'power1.out',
          onComplete: () => smoke.remove(),
        });
      },
      onComplete: () => {
        gsap.to(rocketRef.current, { opacity: 0, duration: 0.5 });
      },
    });
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Здесь идет вставка SVG как компонента */}
      <svg className="opacity-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" style={{ transform: 'scale(0.8) translateX(-350px)' }}>
        <path
          id="rocketPath"
          d="M0,535C160,524,513.8,372,636.5,263.1c47.2-41.9,87.4-91.9,117.8-147.3c7.6-13.8,14.8-28.8,14.1-44.6c-0.6-12.5-6.2-24.4-14.2-34c-20.9-25-66.7-34.1-88.9-5.6c-16.4,21.1-20,29.4-20,29.4c1.8-4.2-16.5-24.4-19.7-28.1c-10.6-12.6-23.3-23.7-39-29.3c-19.4-6.8-43.6-3-56.5,13.1c-5.9,7.3-9,16.6-9.8,26c-2.3,25.2,11.1,49.5,28.6,67.6C608.1,172,687.6,212,773.5,208.3c140.4-6.1,267.1-66.2,378.3-148.6l42.4-44.7"
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-[200vh] animate-float">
        <Image
          src="/background.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          fill
        />
      </div>

      <div ref={rocketRef} className="fixed bottom-0 left-0 w-[25px] h-[47px]">
        <Image
          src="/rocket.png"
          alt="Rocket"
          width="25"
          height="47"
          className="rotate-90"
        />
      </div>

      <div ref={smokeContainerRef} className="absolute inset-0"></div>

      <div className="fixed bottom-0 right-0 z-10 w-full h-[30vh]">
        <Image
          src="/crowd2.png"
          alt="Crowd"
          className="w-full h-full object-cover"
          fill
        />
      </div>

      <div className="fixed bottom-[-40] left-0 z-10 w-full h-[50vh] mix-blend-overlay opacity-90">
        <Image
          src="/crowd-blurred2.png"
          alt="Crowd Blurred"
          className="w-full h-full object-cover"
          fill
        />
      </div>

      <div className="fixed top-24 right-36 z-20 w-48 h-48 animate-rotate">
        <Image
          src="/planet2.png"
          alt="Planet"
          className="w-48 h-48 rounded-full object-cover"
          fill
        />
      </div>
    </div>
  );
}
