"use client";
import React from 'react';

export default function About() {
  return (
    <div className="absolute z-10 lg:top-[-40] top-0 left-0 flex flex-col items-center justify-center w-screen h-screen text-white">
      <div className='h-10 transition-opacity duration-500 ease-in opacity-0 animate-fadeIn'>
        <div className="lg:text-4xl text-2xl uppercase tracking-widest font-extralight ">
          About
        </div>
      </div>
    </div>
  );
}
