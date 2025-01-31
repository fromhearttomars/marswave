"use client";
import React from 'react';
import '../roadmap.css';

export default function Roadmap() {
  return (
    <div className="z-10 flex flex-col items-center justify-start lg:justify-center w-full h-full text-white">
      <div className='transition-opacity duration-500 ease-in opacity-0 animate-fadeIn text-center'>
        <h2 className="lg:text-4xl text-2xl uppercase tracking-widest font-extralight mb-4">
          Roadmap 2025
        </h2>
        <div className="roadmap-container font-light">
          <div className="roadmap-flex">
            {/* Q1 */}
            <div className="roadmap-item q1">
              <h3>Q1 2025</h3>
              <p><strong>Launch MWAVE</strong></p>
              <p>First listing</p>
              <p>Community hype</p>
            </div>

            {/* Q2 */}
            <div className="roadmap-item q2">
              <h3>Q2 2025</h3>
              <p><strong>Meme Campaigns</strong></p>
              <p>First NFT drops</p>
            </div>

            {/* Q3 */}
            <div className="roadmap-item q3">
              <h3>Q3 2025</h3>
              <p><strong>Surprises & Voting</strong></p>
              <p>New listings</p>
            </div>

            {/* Q4 */}
            <div className="roadmap-item q4">
              <h3>Q4 2025</h3>
              <p><strong>To the Moon!</strong></p>
              <p>(or Mars?) 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
