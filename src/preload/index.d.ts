import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronToken: {
      setToken: (token: string) => void
      getToken: () => Promise<string | null>
      clearToken: () => void
    }
  }
}
