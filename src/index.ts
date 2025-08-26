import type { Plugin } from 'vue'
import browser from 'webextension-polyfill'
import { injectionKey } from './constants'
import useStorageProxy from './useStorageProxy'

export { useBrowserStorage } from './useBrowserStorage'

export async function createPlugin(): Promise<Plugin<void>> {
  const areaName: 'local' | 'sync' | 'managed' | 'session' = 'local'
  // @ts-expect-error fix getKeys error
  const initialStateKeys: string[] = await browser.storage[areaName].getKeys()

  if (!initialStateKeys) {
    throw new Error('local storage is not set')
  }
  const initialState = await browser.storage[areaName].get(initialStateKeys)
  const { state: proxy } = useStorageProxy(initialState, areaName)
  return (app) => {
    app.provide(injectionKey, proxy)
  }
}
