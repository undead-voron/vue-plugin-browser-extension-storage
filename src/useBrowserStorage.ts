import { computed, ComputedRef, inject } from 'vue'
import browser from 'webextension-polyfill'
import { injectionKey } from './constants'

/**
 * @overview
 *
 * Composabled function that is intended to be used in vue component
 * Provides a reactive wrapper upon coupon engine properties and methods
 * Incapsulate some reusable logic (like subscribtion to data changes)
 */
export function useBrowserStorage<T>(key: string): ComputedRef<T> {
  const state = inject(injectionKey)!

  return computed({
    get: () => state[key as keyof typeof state] as T,
    set: (newValue: T) => {
      browser.storage.local.set({ key: newValue })
    },
  })
}
