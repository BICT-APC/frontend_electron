export interface DeployListDto {
  deployments: DeployDto[]
}

export interface DeployDto {
  name: string
  status: string
  health: boolean
  pods: PodDto[]
}

interface PodDto {
  name: string
  status: string
  health: boolean
}
