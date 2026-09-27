import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/Header';
import MenuSection from '@/components/MenuSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import AdminPanelDialog from '@/components/AdminPanelDialog';

export function App() {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isMac = navigator?.platform?.toLowerCase()?.includes('mac') ?? false;
      const ctrlOrMeta = isMac ? event.metaKey : event.ctrlKey;
      if (ctrlOrMeta && event.shiftKey && event.key.toLowerCase() === 'a') {
        const adminToggleEvent = new CustomEvent('chillpoint:toggle-admin');
        window?.dispatchEvent(adminToggleEvent);
      }
    };
    window?.addEventListener('keydown', handler);
    return () => {
      window?.removeEventListener('keydown', handler);
    };
  }, []);

  return (
    <StoreProvider>
      <div className="min-h-screen bg-white text-black font-['Poppins',sans-serif]">
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            classNames: {
              toast:
                'rounded-xl border border-black bg-white shadow-[6px_6px_0_0_#000] font-["Poppins",sans-serif]',
              title: 'font-semibold',
              description: 'text-sm text-neutral-700',
              success: 'bg-[#FF6F00]/10 border-[#FF6F00]',
            },
          }}
        />
        <AdminPanelDialog password="chillpoint-admin" />
        <Header id="top" />
        <main className="relative">
          <section
            id="hero"
            className="relative overflow-hidden border-b border-black bg-white"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-stretch lg:py-20">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 border border-black bg-black px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <span className="h-2 w-2 rounded-sm bg-[#FF6F00]" />
                  <span>Pure Veg • Made to Order</span>
                </div>
                <h1 className="mt-6 font-['Manrope',sans-serif] text-5xl leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
                  ChillPoint
                  <span className="block text-3xl font-normal tracking-[0.25em] text-neutral-700 sm:text-4xl">
                    FAST • FRESH • STREET
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-700">
                  A minimal pure-veg fast-food counter serving crisp grills, loaded buns, and street–style sides on a sharp black &amp; white canvas with bold heat.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#menu"
                    className="inline-flex items-center justify-center border border-black bg-[#FF6F00] px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#E65F00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    Explore Menu
                  </a>
                  <div className="inline-flex items-center gap-3 rounded-xl border border-black bg-white px-4 py-3 shadow-[4px_4px_0_0_#000]">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-black bg-black">
                      <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-[#FF6F00]/60" />
                      <span className="relative h-3 w-3 rounded-[4px] bg-[#FF6F00]" />
                    </div>
                    <div className="text-xs leading-tight">
                      <p className="font-semibold uppercase tracking-[0.18em]">
                        Open Now
                      </p>
                      <p className="text-[11px] text-neutral-600">
                        11:00 – 23:00 • Street pickup only
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-1 items-stretch lg:mt-0">
                <div className="grid w-full grid-cols-4 gap-3">
                  <div className="col-span-2 row-span-3 overflow-hidden rounded-[18px] border border-black bg-neutral-100">
                    <img
                      crossOrigin="anonymous"
                      src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                      alt="Crisp veg burger stack from ChillPoint"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="col-span-2 row-span-2 overflow-hidden rounded-[18px] border border-black bg-neutral-100">
                    <img
                      crossOrigin="anonymous"
                      src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
                      alt="Loaded fries and sides at ChillPoint"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="col-span-2 row-span-2 overflow-hidden rounded-[18px] border border-black bg-neutral-100">
                    <img
                      crossOrigin="anonymous"
                      src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
                      alt="ChillPoint drinks and shakes"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-black bg-black/95 text-white">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <MenuSection id="menu" />
            </div>
          </section>

          <section className="border-b border-black bg-white">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <ReviewsSection id="reviews" />
            </div>
          </section>

          <section className="bg-white">
            <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">
              <ContactSection id="contact" />
            </div>
          </section>
        </main>
      </div>
    </StoreProvider>
  );
}

export default App;