import { Roi } from '../../../types/human-detect'

export interface RequestPutHumanDetectConfigDto {
  conf: number
  iou: number
  imgsz: number
  roiList: Roi[]
}
