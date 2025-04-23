import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// 토큰 관리를 위한 API
// const electronToken = {
//   setToken: (token: string) => ipcRenderer.send('set-token', token),
//   getToken: (): Promise<string | null> => ipcRenderer.invoke('get-token'),
//   clearToken: () => ipcRenderer.send('clear-token')
// }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    // contextBridge.exposeInMainWorld('electronToken', electronToken)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.electronToken = electronToken
}
