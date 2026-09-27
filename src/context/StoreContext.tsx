import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { toast } from 'sonner';
import { firebaseDb } from '@/lib/firebase';

// Lightweight Firestore fallbacks for sandboxed environment
// In this build, firebase/firestore is not available, so we simulate
// asynchronous CRUD with in-memory state and localStorage for persistence.

type LocalMenuRecord = WithId<MenuItem> & { createdAt: Date; updatedAt: Date };
type LocalReviewRecord = WithId<Review> & { createdAt: Date };

const STORAGE_KEYS = {
  menu: 'chillpoint_menu_items',
  reviews: 'chillpoint_reviews',
} as const;

function loadLocalMenu(fallback: WithId<MenuItem>[]): LocalMenuRecord[] {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEYS.menu) : null;
    if (!raw) return fallback.map(item => ({ ...(item as MenuItem), id: item.id, createdAt: new Date(), updatedAt: new Date() }));
    const parsed = JSON.parse(raw) as LocalMenuRecord[];
    return parsed.map(m => ({ ...m, createdAt: new Date(m.createdAt), updatedAt: new Date(m.updatedAt) }));
  } catch {
    return fallback.map(item => ({ ...(item as MenuItem), id: item.id, createdAt: new Date(), updatedAt: new Date() }));
  }
}

function saveLocalMenu(items: LocalMenuRecord[]): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function loadLocalReviews(fallback: WithId<Review>[]): LocalReviewRecord[] {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEYS.reviews) : null;
    if (!raw) return fallback.map(r => ({ ...(r as Review), id: r.id, createdAt: new Date() }));
    const parsed = JSON.parse(raw) as LocalReviewRecord[];
    return parsed.map(r => ({ ...r, createdAt: new Date(r.createdAt) }));
  } catch {
    return fallback.map(r => ({ ...(r as Review), id: r.id, createdAt: new Date() }));
  }
}

function saveLocalReviews(items: LocalReviewRecord[]): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(items));
  } catch {
    // ignore
  }
}
import {
  AdminSession,
  AsyncState,
  MenuItem,
  Review,
  WithId,
  FirestoreCollectionName,
} from '@/types';
import { mockMenuItems, mockReviews } from '@/data/mockData';

