import { MenuItem, Review, OpeningHours } from '@/types';

export const mockOpeningHours: OpeningHours = {
  Monday: { open: '11:00', close: '23:00' },
  Tuesday: { open: '11:00', close: '23:00' },
  Wednesday: { open: '11:00', close: '23:00' },
  Thursday: { open: '11:00', close: '23:00' },
  Friday: { open: '11:00', close: '23:30' },
  Saturday: { open: '11:00', close: '23:30' },
  Sunday: { open: '12:00', close: '22:30' },
};

export const mockMenuItems: MenuItem[] = [
  {
    name: 'ChillPoint Classic Veg Burger',
    description: 'Crispy veg patty, cheese, fresh lettuce, and signature sauce in a toasted bun.',
    price: 149,
    isAvailable: true,
    isVeg: true,
    category: 'Burgers',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    featured: true,
    spicyLevel: 1,
    tags: ['best-seller', 'cheesy'],
  },
  {
    name: 'Peri Peri Paneer Burger',
    description: 'Grilled paneer, smoky peri peri glaze, charred onions, and crunchy slaw.',
    price: 189,
    isAvailable: true,
    isVeg: true,
    category: 'Burgers',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    spicyLevel: 3,
    tags: ['spicy', 'paneer'],
  },
  {
    name: 'Bombay Street Sandwich',
    description: 'Masala potato, mint chutney, onions, and cheese grilled to golden perfection.',
    price: 129,
    isAvailable: true,
    isVeg: true,
    category: 'Sandwiches',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 2,
    tags: ['street-style', 'grilled'],
  },
  {
    name: 'Tandoori Paneer Wrap',
    description: 'Soft tortilla stuffed with smoky tandoori paneer, peppers, and cool yogurt drizzle.',
    price: 179,
    isAvailable: true,
    isVeg: true,
    category: 'Wraps',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    spicyLevel: 2,
    tags: ['tandoori', 'high-protein'],
  },
  {
    name: 'Masala Fries Bucket',
    description: 'Crisp fries tossed in house masala and served with tangy chilli mayo.',
    price: 99,
    isAvailable: true,
    isVeg: true,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    featured: true,
    spicyLevel: 1,
    tags: ['crispy', 'shareable'],
  },
  {
    name: 'Chilli Cheese Loaded Fries',
    description: 'Golden fries smothered in molten cheese, chilli flakes, and spring onions.',
    price: 159,
    isAvailable: true,
    isVeg: true,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 2,
    tags: ['loaded', 'cheesy'],
  },
  {
    name: 'Mango Fizz Cooler',
    description: 'Sparkling drink with mango pulp, lime, and crushed ice for a bright, chilled finish.',
    price: 89,
    isAvailable: true,
    isVeg: true,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    tags: ['summer', 'refreshing'],
  },
  {
    name: 'Classic Cold Coffee',
    description: 'Smooth blended coffee, milk, and ice with a light cocoa dusting.',
    price: 119,
    isAvailable: true,
    isVeg: true,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['coffee', 'chilled'],
  },
  {
    name: 'Choco Lava Jar',
    description: 'Warm chocolate cake crumble with molten center, layered in a grab-and-go jar.',
    price: 139,
    isAvailable: true,
    isVeg: true,
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
    featured: false,
    tags: ['chocolate', 'indulgent'],
  },
  {
    name: 'Family Chill Combo',
    description: 'Two burgers, two wraps, masala fries bucket, and four drinks at a chill price.',
    price: 649,
    isAvailable: true,
    isVeg: true,
    category: 'Combos',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    featured: true,
    tags: ['combo', 'sharing'],
  },
  {
    name: 'Midnight Veg Feast Box',
    description: 'Late-night special with a stacked burger, loaded fries, and a chilled cooler.',
    price: 329,
    isAvailable: false,
    isVeg: true,
    category: 'Specials',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    spicyLevel: 2,
    tags: ['limited', 'midnight'],
  },
];

export const mockReviews: Review[] = [
  {
    name: 'Ananya',
    rating: 5,
    comment:
      'Perfect late-evening veg comfort food. The peri peri paneer burger and masala fries are a ritual now.',
  },
  {
    name: 'Rohan',
    rating: 4,
    comment:
      'Love the clean menu and fast service. Everything tastes fresh without feeling too heavy.',
  },
  {
    name: 'Zoya',
    rating: 5,
    comment:
      'ChillPoint nails the balance between street-style flavor and modern vibes. The wraps are a must-try.',
  },
];

const mockData = {
  mockOpeningHours,
  mockMenuItems,
  mockReviews,
};

export default mockData;
export { mockData };
