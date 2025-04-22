import { create } from 'zustand'
import { Roi } from '../../../shared/types/human-detect'

interface RoiStore {
  reSizedRegion: Roi[]
  selectedPolyIndex: number | null
  creatingPolyIndex: number | null

  setReSizedRegion: (reSizedRegion: Roi[]) => void
  setSelectedPolyIndex: (selectedPolyIndex: number | null) => void
  setCreatingPolyIndex: (creatingPolyIndex: number | null) => void
}

export const roiStore = create<RoiStore>((set) => ({
  reSizedRegion: [],
  selectedPolyIndex: null,
  creatingPolyIndex: null,

  setReSizedRegion: (reSizedRegion: Roi[]) => set({ reSizedRegion: reSizedRegion }),
  setSelectedPolyIndex: (selectedPolyIndex: number | null) =>
    set({ selectedPolyIndex: selectedPolyIndex }),
  setCreatingPolyIndex: (creatingPolyIndex: number | null) =>
    set({ creatingPolyIndex: creatingPolyIndex })
}))
