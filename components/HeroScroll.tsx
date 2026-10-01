// components/HeroScroll.tsx
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // 1. Entrance timeline
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    introTl.from(headlineRef.current, { opacity: 0, y: 40, duration: 1.2 })
           .from(carRef.current, { scale: 0.85, opacity: 0, duration: 1.4 }, '-=0.8')
           .from('.stat-card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.8 }, '-=0.6');

    // 2. Scroll-bound scrub timeline
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: 1.2,
      },
    })
    .to(headlineRef.current, { scale: 0.8, opacity: 0, y: -50 })
    .to(carRef.current, { scale: 1.3, y: -20 }, 0)
    .to(carRef.current, { x: '40vw', ease: 'power2.in' }, 0.5);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#08080c] overflow-hidden flex flex-col items-center justify-center">
      <h1 ref={headlineRef} className="text-4xl md:text-6xl font-bold tracking-[0.4em] uppercase text-white mb-6">
        W E L C O M E &nbsp; I T Z &nbsp; F I Z Z
      </h1>
      <div ref={carRef} className="w-full max-w-4xl h-80 relative flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80" 
          alt="Sports Car" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="stat-card p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-white">1.99s</div>
          <div className="text-xs text-zinc-400">0-60 MPH</div>
        </div>
        <div className="stat-card p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-white">1,020 HP</div>
          <div className="text-xs text-zinc-400">Peak Power</div>
        </div>
        <div className="stat-card p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-white">420 MI</div>
          <div className="text-xs text-zinc-400">Range</div>
        </div>
        <div className="stat-card p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-white">0.208 Cd</div>
          <div className="text-xs text-zinc-400">Drag</div>
        </div>
      </div>
    </div>
  );
}