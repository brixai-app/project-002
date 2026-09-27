import React, { FormEvent, useMemo, useState } from 'react';
import * as Select from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import type { Review } from '@/types';

export type ReviewsSectionProps = {
  id?: string;
};

function getInitials(name: string): string {
  if (!name) return 'CP';
  const parts = name.trim().split(' ');
  const first = parts[0]?.[0] ?? '';
  const last = parts[1]?.[0] ?? '';
  return (first + last || first || 'CP').toUpperCase();
}

export function ReviewsSection({ id = 'reviews' }: ReviewsSectionProps) {
  const { reviewsState, addReview } = useStore();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const sortedReviews = useMemo<Review[]>(
    () =>
      [...(reviewsState?.data ?? [])].sort((a, b) => {
        const aTime =
          (a?.createdAt as any)?.seconds ??
          (a?.createdAt instanceof Date ? a.createdAt.getTime() / 1000 : 0);
        const bTime =
          (b?.createdAt as any)?.seconds ??
          (b?.createdAt instanceof Date ? b.createdAt.getTime() / 1000 : 0);
        return bTime - aTime;
      }),
    [reviewsState?.data]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error('Please add your name and a short comment.');
      return;
    }
    const numericRating = Number(rating);
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      toast.error('Please choose a rating between 1 and 5.');
      return;
    }
    setSubmitting(true);
    try {
      await addReview?.({
        name: name.trim(),
        comment: comment.trim(),
        rating: numericRating,
      });
      setName('');
      setComment('');
      setRating('5');
      toast.success('Thanks for sharing your ChillPoint moment.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      toast.error(message ?? 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id={id}
      className="relative w-full bg-[#faf9f6] py-20 px-4 sm:px-8 lg:px-16 border-t border-black"
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-12 lg:flex-row lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1 min-w-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[Montserrat] text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black">
              Voices from
              <br />
              the counter.
            </h2>
            <div className="hidden sm:flex flex-col items-end text-xs uppercase tracking-[0.2em] text-[#3D3D3D]">
              <span>Rated Fresh</span>
              <span className="font-semibold text-black">
                {(sortedReviews?.length ?? 0) > 0
                  ? `${sortedReviews?.length ?? 0} reviews`
                  : 'Be the first'}
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div
                className="flex gap-4 sm:gap-6"
                aria-label="Customer reviews"
                role="list"
              >
                {(sortedReviews?.length ?? 0) === 0 && (
                  <div className="border border-dashed border-black bg-white rounded-2xl px-6 py-8 min-w-[260px] sm:min-w-[320px] flex flex-col justify-between">
                    <p className="text-sm sm:text-base text-[#3D3D3D] leading-relaxed">
                      No reviews yet. Start the story with your first bite of a
                      classic ChillPoint burger or a loaded fries box.
                    </p>
                    <span className="mt-4 inline-flex items-center text-xs uppercase tracking-[0.2em] text-black">
                      Write a review
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </span>
                  </div>
                )}
                {sortedReviews?.map((review) => (
                  <article
                    key={review?.id ?? `${review?.name}-${review?.createdAt ?? ''}`}
                    role="listitem"
                    className="border border-black bg-white rounded-2xl px-6 py-6 min-w-[260px] sm:min-w-[320px] flex flex-col justify-between shadow-[4px_4px_0_0_#000]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full border border-black bg-[#FFEB99] flex items-center justify-center text-xs font-semibold text-black">
                          {getInitials(review?.name ?? '')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">
                            {review?.name ?? 'Guest'}
                          </p>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#3D3D3D]">
                            ChillPoint Regular
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-3.5 w-3.5',
                              (review?.rating ?? 0) > i
                                ? 'text-[#FF6F00] fill-[#FF6F00]'
                                : 'text-[#D4D4D4]'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#3D3D3D] line-clamp-4">
                      {review?.comment ?? ''}
                    </p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#3D3D3D]">
                      {review?.createdAt ? 'Recent drop' : 'Fresh off the grill'}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="w-full lg:w-[360px] xl:w-[380px]"
        >
          <div className="border border-black bg-white rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0_0_#000] flex flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#3D3D3D] mb-1">
                Tell us everything
              </p>
              <h3 className="font-[Montserrat] text-xl sm:text-2xl text-black tracking-tight">
                How was your last ChillPoint run?
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="review-name"
                  className="text-xs font-medium uppercase tracking-[0.18em] text-black"
                >
                  Name
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First name or nickname"
                  className="h-9 px-3 border border-black rounded-md text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  required
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-1.5">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-black">
                    Rating
                  </span>
                  <Select.Root
                    onValueChange={(value) => setRating(value)}
                    defaultValue={rating}
                  >
                    <Select.Trigger
                      className="inline-flex items-center justify-between w-full h-9 px-3 border border-black rounded-md text-sm bg-white outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      aria-label="Rating"
                    >
                      <span>{rating} / 5</span>
                    </Select.Trigger>
                    <Select.Content className="min-w-[120px] bg-white border border-black rounded-md shadow-lg">
                      {[5, 4, 3, 2, 1].map((value) => (
                        <Select.Item
                          key={value}
                          value={String(value)}
                          className="flex items-center justify-between px-3 py-1.5 text-sm cursor-pointer hover:bg-[#FFEB99] focus:bg-[#FFEB99] outline-none"
                        >
                          <span>{value} / 5</span>
                          <div className="flex">
                            {Array.from({ length: value }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 text-[#FF6F00] fill-[#FF6F00]"
                              />
                            ))}
                          </div>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="review-comment"
                  className="text-xs font-medium uppercase tracking-[0.18em] text-black"
                >
                  Comment
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="The crunch, the spice, the vibe — we want every detail."
                  rows={4}
                  className="px-3 py-2 border border-black rounded-md text-sm resize-none outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F00] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  'mt-1 inline-flex items-center justify-center h-10 px-5 text-xs font-semibold uppercase tracking-[0.22em] border border-black rounded-md bg-[#FF6F00] text-black transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-black',
                  submitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#E65F00]'
                )}
              >
                {submitting ? 'Sending...' : 'Submit review'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ReviewsSection;