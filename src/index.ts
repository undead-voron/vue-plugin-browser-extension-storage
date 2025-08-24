import useStorageProxy from './useStorageProxy'
import { type Plugin, UnwrapNestedRefs, UnwrapRef, computed, unref } from 'vue'
import browser from 'webextension-polyfill'
import { injectionKey } from './constants'

export { useBrowserStorage } from './useBrowserStorage'

export const createPlugin = async (): Promise<Plugin> => {

  const areaName: 'local' | 'sync' | 'managed' | 'session' = 'local'
  // @ts-ignore
  const initialStateKeys: string[] = await browser.storage[areaName].getKeys()

  if (!initialStateKeys) {
    throw new Error('local storage is not set')
  }
  const initialState = await browser.storage[areaName].get(initialStateKeys)

  const check = useStorageProxy(initialState, areaName)

  console.log('check it ', check)
  return (app) => {
    const { state: proxy } = useStorageProxy(initialState, areaName)
    app.provide(injectionKey, proxy)
  }
}
