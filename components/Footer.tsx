"use client";
import React from 'react';
import Image from "next/image";

const Footer = () => {

  const socialLinks = [
    { name: 'discord', link: 'https://discord.gg/VKK84YPq6J' },
    { name: 'facebook', link: 'https://www.facebook.com/FromHeartToMars/' },
    { name: 'instagram', link: 'https://www.instagram.com/fromhearttomars/' },
    { name: 'telegram', link: 'https://t.me/FromHeartToMarsChannel' },
    { name: 'tiktok', link: 'https://www.tiktok.com/@fromhearttomars' },
    { name: 'x', link: 'https://x.com/FromHeartToMars' },
    { name: 'youtube', link: 'https://www.youtube.com/@FromHeartToMars' },
  ];

  return <div className="fixed z-20 bottom-4 flex items-center justify-center gap-6 w-screen h-6 text-white animate-fadeIn opacity-0 transition-opacity">
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
  </div>
}

export { Footer }
