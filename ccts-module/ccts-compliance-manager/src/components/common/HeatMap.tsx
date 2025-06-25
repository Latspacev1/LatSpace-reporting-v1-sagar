import { cn } from '../../lib/utils'
import { Info } from 'lucide-react'

interface HeatMapData {
  id: string
  name: string
  value: number
  target: number
  variance: number
}

interface HeatMapProps {
  data: HeatMapData[]
  onCellClick?: (item: HeatMapData) => void
  className?: string
}

export default function HeatMap({ data, onCellClick, className }: HeatMapProps) {
  const getVarianceColor = (variance: number) => {
    if (variance > 5) return 'bg-error text-white'
    if (variance > 2) return 'bg-warning text-white'
    if (variance >= -2) return 'bg-success text-white'
    return 'bg-gray-200 text-gray-700'
  }

  const getVarianceText = (variance: number) => {
    if (variance > 0) return `+${variance}% over`
    if (variance < 0) return `${Math.abs(variance)}% under`
    return 'On target'
  }

  return (
    <div className={cn("bg-white rounded-card shadow-card p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Plant Performance Heat Map</h3>
        <Info className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => onCellClick?.(item)}
            className={cn(
              "p-4 rounded-lg transition-all hover:scale-105 hover:shadow-md cursor-pointer",
              getVarianceColor(item.variance)
            )}
          >
            <div className="text-left">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm mt-1">{getVarianceText(item.variance)}</p>
              <div className="mt-2 text-xs opacity-90">
                <p>Current: {item.value.toFixed(2)}</p>
                <p>Target: {item.target.toFixed(2)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}