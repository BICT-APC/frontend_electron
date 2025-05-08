export interface DeployList {
  deployments: Deploy[]
}

export interface Deploy {
  name: string
  status: string
  health: boolean
  pods: Pod[]
}

interface Pod {
  name: string
  status: string
  health: boolean
}
