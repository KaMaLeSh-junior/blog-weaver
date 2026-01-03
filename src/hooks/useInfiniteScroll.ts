import { useState, useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions<T> {
  items: T[];
  itemsPerPage?: number;
}

export function useInfiniteScroll<T>({ items, itemsPerPage = 6 }: UseInfiniteScrollOptions<T>) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Reset when items change
  useEffect(() => {
    setDisplayedItems(items.slice(0, itemsPerPage));
    setPage(1);
    setHasMore(items.length > itemsPerPage);
  }, [items, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simulate a small delay for smooth UX
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = 0;
      const endIndex = nextPage * itemsPerPage;
      const newItems = items.slice(startIndex, endIndex);
      
      setDisplayedItems(newItems);
      setPage(nextPage);
      setHasMore(endIndex < items.length);
      setIsLoading(false);
    }, 300);
  }, [items, page, itemsPerPage, isLoading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  return {
    displayedItems,
    hasMore,
    isLoading,
    loaderRef,
    totalItems: items.length,
  };
}
