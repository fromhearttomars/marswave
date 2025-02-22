"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Image from "next/image";
import { Header, Footer } from '@/components/index'

gsap.registerPlugin(MotionPathPlugin);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const rocketRef2 = useRef<HTMLDivElement | null>(null);
  const smokeContainerRef = useRef<HTMLDivElement | null>(null);

  const [, setClickCount] = useState(0);
  const [imageSrc, setImageSrc] = useState("/planet.png");
  const [lastAngle, setLastAngle] = useState<number | null>(null);

  const createSmoke = (x: number, y: number) => {
    const smoke = document.createElement('div');
    smoke.className = 'smoke absolute w-1 h-1 bg-white rounded-full blur-sm';
    smoke.style.left = `${x}px`;
    smoke.style.top = `${y}px`;
    if (smokeContainerRef.current) {
      smokeContainerRef.current.appendChild(smoke);
    }

    setTimeout(() => {
      smoke.remove();
    }, 500);
  };

  const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
    const mouseX = event.clientX - 10;
    const mouseY = event.clientY - 20;

    if (rocketRef2.current) {
      rocketRef2.current.style.opacity = "1"
      const angle = Math.atan2(mouseY - rocketRef2.current.offsetTop, mouseX - rocketRef2.current.offsetLeft);

      if (lastAngle === null) {
        setLastAngle(angle);
      }

      const angleDifference = Math.abs(angle - (lastAngle || 0));

      if (angleDifference > 0.05) {
        rocketRef2.current.style.transition = "transform 0.1s ease-out";
        rocketRef2.current.style.transform = `rotate(${angle}rad)`;
        setLastAngle(angle);
      }

      rocketRef2.current.style.left = `${mouseX}px`;
      rocketRef2.current.style.top = `${mouseY}px`;

      createSmoke(event.clientX, event.clientY);
    }
  };

  const handleClick = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;

      if (newCount === 3) {
        setImageSrc("/planet-smile.png");
        window.addEventListener("mousemove", handleMouseMove);
        document.body.style.cursor = "none";
        setTimeout(() => {
          setImageSrc("/planet.png");
        }, 2000);
      }

      return newCount;
    });
  };

  useEffect(() => {
    const path = document.getElementById("rocketPath") as SVGPathElement | null;

    if (path && rocketRef.current) {
      rocketRef.current.style.opacity = "1"
      const rocketTimeline = gsap.timeline();
      rocketTimeline.to(rocketRef.current, {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 10,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (path && rocketRef.current) {
            const rect = rocketRef.current.getBoundingClientRect();
            const x = rect.left + rect.width / 2.5;
            const y = rect.top + rect.height / 2.5;

            const smoke = document.createElement('div');
            smoke.className = 'absolute w-1 h-1 bg-white rounded-full blur-sm';
            smoke.style.left = `${x}px`;
            smoke.style.top = `${y}px`;
            if (smokeContainerRef.current) {
              smokeContainerRef.current.appendChild(smoke);
            }

            gsap.to(smoke, {
              opacity: 0,
              scale: 3,
              duration: 3,
              ease: 'power1.out',
              onComplete: () => smoke.remove(),
            });
          }
        },
        onComplete: () => {
          if (rocketRef.current) {
            gsap.to(rocketRef.current, { opacity: 0, duration: 0.5 });
          }
        },
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-screen h-auto">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-screen">
          <div className="absolute inset-0 w-full h-[200vh] animate-float">
            <Image
              src="/background.jpg"
              alt="Background"
              className="w-full h-full object-cover"
              fill
            />
          </div>
        </div>
        <div className="fixed bottom-0 right-0 z-50 w-full h-[30vh] pointer-events-none">
          <Image
            src="/crowd.png"
            alt="Crowd"
            className="w-full h-full object-cover"
            fill
          />
        </div>

        <div className="fixed bottom-0 right-0 z-50 w-full h-[50vh] mix-blend-overlay opacity-90 pointer-events-none">
          <Image
            src="/crowd-blurred.png"
            alt="Crowd Blurred"
            className="w-full h-full object-cover"
            fill
          />
        </div>

        <div ref={rocketRef} className="absolute w-[25px] h-[47px] pointer-events-none opacity-0">
          <Image
            src="/rocket.png"
            alt="Rocket"
            width="25"
            height="47"
            className="rotate-90"
          />
        </div>

        <div ref={rocketRef2} className="absolute w-[25px] h-[47px] pointer-events-none hidden lg:block opacity-0">
          <Image
            src="/rocket.png"
            alt="RocketCursor"
            width="25"
            height="47"
            className="rotate-90"
          />
        </div>

        <div ref={smokeContainerRef} className="absolute inset-0"></div>

        <svg className="opacity-0 transform -translate-x-12 translate-y-12 lg:scale-75 lg:-translate-x-52 lg:-translate-y-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
          <path
            id="rocketPath"
            d="M0,535C160,524,513.8,372,636.5,263.1c47.2-41.9,87.4-91.9,117.8-147.3c7.6-13.8,14.8-28.8,14.1-44.6c-0.6-12.5-6.2-24.4-14.2-34c-20.9-25-66.7-34.1-88.9-5.6c-16.4,21.1-20,29.4-20,29.4c1.8-4.2-16.5-24.4-19.7-28.1c-10.6-12.6-23.3-23.7-39-29.3c-19.4-6.8-43.6-3-56.5,13.1c-5.9,7.3-9,16.6-9.8,26c-2.3,25.2,11.1,49.5,28.6,67.6C608.1,172,687.6,212,773.5,208.3c140.4-6.1,267.1-66.2,378.3-148.6l42.4-44.7"
          />
        </svg>
      </div>

      <div className="fixed w-full min-h-screen h-fit">
        <Header />
        <div className="flex flex-col items-center justify-start lg:justify-center h-screen mt-20 lg:mt-0 gap-10" >
          <div className="z-10 min-h-32 h-32 w-32 animate-rotate lg:w-48 lg:h-48 lg:fixed lg:top-24 lg:right-36" onClick={handleClick}>
            <Image
              src={imageSrc}
              alt="Planet"
              className="w-48 h-48 rounded-full"
              fill
            />
          </div>
          <main className="relative w-full flex-grow flex-shrink overflow-scroll mb-52 lg:mb-0">{children}</main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export { Layout }
