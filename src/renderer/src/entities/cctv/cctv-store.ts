import { create } from 'zustand'
import { Cctv } from '../../shared/types/cctv'
import { devtools } from 'zustand/middleware'

interface CctvStore {
  cctvList: Cctv[]
  setCctvList: (cctvList: Cctv[]) => void
}

export const cctvStore = create<CctvStore>()(
  devtools((set) => ({
    cctvList: [],
    setCctvList: (cctvList: Cctv[]) => set({ cctvList: cctvList })
  }), {name: 'CCTVStore'})
)
