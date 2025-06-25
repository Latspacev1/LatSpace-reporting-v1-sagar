export type Plant = {
  id: string
  name: string
  location: string
  status: 'compliant' | 'warning' | 'critical'
  currentIntensity: number
  targetIntensity: number
  variance: number
}

export type EmissionsData = {
  date: string
  production: number
  fuelConsumption: number
  emissions: number
  intensity: number
}

export type CCCTransaction = {
  id: string
  date: string
  type: 'purchase' | 'sale' | 'transfer' | 'expiry'
  quantity: number
  price?: number
  plantId?: string
  evidence?: string
  description: string
}

export type Alert = {
  id: string
  type: 'variance' | 'balance' | 'upload' | 'deadline'
  severity: 'low' | 'medium' | 'high'
  title: string
  description: string
  date: string
  status: 'unread' | 'read' | 'resolved'
  plantId?: string
}

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'sustainability' | 'finance' | 'engineer' | 'auditor'
  avatar?: string
}

export type ComplianceStatus = {
  daysToDeadline: number
  complianceProbability: number
  dataUpToDate: boolean
  ledgerBalanced: boolean
  formGenerated: boolean
}