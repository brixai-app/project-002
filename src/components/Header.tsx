import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowDownRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

export type HeaderProps = {
  id?: string;
};

function scrollToSection(targetId: string) {
  if (!targetId) return;
  const el = document.getElementById(targetId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Header({ id = 'top' }: HeaderProps) {
  const { openStatus, todayLabel } = useStore() ?? {};

  const isOpen = openStatus === 'open';

  return (
    <header
      id={id}
      className="relative w-full bg-white text-black border-b border-black"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pb-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 border border-black rounded-[16px] flex items-center justify-center bg-[#FF6F00]">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                CP
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-[0.25em] text-xs uppercase">
                ChillPoint
              </span>
              <span className="text-[11px] text-[#3D3D3D] tracking-[0.16em] uppercase">
                Pure Veg Fast Food
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-[#3D3D3D]">
              <Clock className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">
                {todayLabel ?? 'Today'} • Street-side, city center
              </span>
            </div>
            {isOpen ? (
              <motion.div
                aria-label="Currently open"
                className={cn(
                  'relative inline-flex items-center gap-2 border border-black rounded-[999px] px-3 py-1.5',
                  'bg-black text-white text-[11px] tracking-[0.18em] uppercase'
                )}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6F00] opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6F00]" />
                </span>
                <span>Now Serving</span>
              </motion.div>
            ) : (
              <div
                aria-label="Currently closed"
                className="inline-flex items-center gap-2 border border-black rounded-[999px] px-3 py-1.5 bg-white text-[11px] tracking-[0.18em] uppercase"
              >
                <span className="h-2 w-2 rounded-full bg-[#3D3D3D]" />
                <span>Closed • Back soon</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-stretch">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#3D3D3D]">
                Street-fast. Pure-veg. Late-night.
              </p>
              <h1 className="font-[700] tracking-tight text-[2.9rem] leading-[1.02] sm:text-[3.5rem] lg:text-[4.1rem] font-sans">
                Fast food,
                <br />
                zero noise.
                <br />
                Just{' '}
                <span className="underline decoration-[#FF6F00] decoration-[6px] underline-offset-[10px]">
                  chill plates.
                </span>
              </h1>
              <p className="max-w-md text-sm sm:text-base text-[#3D3D3D] leading-relaxed font-sans">
                Burgers, wraps, fries and shakes on a clean black-and-white
                canvas. Designed for quick cravings, late nights and everything
                in between.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('menu')}
                className={cn(
                  'inline-flex items-center justify-center px-5 py-2.5',
                  'border border-black bg-[#FF6F00] text-black',
                  'text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase',
                  'rounded-md transition-colors hover:bg-[#E65F00] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white'
                )}
              >
                Explore menu
                <ArrowDownRight className="ml-2 h-4 w-4" />
              </button>

              <div className="flex flex-wrap gap-2 text-[11px] tracking-[0.18em] uppercase text-[#3D3D3D]">
                <button
                  type="button"
                  onClick={() => scrollToSection('reviews')}
                  className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
                >
                  Reviews
                </button>
                <span className="hidden sm:inline-block select-none">/</span>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
                >
                  Find us
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[320px] border border-black rounded-[16px] overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
                alt="Crisp veg burger and fries from ChillPoint on a black table"
                crossOrigin="anonymous"
                className="absolute inset-0 h-full w-full object-cover object-center transform scale-100 transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-x-4 bottom-4 sm:bottom-6 flex items-end justify-between gap-4 text-white">
                <div className="space-y-1">
                  <p className="text-[11px] tracking-[0.18em] uppercase">
                    Tonight&apos;s mood
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    Veg-loaded burgers, crispy fries, city lights.
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 text-[11px] tracking-[0.18em] uppercase">
                  <span className="px-2 py-1 rounded-sm bg-white text-black border border-black">
                    Pure Veg
                  </span>
                  <span className="px-2 py-1 rounded-sm bg-[#FF6F00] text-black border border-black">
                    Made to order
                  </span>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 border border-black rounded-[16px]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;