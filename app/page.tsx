"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function Home() {
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const rocketRef2 = useRef<HTMLDivElement | null>(null);
  const smokeContainerRef = useRef<HTMLDivElement | null>(null);

  const [showFirstText, setShowFirstText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showThirdText, setShowThirdText] = useState(false);
  const [showSocialIcons, setShowSocialIcons] = useState(false);
  const [, setClickCount] = useState(0);
  const [imageSrc, setImageSrc] = useState("/planet.png");
  const [lastAngle, setLastAngle] = useState<number | null>(null);

  const socialLinks = [
    { name: 'discord', link: 'https://discord.gg/VKK84YPq6J' },
    { name: 'facebook', link: 'https://www.facebook.com/FromHeartToMars/' },
    { name: 'instagram', link: 'https://www.instagram.com/fromhearttomars/' },
    { name: 'reddit', link: 'https://www.reddit.com/user/FromHeartToMars/' },
    { name: 'telegram', link: 'https://t.me/fromhearttomars' },
    { name: 'tiktok', link: 'https://www.tiktok.com/@fromhearttomars' },
    { name: 'x', link: 'https://x.com/FromHeartToMars' },
    { name: 'youtube', link: 'https://www.youtube.com/@FromHeartToMars' },
  ];

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
    const timer1 = setTimeout(() => setShowFirstText(true), 5000);
    const timer2 = setTimeout(() => setShowSecondText(true), 6000);
    const timer3 = setTimeout(() => setShowThirdText(true), 8000);
    const timer4 = setTimeout(() => setShowSocialIcons(true), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const path = document.getElementById("rocketPath") as SVGPathElement | null;

    // Проверяем, что путь существует и не равен null
    if (path && rocketRef.current) {
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
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <svg className="opacity-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" style={{ transform: 'scale(0.7) translate(-250px, -50px)' }}>
        <path
          id="rocketPath"
          d="M0,535C160,524,513.8,372,636.5,263.1c47.2-41.9,87.4-91.9,117.8-147.3c7.6-13.8,14.8-28.8,14.1-44.6c-0.6-12.5-6.2-24.4-14.2-34c-20.9-25-66.7-34.1-88.9-5.6c-16.4,21.1-20,29.4-20,29.4c1.8-4.2-16.5-24.4-19.7-28.1c-10.6-12.6-23.3-23.7-39-29.3c-19.4-6.8-43.6-3-56.5,13.1c-5.9,7.3-9,16.6-9.8,26c-2.3,25.2,11.1,49.5,28.6,67.6C608.1,172,687.6,212,773.5,208.3c140.4-6.1,267.1-66.2,378.3-148.6l42.4-44.7"
        />
      </svg>
      <div className="flex flex-col">
        <div className="absolute top-0 left-0 w-full h-[200vh] animate-float">
          <Image
            src="/background.jpg"
            alt="Background"
            className="w-full h-full object-cover"
            fill
          />
        </div>

        <div ref={rocketRef} className="absolute w-[25px] h-[47px] pointer-events-none">
          <Image
            src="/rocket.png"
            alt="Rocket"
            width="25"
            height="47"
            className="rotate-90"
          />
        </div>

        <div ref={rocketRef2} className="absolute w-[25px] h-[47px] pointer-events-none z-10 hidden lg:block ">
          <Image
            src="/rocket.png"
            alt="RocketCursor"
            width="25"
            height="47"
            className="rotate-90"
          />
        </div>

        <div ref={smokeContainerRef} className="absolute inset-0"></div>

        <div className="fixed bottom-0 right-0 z-10 w-full h-[30vh]">
          <Image
            src="/crowd.png"
            alt="Crowd"
            className="w-full h-full object-cover"
            fill
          />
        </div>

        <div className="fixed bottom-[-40] left-0 z-10 w-full h-[50vh] mix-blend-overlay opacity-90">
          <Image
            src="/crowd-blurred.png"
            alt="Crowd Blurred"
            className="w-full h-full object-cover"
            fill
          />
        </div>

        <div className="z-20 w-48 h-48 animate-rotate self-center top-10 fixed lg:top-24 lg:right-36" onClick={handleClick}>
          <Image
            src={imageSrc}
            alt="Planet"
            className="w-48 h-48 rounded-full"
            fill
          />
        </div>

        <div className="absolute z-10 top-0 left-0 flex flex-col items-center justify-center w-screen h-screen text-white">
          <div className='h-10'>
            {showFirstText && (
              <div className="transition-opacity duration-1000 ease-in opacity-0 animate-fadeIn lg:text-4xl text-2xl uppercase tracking-widest">
                From heart to Mars
              </div>
            )}
          </div>
          <div className='h-10'>
            {showSecondText && (
              <div className="transition-opacity duration-1000 ease-in opacity-0 animate-fadeIn lg:text-6xl text-4xl uppercase tracking-wider">
                <span className='text-[#ffd68e] drop-shadow-xs'>MARS</span><span className='text-[#eb5247] drop-shadow-xs'>WAVE</span>
              </div>
            )}
          </div>
          <div className='h-10'>
            {showThirdText && (
              <div className="transition-opacity duration-1000 ease-in opacity-0 animate-fadeIn mt-8 text-xl">
                Coming soon...
              </div>
            )}
          </div>
        </div>
        {showSocialIcons && (<div className="absolute z-20 bottom-4 flex items-center justify-center gap-6 w-screen h-6 text-white animate-fadeIn opacity-0 transition-opacity">
          {socialLinks.map((item) =>
            <a href={item.link} key={item.name} target='_blank' className='opacity-70 hover:opacity-100 transition-opacity'>
              <Image
                src={`/social/${item.name}.svg`}
                alt={item.name}
                width="20"
                height="20"
              />
            </a>
          )}
        </div>)}
      </div>
    </div>

  );
}
