"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Header = () => {

  const menuItems = [
    { name: 'ABOUT', link: '/about' },
    { name: 'ROADMAP', link: '/roadmap' },
  ];

  return <div className="fixed z-30 flex gap-8 items-center w-full h-14 text-white animate-fadeIn opacity-0 transition-opacity m-4">
    <Link href="/"><Image className="opacity-70" src="/marswave_logo_white.svg" alt="Marswave Logo" width="100" height="43" /></Link>
    {menuItems.map((item) =>
      <Link href={item.link} key={item.name} className='text-white opacity-70 hover:opacity-100 transition-opacity'>
        {item.name}
      </Link>
    )}
  </div>
}

export { Header }
