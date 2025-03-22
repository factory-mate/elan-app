import type { Query } from '@tanstack/react-query'
import { MutationCache, QueryClient } from '@tanstack/react-query'

export const STALE = Object.freeze({
  SECONDS: {
    ONE: 1e3,
    TWO: 1e3 * 2,
    THREE: 1e3 * 3,
    FOUR: 1e3 * 4,
    FIVE: 1e3 * 5,
    TEN: 1e3 * 10
  },
  MINUTES: {
    HALF: (1e3 * 60) / 2,
    ONE: 1e3 * 60,
    TWO: 1e3 * 60 * 2,
    THREE: 1e3 * 60 * 3,
    FOUR: 1e3 * 60 * 4,
    FIVE: 1e3 * 60 * 5,
    TEN: 1e3 * 60 * 10
  },
  HOURS: {
    HALF: 1e3 * 60 * 30,
    ONE: 1e3 * 60 * 60,
    TWO: 1e3 * 60 * 60 * 2
  },
  INFINITY: Infinity
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE.SECONDS.FIVE,
      gcTime: STALE.MINUTES.TEN,
      retry: 1
    }
  },
  /**
   * Automatically invalidate queries after a mutation.
   * @see https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations#tie-it-to-the-mutationkey
   */

  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      // queryClient.invalidateQueries({
      //   queryKey: mutation.options.mutationKey
      // })

      const nonStaticQueries = (query: Query) => {
        const defaultStaleTime = queryClient.getQueryDefaults(query.queryKey).staleTime ?? 0
        const staleTimes = query.observers
          .map((observer) => observer.options.staleTime)
          .filter((staleTime) => staleTime !== undefined)
        const staleTime =
          query.getObserversCount() > 0 ? Math.min(...(staleTimes as number[])) : defaultStaleTime
        return staleTime !== Number.POSITIVE_INFINITY
      }

      queryClient.invalidateQueries({
        queryKey: mutation.options.mutationKey,
        predicate: nonStaticQueries
      })
    }
  })
})