type StoreContextValue = {
  menuItemsState: AsyncState<WithId<MenuItem>[]>;
  reviewsState: AsyncState<WithId<Review>[]>;
  activeCategory: string | null;
  searchQuery: string;
  adminDrawerOpen: boolean;
  adminSession: AdminSession;
  setActiveCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setAdminDrawerOpen: (open: boolean) => void;
  authenticateAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  addMenuItem: (item: MenuItem) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  addReview: (review: Review) => Promise<void>;
  // optional, derived helpers for UI components
  openStatus?: 'open' | 'closed';
  todayLabel?: string;
  addToCart?: (item: MenuItem) => void;
  menuItems?: AsyncState<WithId<MenuItem>[]>;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

type ProviderProps = {
  children?: ReactNode;
};

const defaultAsyncState = <T,>(data: T): AsyncState<T> => ({
  data,
  loading: false,
  error: null,
});

export function StoreProvider({ children = null }: ProviderProps) {
  const [menuItemsState, setMenuItemsState] = useState<AsyncState<WithId<MenuItem>[]>>(
    () => defaultAsyncState([]),
  );
  const [reviewsState, setReviewsState] = useState<AsyncState<WithId<Review>[]>>(
    () => defaultAsyncState([]),
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adminDrawerOpen, setAdminDrawerOpen] = useState<boolean>(false);
  const [adminSession, setAdminSession] = useState<AdminSession>({
    isAuthenticated: false,
    lastLoginAt: null,
  });

  const subscribeCollection = useCallback(
    <T,>(
      name: FirestoreCollectionName,
      setter: React.Dispatch<React.SetStateAction<AsyncState<WithId<T>[]>>>,
      fallback: WithId<T>[],
    ) => {
      // Firestore is not available; use localStorage-backed fallbacks instead
      setter(prev => ({ ...prev, loading: true, error: null }));
      if (name === 'menuItems') {
        const local = loadLocalMenu(fallback as unknown as WithId<MenuItem>[]);
        setter({
          data: (local as unknown as WithId<T>[]) ?? fallback,
          loading: false,
          error: null,
        });
      } else if (name === 'reviews') {
        const local = loadLocalReviews(fallback as unknown as WithId<Review>[]);
        setter({
          data: (local as unknown as WithId<T>[]) ?? fallback,
          loading: false,
          error: null,
        });
      } else {
        setter({ data: fallback, loading: false, error: null });
      }
      // no realtime unsubscribe needed
      return undefined;
    },
    [],
  );

  useEffect(() => {
    const menuFallback = (mockMenuItems ?? []).map(item => ({
      ...(item as MenuItem),
      id: item?.id ?? crypto.randomUUID(),
    }));
    const reviewsFallback = (mockReviews ?? []).map(review => ({
      ...(review as Review),
      id: review?.id ?? crypto.randomUUID(),
    }));
    const unsubMenu = subscribeCollection<MenuItem>('menuItems', setMenuItemsState, menuFallback);
    const unsubReviews = subscribeCollection<Review>('reviews', setReviewsState, reviewsFallback);
    return () => {
      unsubMenu?.();
      unsubReviews?.();
    };
  }, [subscribeCollection]);

  const authenticateAdmin = useCallback((password: string): boolean => {
    const pass = password ?? '';
    const ok = pass.length > 0 && pass === (import.meta.env.VITE_ADMIN_PASS ?? 'chillpoint-admin');
    if (ok) {
      setAdminSession({
        isAuthenticated: true,
        lastLoginAt: new Date(),
      });
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid admin password');
    }
    return ok;
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminSession({ isAuthenticated: false, lastLoginAt: null });
    toast.success('Admin logged out');
  }, []);

  const addMenuItem = useCallback(async (item: MenuItem) => {
    try {
      const now = new Date();
      const id = crypto.randomUUID();
      const record: LocalMenuRecord = {
        ...(item as MenuItem),
        id,
        createdAt: now,
        updatedAt: now,
      };
      setMenuItemsState(prev => {
        const nextData = [...(prev.data ?? []), record];
        saveLocalMenu(nextData as unknown as LocalMenuRecord[]);
        return { ...prev, data: nextData };
      });
      toast.success('Menu item added');
    } catch (error: unknown) {
      toast.error((error as Error)?.message ?? 'Failed to add menu item');
    }
  }, []);

  const updateMenuItem = useCallback(async (id: string, item: Partial<MenuItem>) => {
    if (!id) return;
    try {
      setMenuItemsState(prev => {
        const nextData = (prev.data ?? []).map(existing => {
          if (existing.id !== id) return existing;
          const updated: LocalMenuRecord = {
            ...(existing as unknown as LocalMenuRecord),
            ...item,
            updatedAt: new Date(),
          };
          return updated;
        });
        saveLocalMenu(nextData as unknown as LocalMenuRecord[]);
        return { ...prev, data: nextData };
      });
      toast.success('Menu item updated');
    } catch (error: unknown) {
      toast.error((error as Error)?.message ?? 'Failed to update menu item');
    }
  }, []);

  const deleteMenuItem = useCallback(async (id: string) => {
    if (!id) return;
    try {
      const confirmed = window.confirm('Delete this menu item? This cannot be undone.');
      if (!confirmed) return;
      setMenuItemsState(prev => {
        const nextData = (prev.data ?? []).filter(item => item.id !== id);
        saveLocalMenu(nextData as unknown as LocalMenuRecord[]);
        return { ...prev, data: nextData };
      });
      toast.success('Menu item deleted');
    } catch (error: unknown) {
      toast.error((error as Error)?.message ?? 'Failed to delete menu item');
    }
  }, []);

  const addReview = useCallback(async (review: Review) => {
    try {
      const now = new Date();
      const id = crypto.randomUUID();
      const record: LocalReviewRecord = {
        ...(review as Review),
        id,
        createdAt: now,
      };
      setReviewsState(prev => {
        const nextData = [...(prev.data ?? []), record];
        saveLocalReviews(nextData as unknown as LocalReviewRecord[]);
        return { ...prev, data: nextData };
      });
      toast.success('Thanks for your review');
    } catch (error: unknown) {
      toast.error((error as Error)?.message ?? 'Failed to submit review');
    }
  }, []);

  const value = useMemo<StoreContextValue>(
    () => ({
      menuItemsState,
      reviewsState,
      activeCategory,
      searchQuery,
      adminDrawerOpen,
      adminSession,
      setActiveCategory,
      setSearchQuery,
      setAdminDrawerOpen,
      authenticateAdmin,
      logoutAdmin,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addReview,
      // derived, backwards-compatible helpers used across the app
      openStatus: 'open',
      todayLabel: 'Today',
      addToCart: undefined,
      menuItems: menuItemsState,
    }),
    [
      menuItemsState,
      reviewsState,
      activeCategory,
      searchQuery,
      adminDrawerOpen,
      adminSession,
      authenticateAdmin,
      logoutAdmin,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addReview,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}

// [auto-removed: duplicate export of StoreProvider]
export { StoreContext };
export default StoreContext;