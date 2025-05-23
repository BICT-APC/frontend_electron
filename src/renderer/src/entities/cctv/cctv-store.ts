import { create } from 'zustand'
import { Area, Cctv } from '../../shared/types/cctv'
import { devtools } from 'zustand/middleware'

interface CctvStore {
  cctvList: Cctv[]
  areaList: Area[]

  setCctvList: (cctvList: Cctv[]) => void
  setAreaList: (areaList: Area[]) => void
}

export const cctvStore = create<CctvStore>()(
  devtools(
    (set) => ({
      cctvList: [],
      areaList: [],

      setCctvList: (cctvList: Cctv[]) => set({ cctvList: cctvList }),
      setAreaList: (areaList: Area[]) => set({ areaList: areaList })
    }),
    { name: 'CCTVStore' }
  )
)
