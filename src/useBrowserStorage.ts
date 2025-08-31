import { computed, inject, Ref, WritableComputedRef } from 'vue'
import browser from 'webextension-polyfill'
import { injectionKey } from './constants'

/**
 * @overview
 *
 * Composabled function that is intended to be used in vue component
 * Provides a reactive wrapper upon coupon engine properties and methods
 * Incapsulate some reusable logic (like subscribtion to data changes)
 */
export function useBrowserStorage<T>(key: string): WritableComputedRef<T | undefined> {
  const state = inject<Ref<{ [key: string]: T }>>(injectionKey)!

  return computed({
    get: () => state?.value?.[key] as T | undefined,
    set: (newValue: T) => {
      browser.storage.local.set({ [key]: newValue })
    },
  })
}
