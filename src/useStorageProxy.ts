import browser from 'webextension-polyfill'
import { ref } from 'vue'

export default function(initialState: { [key: string]: unknown }, areaName: 'local' | 'sync' | 'managed' | 'session') {

  const state = ref(initialState)
  const listener: (changeInfo: Record<string, browser.Storage.StorageChange>) => void = (changeInfo) => {
    const newState = { ...state.value }
    for (const key in changeInfo) {
      // detect if key in storage was deleted
      if (Object.hasOwn(changeInfo[key], 'newValue') && !Object.hasOwn(changeInfo[key], 'oldValue')) {
        delete newState[key]
      } else {
        newState[key] = changeInfo[key].newValue
      }
    }
    state.value = newState

  }
  browser.storage[areaName].onChanged.addListener(listener)
  return {
    state,
    removeListener: () => {
      browser.storage[areaName].onChanged.removeListener(listener)
    }
  }

}
