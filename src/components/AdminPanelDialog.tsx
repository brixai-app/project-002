import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { X, Trash2, Edit, Plus, AlertTriangle } from 'lucide-react';
import { StoreContext, useStore } from '@/context/StoreContext';
import { MenuItem, WithId } from '@/types';
import { cn } from '@/lib/utils';

export type AdminPanelDialogProps = {
  password?: string;
};

export function AdminPanelDialog({ password = 'chillpoint-admin' }: AdminPanelDialogProps) {
  const store = useContext(StoreContext);
  const { adminSession, menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useStore();

  // If context is not available for any reason, do not render the dialog
  if (!store) return null;
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState('');
  const [auth, setAuth] = useState(adminSession?.isAuthenticated ?? false);
  const [editing, setEditing] = useState<WithId<MenuItem> | null>(null);
  const [draftName, setDraftName] = useState('');
  const [draftPrice, setDraftPrice] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;

  const resetDraft = useCallback(() => {
    setEditing(null);
    setDraftName('');
    setDraftPrice('');
  }, []);

  const handleGlobalShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (!isDesktop) return;
        setOpen((prev) => !prev);
      }
    },
    [isDesktop]
  );

  useEffect(() => {
    window?.addEventListener('keydown', handleGlobalShortcut);
    return () => window?.removeEventListener('keydown', handleGlobalShortcut);
  }, [handleGlobalShortcut]);

  useEffect(() => {
    if (!open) {
      setPwd('');
      resetDraft();
      setConfirmId(null);
    }
  }, [open, resetDraft]);

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (pwd === password) {
        setAuth(true);
        toast.success('Admin access granted');
      } else {
        toast.error('Invalid admin password');
      }
    },
    [pwd, password]
  );

  const startEdit = useCallback((item: WithId<MenuItem>) => {
    setEditing(item);
    setDraftName(item?.name ?? '');
    setDraftPrice(String(item?.price ?? ''));
  }, []);

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const priceNum = Number(draftPrice);
      if (!draftName?.trim() || Number.isNaN(priceNum)) {
        toast.error('Name and valid price required');
        return;
      }
      try {
        if (editing) {
          await updateMenuItem?.(editing.id, { name: draftName.trim(), price: priceNum });
          toast.success('Menu item updated');
        } else {
          await addMenuItem?.({
            name: draftName.trim(),
            price: priceNum,
            description: '',
            isAvailable: true,
            isVeg: true,
            category: 'Specials',
            imageUrl:
              'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
          });
          toast.success('Menu item created');
        }
        resetDraft();
      } catch {
        toast.error('Action failed');
      }
    },
    [draftName, draftPrice, editing, addMenuItem, updateMenuItem, resetDraft]
  );

  const handleConfirmDelete = useCallback(
    async (id: string) => {
      try {
        await deleteMenuItem?.(id);
        toast.success('Item deleted');
      } catch {
        toast.error('Delete failed');
      } finally {
        setConfirmId(null);
      }
    },
    [deleteMenuItem]
  );

  const sortedItems = useMemo(
    () => [...(menuItems?.data ?? [])].sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? '')),
    [menuItems?.data]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 data-[state=open]:animate-fadeIn" />
        <Dialog.Content
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col border-l border-black bg-white outline-none"
          aria-label="Admin panel"
        >
          <div className="flex items-center justify-between border-b border-black px-6 py-4">
            <Dialog.Title className="font-[Montserrat] text-lg font-medium uppercase tracking-[0.2em]">
              Admin Workbench
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center border border-black text-black transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          {!isDesktop ? (
            <div className="flex flex-1 items-center justify-center px-6 text-center font-[Poppins] text-sm text-neutral-700">
              Admin tools are available on desktop screens only.
            </div>
          ) : !auth ? (
            <form onSubmit={handleLogin} className="flex flex-1 flex-col justify-center gap-6 px-10">
              <div>
                <p className="font-[Poppins] text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Restricted Area
                </p>
                <p className="mt-2 font-[Montserrat] text-2xl">Enter admin passphrase</p>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-[Poppins] text-xs font-medium uppercase tracking-[0.18em] text-neutral-600">
                  Password
                </label>
                <input
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="h-10 border border-black px-3 font-[Poppins] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex h-10 items-center justify-center bg-[#FF6F00] px-6 font-[Poppins] text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#E65F00]"
              >
                Unlock
              </button>
            </form>
          ) : (
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-black bg-black px-6 py-3 text-white">
                <span className="font-[Poppins] text-xs uppercase tracking-[0.2em]">
                  Live Menu · {sortedItems?.length ?? 0} items
                </span>
                <button
                  type="button"
                  onClick={() => {
                    resetDraft();
                  }}
                  className="inline-flex items-center gap-2 border border-white px-3 py-1 text-xs uppercase tracking-[0.16em] transition hover:bg-white hover:text-black"
                >
                  <Plus className="h-3 w-3" />
                  New Item
                </button>
              </div>
              <div className="grid flex-1 grid-rows-[auto,1fr] gap-4 overflow-hidden px-6 py-4">
                <form onSubmit={handleSave} className="grid grid-cols-12 gap-3">
                  <input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    placeholder="Item name"
                    className="col-span-6 h-9 border border-black px-2 font-[Poppins] text-xs focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                  />
                  <input
                    value={draftPrice}
                    onChange={(e) => setDraftPrice(e.target.value)}
                    placeholder="Price"
                    className="col-span-3 h-9 border border-black px-2 font-[Poppins] text-xs focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                  />
                  <button
                    type="submit"
                    className={cn(
                      'col-span-3 inline-flex h-9 items-center justify-center bg-[#FF6F00] font-[Poppins] text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#E65F00]'
                    )}
                  >
                    {editing ? 'Save Changes' : 'Add Item'}
                  </button>
                </form>
                <div className="relative overflow-y-auto border-t border-dashed border-black pt-3">
                  <ul className="space-y-2">
                    {sortedItems?.map((item) => (
                      <li
                        key={item?.id ?? ''}
                        className="flex items-center justify-between border border-black bg-white px-3 py-2"
                      >
                        <div className="flex flex-1 flex-col">
                          <span className="font-[Poppins] text-xs font-medium">
                            {item?.name ?? 'Unnamed'}
                          </span>
                          <span className="font-[Poppins] text-[10px] text-neutral-500">
                            ₹{item?.price?.toFixed(0) ?? '0'} · {item?.category ?? 'Specials'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(item as WithId<MenuItem>)}
                            className="inline-flex h-7 w-7 items-center justify-center border border-black text-black transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmId(item?.id ?? null)}
                            className="inline-flex h-7 w-7 items-center justify-center border border-black text-black transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </li>
                    ))}
                    {sortedItems?.length === 0 && (
                      <li className="py-6 text-center font-[Poppins] text-xs text-neutral-500">
                        No menu items yet.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <AnimatePresence>
            {confirmId && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-full max-w-sm border border-black bg-white p-5 shadow-lg">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-[#FF6F00]" />
                    <h2 className="font-[Montserrat] text-sm font-semibold uppercase tracking-[0.18em]">
                      Confirm Delete
                    </h2>
                  </div>
                  <p className="mb-4 font-[Poppins] text-xs text-neutral-700">
                    This will permanently remove the menu item. Continue?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setConfirmId(null)}
                      className="border border-black px-3 py-1 text-xs font-[Poppins] uppercase tracking-[0.16em] transition hover:bg-black hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleConfirmDelete(confirmId)}
                      className="flex items-center gap-1 bg-black px-3 py-1 text-xs font-[Poppins] uppercase tracking-[0.16em] text-white transition hover:bg-[#FF6F00] hover:text-black"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AdminPanelDialog;