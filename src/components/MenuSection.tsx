import React, { useMemo, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Filter, ChevronDown, Search } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { MenuCategory, MenuItem } from '@/types';
import { cn } from '@/lib/utils';
import MenuItemCard from './MenuItemCard';

export type MenuSectionProps = {
  id?: string;
};

const categories: MenuCategory[] = [
  'Burgers',
  'Sandwiches',
  'Wraps',
  'Sides',
  'Drinks',
  'Desserts',
  'Combos',
  'Specials',
];

function filterItems(
  items: MenuItem[],
  activeCategory: MenuCategory | 'All',
  searchQuery: string
): MenuItem[] {
  const trimmed = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' ? true : item?.category === activeCategory;
    if (!matchesCategory) return false;
    if (!trimmed) return true;
    const haystack = `${item?.name ?? ''} ${item?.description ?? ''} ${
      item?.tags?.join(' ') ?? ''
    }`.toLowerCase();
    return haystack.includes(trimmed);
  });
}

export function MenuSection({ id = 'menu' }: MenuSectionProps) {
  const { menuItemsState, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const allItems = (menuItemsState?.data ?? []) as MenuItem[];

  const filtered = useMemo(
    () => filterItems(allItems, activeCategory, searchQuery),
    [allItems, activeCategory, searchQuery]
  );

  const loading = menuItemsState?.loading ?? false;
  const hasError = Boolean(menuItemsState?.error);
  const isEmpty = !loading && !hasError && filtered.length === 0;

  return (
    <section id={id} className="w-full bg-black text-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#FF6F00]">
              Menu
            </p>
            <h2 className="font-[Montserrat] text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Pure-veg fast food,
              <span className="block font-light text-white/80">
                built for late-night cravings.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:w-80">
            <label className="relative flex items-center">
              <span className="sr-only">Search menu</span>
              <span className="pointer-events-none absolute left-3 text-white/40">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-black placeholder:text-black/40 border border-white focus:border-[#FF6F00] focus:outline-none focus:ring-0 rounded-md py-2.5 pl-9 pr-3 text-sm font-[Poppins]"
                placeholder="Search burgers, sides, drinks…"
              />
            </label>
            <div className="flex items-center justify-between gap-3 md:hidden">
              <span className="text-xs font-[Poppins] text-white/60">
                Filter by category
              </span>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white text-black px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase"
                  >
                    <Filter className="h-3 w-3" />
                    <span>{activeCategory === 'All' ? 'All items' : activeCategory}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  side="bottom"
                  align="end"
                  className="min-w-[160px] bg-white text-black border border-black rounded-md shadow-lg py-1 text-sm font-[Poppins]"
                >
                  <DropdownMenu.Item
                    onSelect={() => setActiveCategory('All')}
                    className={cn(
                      'px-3 py-1.5 outline-none cursor-pointer',
                      activeCategory === 'All'
                        ? 'bg-black text-white'
                        : 'hover:bg-black/5'
                    )}
                  >
                    All
                  </DropdownMenu.Item>
                  {categories.map((cat) => (
                    <DropdownMenu.Item
                      key={cat}
                      onSelect={() => setActiveCategory(cat)}
                      className={cn(
                        'px-3 py-1.5 outline-none cursor-pointer',
                        activeCategory === cat
                          ? 'bg-black text-white'
                          : 'hover:bg-black/5'
                      )}
                    >
                      {cat}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div
            className="flex items-center gap-3 overflow-x-auto pb-1"
            aria-label="Menu categories"
          >
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={cn(
                'whitespace-nowrap border px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors',
                activeCategory === 'All'
                  ? 'bg-[#FF6F00] text-black border-[#FF6F00]'
                  : 'border-white/30 text-white/70 hover:border-[#FF6F00] hover:text-white'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'whitespace-nowrap border px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors',
                  activeCategory === cat
                    ? 'bg-[#FF6F00] text-black border-[#FF6F00]'
                    : 'border-white/30 text-white/70 hover:border-[#FF6F00] hover:text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] rounded-[16px] border border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && hasError && (
          <div className="border border-[#FF6F00] rounded-[16px] px-4 py-6 text-center font-[Poppins] text-sm text-white/80">
            Something went wrong loading the menu. Please try again in a moment.
          </div>
        )}

        {isEmpty && (
          <div className="border border-white/15 rounded-[16px] px-6 py-10 text-center space-y-3">
            <p className="font-[Montserrat] text-lg">
              Nothing here… yet.
            </p>
            <p className="font-[Poppins] text-sm text-white/70">
              Try another category or clear your search to reveal more of the ChillPoint menu.
            </p>
          </div>
        )}

        {!loading && !hasError && !isEmpty && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:[&>*:nth-child(3n)]:translate-y-6 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filtered.map((item) => (
              <MenuItemCard
                key={item?.id ?? item?.name}
                item={item}
                onAddToCart={(menuItem) => addToCart?.(menuItem)}
                className="transition-transform duration-300 hover:-translate-y-1"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MenuSection;