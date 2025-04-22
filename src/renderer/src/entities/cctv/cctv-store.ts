import { create } from 'zustand'
import { Cctv } from '../../shared/types/cctv'

interface CctvStore {
  cctvList: Cctv[]
  setCctvList: (cctvList: Cctv[]) => void
}

export const cctvStore = create<CctvStore>((set) => ({
  cctvList: [],
  setCctvList: (cctvList: Cctv[]) => set({ cctvList: cctvList })
}))
