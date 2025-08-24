import type { Plugin } from 'vue'
import { computed, unref, UnwrapNestedRefs, UnwrapRef } from 'vue'
import browser from 'webextension-polyfill'
import { injectionKey } from './constants'
import useStorageProxy from './useStorageProxy'

export { useBrowserStorage } from './useBrowserStorage'

export async function createPlugin(): Promise<Plugin> {
  const areaName: 'local' | 'sync' | 'managed' | 'session' = 'local'
  // @ts-expect-error fix getKeys error
  const initialStateKeys: string[] = await browser.storage[areaName].getKeys()

  if (!initialStateKeys) {
    throw new Error('local storage is not set')
  }
  const initialState = await browser.storage[areaName].get(initialStateKeys)

  const check = useStorageProxy(initialState, areaName)

  // eslint-ignore
  console.warn('check it ', check)
  return (app) => {
    const { state: proxy } = useStorageProxy(initialState, areaName)
    app.provide(injectionKey, proxy)
  }
}
