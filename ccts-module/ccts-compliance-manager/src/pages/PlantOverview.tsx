import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Download, Upload, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import KpiCard from '../components/common/KpiCard'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { cn } from '../lib/utils'

const mockPlantData = {
  '1': { name: 'Matampally', location: 'Telangana', status: 'warning' },
  '2': { name: 'Gudipadu', location: 'Andhra Pradesh', status: 'compliant' },
  '3': { name: 'Rajasthan Unit 1', location: 'Rajasthan', status: 'critical' },
}

const intensityData = [
  { date: 'Jan 1', intensity: 0.71, target: 0.70 },
  { date: 'Jan 8', intensity: 0.72, target: 0.70 },
  { date: 'Jan 15', intensity: 0.73, target: 0.70 },
  { date: 'Jan 22', intensity: 0.72, target: 0.70 },
  { date: 'Jan 29', intensity: 0.74, target: 0.70 },
  { date: 'Feb 5', intensity: 0.73, target: 0.70 },
  { date: 'Feb 12', intensity: 0.73, target: 0.70 },
]

const productionData = [
  { month: 'Jan', production: 45000, fuel: 12000, emissions: 31500 },
  { month: 'Feb', production: 48000, fuel: 12800, emissions: 33600 },
  { month: 'Mar', production: 46500, fuel: 12400, emissions: 32550 },
  { month: 'Apr', production: 47200, fuel: 12600, emissions: 33040 },
  { month: 'May', production: 49000, fuel: 13100, emissions: 34300 },
  { month: 'Jun', production: 48500, fuel: 12900, emissions: 33950 },
]

const recentDataLogs = [
  { id: 1, date: '2024-02-15', type: 'Production', status: 'processed', records: 1250 },
  { id: 2, date: '2024-02-14', type: 'Fuel Consumption', status: 'processed', records: 890 },
  { id: 3, date: '2024-02-13', type: 'Stack Emissions', status: 'error', records: 0 },
  { id: 4, date: '2024-02-12', type: 'Production', status: 'processed', records: 1180 },
]

export default function PlantOverview() {
  const { plantId } = useParams()
  const plant = mockPlantData[plantId as keyof typeof mockPlantData] || mockPlantData['1']
  const [activeTab, setActiveTab] = useState('intensity')

  const getStatusBanner = () => {
    switch (plant.status) {
      case 'compliant':
        return {
          color: 'bg-success text-white',
          icon: <CheckCircle className="h-5 w-5" />,
          text: 'Compliant - Meeting all targets'
        }
      case 'warning':
        return {
          color: 'bg-warning text-white',
          icon: <AlertTriangle className="h-5 w-5" />,
          text: 'Warning - Approaching target limits'
        }
      case 'critical':
        return {
          color: 'bg-error text-white',
          icon: <AlertTriangle className="h-5 w-5" />,
          text: 'Critical - Exceeding targets'
        }
      default:
        return null
    }
  }

  const statusBanner = getStatusBanner()

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      {statusBanner && (
        <div className={cn("rounded-lg p-4 flex items-center justify-between", statusBanner.color)}>
          <div className="flex items-center space-x-3">
            {statusBanner.icon}
            <span className="font-medium">{statusBanner.text}</span>
          </div>
          <Button variant="outline" size="sm" className="bg-white/20 border-white text-white hover:bg-white/30">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{plant.name}</h1>
          <p className="mt-1 text-gray-600">{plant.location} • Plant ID: {plantId}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">View Equipment</Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard
          title="Current Intensity"
          value={0.73}
          unit="tCO₂e/t"
          target={0.70}
          delta={4.3}
          deltaType="negative"
        />
        <KpiCard
          title="Monthly Production"
          value="49,000"
          unit="tonnes"
          delta={2.1}
          deltaType="positive"
        />
        <KpiCard
          title="Data Completeness"
          value="98.5"
          unit="%"
          delta={0.5}
          deltaType="positive"
        />
        <KpiCard
          title="Last Updated"
          value="2"
          unit="hours ago"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['intensity', 'dataLogs', 'equipment', 'alerts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm capitalize",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab === 'dataLogs' ? 'Data Logs' : tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'intensity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Intensity Trend" subtitle="Daily average tCO₂e/t">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={intensityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={[0.68, 0.76]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#37B77A"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="intensity"
                  stroke="#074D47"
                  strokeWidth={3}
                  dot={{ fill: '#074D47', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Production & Emissions" subtitle="Monthly totals">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="production" fill="#074D47" />
                <Bar dataKey="emissions" fill="#F5A623" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === 'dataLogs' && (
        <Card title="Recent Data Uploads">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Records
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDataLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex px-2 text-xs leading-5 font-semibold rounded-full",
                        log.status === 'processed' 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      )}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.records.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primary/80">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'equipment' && (
        <Card title="Equipment Status">
          <p className="text-gray-600">Equipment monitoring and status information will be displayed here.</p>
        </Card>
      )}

      {activeTab === 'alerts' && (
        <Card title="Plant Alerts">
          <p className="text-gray-600">Plant-specific alerts and notifications will be displayed here.</p>
        </Card>
      )}
    </div>
  )
}