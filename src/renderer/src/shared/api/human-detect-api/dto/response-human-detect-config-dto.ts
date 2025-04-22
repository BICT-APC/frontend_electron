export interface ResponseHumanDetectConfigDto {
  id: number
  rtspUrl: string
  cctvId: number
  conf: number
  iou: number
  imgsz: number
  roiList: RoiDto[]
}

export interface RoiDto {
  id: number
  roi: RoiPointsDto[]
}

export interface RoiPointsDto {
  id: number
  x: number
  y: number
  orderIndex: number
}
