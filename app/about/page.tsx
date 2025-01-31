"use client";
import React from 'react';

export default function About() {
  return (
    <div className="z-10 flex flex-col items-center justify-start lg:justify-center w-full h-full text-white">
      <div className='transition-opacity duration-500 ease-in opacity-0 animate-fadeIn w-2/3 text-center'>
        <h2 className="lg:text-4xl text-2xl uppercase tracking-widest font-extralight mb-4">
          About
        </h2>
        <p className='mt-4 font-light'>Not everything that looks like a Roman Salute is bad, right? 😉</p>
        <p className='font-light'><b>MarsWave (MWAVE) </b>{`is the first memecoin based on Elon Musk's most ridiculous gesture.`}</p>
        <p className='font-light'>From a funny moment to a real crypto universe.</p>
        <p className='font-light'>Welcome to the new wave of memes!</p>
        <p className='mt-4 font-light text-[#ffd68e]'>...NEW DETAILS ARE COMING SOON...</p>
      </div>
    </div>
  );
}
