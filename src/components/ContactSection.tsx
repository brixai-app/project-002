import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';

export type ContactSectionProps = {
  id?: string;
};

export function ContactSection({ id = 'contact' }: ContactSectionProps) {
  const phoneNumber = '+91-98765-43210';
  const addressLine1 = 'ChillPoint — Pure Veg Fast Food';
  const addressLine2 = '12, High Street, Koramangala';
  const addressLine3 = 'Bengaluru, Karnataka 560095';
  const email = 'hello@chillpoint.in';

  return (
    <section
      id={id}
      aria-labelledby="contact-heading"
      className="bg-white border-t border-black/10"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] lg:items-stretch">
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#3D3D3D] uppercase">
              Visit ChillPoint
            </p>
            <h2
              id="contact-heading"
              className="font-[Montserrat] text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black"
            >
              Drop by, dial in, or just
              <span className="block border-b border-black pb-1">
                chill with us.
              </span>
            </h2>
            <p className="font-[Poppins] text-sm sm:text-base text-[#3D3D3D] max-w-md">
              Minimal, all-veg, and made to move fast. Reach out for bulk
              orders, collabs, or just to say hi—we&apos;re listening between
              every sizzling patty.
            </p>

            <div className="mt-4 space-y-4">
              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-center gap-3 rounded-md border border-black px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FF6F00] text-black">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#3D3D3D]">
                    Call us
                  </span>
                  <span className="font-[Poppins] text-sm sm:text-base text-black group-hover:underline">
                    {phoneNumber}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-3 rounded-md border border-dashed border-black/60 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FFA000] text-black">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#3D3D3D]">
                    Email
                  </span>
                  <span className="font-[Poppins] text-sm sm:text-base text-black group-hover:underline">
                    {email}
                  </span>
                </div>
              </a>

              <div className="flex gap-3 rounded-md border border-black px-4 py-3">
                <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-md bg-black text-[#FF6F00]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#3D3D3D]">
                    Find us
                  </span>
                  <p className="font-[Poppins] text-sm sm:text-base text-black">
                    {addressLine1}
                    <br />
                    {addressLine2}
                    <br />
                    {addressLine3}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-4 min-h-[260px] overflow-hidden rounded-[16px] border border-black bg-[#faf9f6] shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-black bg-white/90 px-4 py-2 text-xs font-[Poppins]">
              <span className="font-semibold tracking-wide text-[#3D3D3D]">
                Map preview
              </span>
              <span className="rounded-sm bg-[#FFEB3B] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black">
                Coming live soon
              </span>
            </div>
            <iframe
              title="ChillPoint location map"
              aria-label="ChillPoint location map preview"
              className="mt-8 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb="
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;