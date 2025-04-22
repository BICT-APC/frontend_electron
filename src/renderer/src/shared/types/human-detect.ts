export interface HumanDetectConfig {
  cctvId: number
  conf: number
  iou: number
  imgsz: number
  roiList: Roi[]
}

export interface Roi {
  roi: RoiPoints[]
}

export interface RoiPoints {
  x: number
  y: number
  orderIndex: number
}
