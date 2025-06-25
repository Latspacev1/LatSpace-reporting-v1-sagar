import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingDown, Package, Calendar, AlertCircle } from 'lucide-react'
import KpiCard from '../components/common/KpiCard'
import HeatMap from '../components/common/HeatMap'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const mockKpiData = {
  avgIntensity: { value: 0.73, target: 0.70, delta: 4.3 },
  projectedSurplus: { value: -2500, unit: 'tCO₂e' },
  cccsBanked: { value: 15000, unit: 't' },
  daysToFiling: { value: 34 }
}

const mockPlantData = [
  { id: '1', name: 'Matampally', value: 0.73, target: 0.70, variance: 4.3 },
  { id: '2', name: 'Gudipadu', value: 0.69, target: 0.70, variance: -1.4 },
  { id: '3', name: 'Rajasthan Unit 1', value: 0.75, target: 0.70, variance: 7.1 },
  { id: '4', name: 'Karnataka Plant', value: 0.68, target: 0.70, variance: -2.9 },
  { id: '5', name: 'Tamil Nadu Facility', value: 0.72, target: 0.70, variance: 2.9 },
]

const creditBalanceData = [
  { month: 'Jan', purchases: 5000, sales: 2000, balance: 18000 },
  { month: 'Feb', purchases: 3000, sales: 1500, balance: 19500 },
  { month: 'Mar', purchases: 2000, sales: 3000, balance: 18500 },
  { month: 'Apr', purchases: 4000, sales: 1000, balance: 21500 },
  { month: 'May', purchases: 1000, sales: 2500, balance: 20000 },
  { month: 'Jun', purchases: 3000, sales: 1000, balance: 22000 },
]

const forecastData = [
  { month: 'Jul', actual: 0.73, forecast: 0.73, upperBound: 0.75, lowerBound: 0.71 },
  { month: 'Aug', actual: null, forecast: 0.72, upperBound: 0.74, lowerBound: 0.70 },
  { month: 'Sep', actual: null, forecast: 0.71, upperBound: 0.73, lowerBound: 0.69 },
  { month: 'Oct', actual: null, forecast: 0.70, upperBound: 0.72, lowerBound: 0.68 },
  { month: 'Nov', actual: null, forecast: 0.69, upperBound: 0.71, lowerBound: 0.67 },
  { month: 'Dec', actual: null, forecast: 0.68, upperBound: 0.70, lowerBound: 0.66 },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('current')

  const handlePlantClick = (plant: any) => {
    navigate(`/plants/${plant.id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CCTS Compliance Dashboard</h1>
          <p className="mt-1 text-gray-600">Company-wide emissions and credit overview</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Export Report</Button>
          <Button size="sm">Add Data</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Average Intensity vs Target"
          value={mockKpiData.avgIntensity.value}
          unit="tCO₂e/t"
          target={mockKpiData.avgIntensity.target}
          delta={mockKpiData.avgIntensity.delta}
          deltaType="negative"
          icon={<TrendingDown className="h-5 w-5" />}
        />
        <KpiCard
          title="Projected Surplus/Deficit"
          value={mockKpiData.projectedSurplus.value.toLocaleString()}
          unit={mockKpiData.projectedSurplus.unit}
          deltaType={mockKpiData.projectedSurplus.value < 0 ? "negative" : "positive"}
          icon={<AlertCircle className="h-5 w-5" />}
        />
        <KpiCard
          title="CCCs Banked"
          value={mockKpiData.cccsBanked.value.toLocaleString()}
          unit={mockKpiData.cccsBanked.unit}
          icon={<Package className="h-5 w-5" />}
        />
        <KpiCard
          title="Days to Filing Deadline"
          value={mockKpiData.daysToFiling.value}
          unit="days"
          icon={<Calendar className="h-5 w-5" />}
        />
      </div>

      {/* Heat Map and Credit Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HeatMap 
            data={mockPlantData} 
            onCellClick={handlePlantClick}
          />
        </div>
        
        <Card title="Credit Balance Trend" className="h-full">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={creditBalanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#074D47" 
                strokeWidth={2}
                dot={{ fill: '#074D47', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Forecast Chart */}
      <Card 
        title="Emissions Intensity Forecast" 
        subtitle="95% confidence interval shown in shaded area"
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#074D47" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#074D47" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis domain={[0.65, 0.76]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="upperBound"
              stackId="1"
              stroke="none"
              fill="url(#colorConfidence)"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stackId="2"
              stroke="none"
              fill="white"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#074D47"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#074D47"
              strokeWidth={3}
              dot={{ fill: '#074D47', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}