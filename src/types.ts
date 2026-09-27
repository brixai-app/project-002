export type MenuCategory =
  | 'Burgers'
  | 'Sandwiches'
  | 'Wraps'
  | 'Sides'
  | 'Drinks'
  | 'Desserts'
  | 'Combos'
  | 'Specials';

export type FirestoreId = string;

export type TimestampLike = {
  seconds: number;
  nanoseconds: number;
};

export type WithId<T> = T & { id: FirestoreId };

export type MenuItem = {
  id?: FirestoreId;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  isVeg: boolean;
  category: MenuCategory;
  imageUrl: string;
  createdAt?: TimestampLike | Date | null;
  updatedAt?: TimestampLike | Date | null;
  featured?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  tags?: string[];
};

export type Review = {
  id?: FirestoreId;
  name: string;
  rating: number;
  comment: string;
  createdAt?: TimestampLike | Date | null;
  menuItemId?: FirestoreId | null;
};

export type AdminSession = {
  isAuthenticated: boolean;
  lastLoginAt?: Date | null;
};

export type AsyncState<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

export type FirestoreCollectionName = 'menuItems' | 'reviews';

export type Nullable<T> = T | null;

export type OpenStatus = 'open' | 'closed';

export type TimeRange = {
  open: string;
  close: string;
};

export type OpeningHours = {
  [weekday: string]: TimeRange;
};

const types = {};
export default types;