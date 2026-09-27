import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Flame, Star, ShoppingBag } from 'lucide-react';
import { MenuItem } from '@/types';
import { cn } from '@/lib/utils';

export type MenuItemCardProps = {
  item?: MenuItem | null;
  onAddToCart?: (item: MenuItem) => void;
  className?: string;
  highlightPopular?: boolean;
};

export function MenuItemCard({
  item = null,
  onAddToCart = () => undefined,
  className = '',
  highlightPopular = true,
}: MenuItemCardProps) {
  const isAvailable = item?.isAvailable ?? false;
  const isVeg = item?.isVeg ?? true;
  const isPopular = highlightPopular && (item?.featured ?? false);
  const spicyLevel = item?.spicyLevel ?? 0;
  const imageUrl =
    item?.imageUrl ||
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80';

  const handleAddClick = () => {
    if (item && isAvailable) {
      onAddToCart(item);
    }
  };

  const spicyDots = Array.from({ length: 3 }).map((_, index) => {
    const active = spicyLevel > index;
    return (
      <span
        key={index}
        className={cn(
          'h-1.5 w-3 rounded-sm transition-colors',
          active ? 'bg-[#FF6F00]' : 'bg-neutral-300'
        )}
      />
    );
  });

  return (
    <motion.article
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[16px] border border-black bg-white focus-within:ring-2 focus-within:ring-[#FF6F00] focus-within:ring-offset-2 focus-within:ring-offset-white',
        !isAvailable ? 'opacity-70' : '',
        className
      )}
      aria-label={item?.name ?? 'Menu item'}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]">
          <img
            src={imageUrl}
            crossOrigin="anonymous"
            alt={item?.name ?? 'Menu item image'}
            className={cn(
              'h-full w-full object-cover transition-transform duration-500 ease-out',
              'group-hover:scale-105'
            )}
          />
        </div>
        {isPopular && (
          <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-[#FF6F00]" aria-hidden="true" />
              <span>Popular</span>
            </div>
          </div>
        )}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/55">
            <span className="rounded-md border border-white/40 bg-black/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-[600] tracking-tight text-[15px] leading-snug text-black">
            {item?.name ?? 'Untitled Item'}
          </h3>
          <div
            className={cn(
              'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5',
              isVeg ? 'border-[#00A651]/60 bg-[#00A651]/5' : 'border-red-600/60 bg-red-600/5'
            )}
            aria-label={isVeg ? 'Pure vegetarian' : 'Contains meat'}
          >
            <Leaf
              className={cn(
                'h-3 w-3',
                isVeg ? 'text-[#00A651]' : 'text-red-600'
              )}
              aria-hidden="true"
            />
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black">
              Veg
            </span>
          </div>
        </div>

        <p className="mb-2 line-clamp-2 text-[11px] leading-snug text-[#3D3D3D]">
          {item?.description ?? 'Freshly prepared fast-casual classic from ChillPoint.'}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] font-semibold tracking-[0.18em] text-black">
              ₹{(item?.price ?? 0).toFixed(0)}
            </p>
            <div className="flex items-center gap-1.5">
              <Flame
                className={cn(
                  'h-3 w-3',
                  spicyLevel ? 'text-[#FF6F00]' : 'text-neutral-300'
                )}
                aria-hidden="true"
              />
              <div
                className="flex items-center gap-0.5"
                aria-label={
                  spicyLevel ? `Spice level ${spicyLevel} of 3` : 'Not spicy'
                }
              >
                {spicyDots}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddClick}
            disabled={!isAvailable || !item}
            className={cn(
              'inline-flex items-center gap-1 rounded-md border border-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] outline-none transition-colors',
              isAvailable && item
                ? 'bg-[#FF6F00] text-black hover:bg-[#E65F00]'
                : 'cursor-not-allowed bg-neutral-200 text-neutral-500 border-neutral-400'
            )}
            aria-disabled={!isAvailable || !item}
          >
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isAvailable ? 'Add' : 'Unavailable'}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default MenuItemCard;