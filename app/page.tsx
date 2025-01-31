"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/index'

export default function Home() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showFirstText, setShowFirstText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("hasAnimated");

    if (hasAnimated) {
      setIsFirstLoad(false);
    } else {
      sessionStorage.setItem("hasAnimated", "true");
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      const timer1 = setTimeout(() => setShowFirstText(true), 5000);
      const timer2 = setTimeout(() => setShowSecondText(true), 6000);
      const timer3 = setTimeout(() => setShowButtons(true), 8000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setShowFirstText(true)
      setShowSecondText(true)
      setShowButtons(true)
    }
  }, [isFirstLoad]);

  return (
    <div className="flex flex-col items-center justify-start lg:justify-center w-full h-full text-white">
      <div className='h-10'>
        {showFirstText && (
          <div className="transition-opacity duration-500 ease-in opacity-0 animate-fadeIn lg:text-4xl text-2xl uppercase tracking-widest font-extralight ">
            From heart to Mars
          </div>
        )}
      </div>
      <div className='h-10'>
        {showSecondText && (
          <div className="transition-opacity duration-500 ease-in opacity-0 animate-fadeIn lg:text-6xl text-4xl uppercase tracking-wider font-normal">
            <span className='drop-shadow-xs gradient'>MARSWAVE</span>
          </div>
        )}
      </div>
      <div className='h-10'>
        {showButtons && (
          <div className="transition-opacity duration-500 ease-in opacity-0 animate-fadeIn mt-8 flex gap-4">
            <Button className='min-w-32' variant="outline"><a href='https://bscscan.com/address/0x1f1376d192123fd7b390aba46dab630b2e3c6514' target='_blank'>Explore</a></Button>
            <Button className='bg-[#eb5247] min-w-32'><a href='https://pancakeswap.finance/?outputCurrency=0x1F1376d192123Fd7b390aBA46dAb630B2E3c6514' target='_blank'>Get MWAVE now</a></Button>
          </div>
        )}
      </div>
    </div>
  );
}
