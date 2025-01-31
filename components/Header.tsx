"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"

const Header = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'ABOUT', link: '/about' },
    { name: 'ROADMAP', link: '/roadmap' },
  ];

  return <div className="fixed z-30 flex gap-8 items-center w-full h-14 text-white animate-fadeIn opacity-0 transition-opacity m-4">
    <Link href="/"><Image className="opacity-70" src="/marswave_logo_white.svg" alt="Marswave Logo" width="100" height="43" /></Link>
    {menuItems.map((item) =>
      <Link href={item.link} key={item.name} className={cn("opacity-70 hover:opacity-100 transition-opacity", `${pathname === item.link ? "text-destructive active opacity-100" : "text-white "}`)}>
        {item.name}
      </Link>
    )}
  </div>
}

export { Header }
