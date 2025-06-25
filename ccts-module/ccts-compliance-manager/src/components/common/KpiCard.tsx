import { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../lib/utils'

interface KpiCardProps {
  title: string
  value: string | number
  unit?: string
  delta?: number
  deltaType?: 'positive' | 'negative' | 'neutral'
  target?: string | number
  trendData?: number[]
  icon?: ReactNode
  className?: string
}

export default function KpiCard({
  title,
  value,
  unit,
  delta,
  deltaType = 'neutral',
  target,
  icon,
  className
}: KpiCardProps) {
  const getDeltaColor = () => {
    switch (deltaType) {
      case 'positive':
        return 'text-success'
      case 'negative':
        return 'text-error'
      default:
        return 'text-gray-500'
    }
  }

  const getDeltaIcon = () => {
    if (!delta) return null
    
    if (delta > 0) return <TrendingUp className="h-4 w-4" />
    if (delta < 0) return <TrendingDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  return (
    <div className={cn("bg-white rounded-card shadow-card p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
          </div>
          
          {delta !== undefined && (
            <div className={cn("mt-2 flex items-center text-sm", getDeltaColor())}>
              {getDeltaIcon()}
              <span className="ml-1">{Math.abs(delta)}%</span>
              {deltaType === 'positive' && <span className="ml-1 text-gray-500">improvement</span>}
              {deltaType === 'negative' && <span className="ml-1 text-gray-500">increase</span>}
            </div>
          )}
          
          {target && (
            <p className="mt-1 text-sm text-gray-500">
              Target: {target} {unit}
            </p>
          )}
        </div>
        
        {icon && (
          <div className="ml-4 flex-shrink-0">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}