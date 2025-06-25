import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Factory, 
  FileText, 
  ClipboardCheck, 
  Bell, 
  Settings,
  ChevronDown,
  Search,
  Upload
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Plants', href: '/plants', icon: Factory, hasSubmenu: true },
  { name: 'Credits Ledger', href: '/ledger', icon: FileText },
  { name: 'Compliance Cockpit', href: '/compliance', icon: ClipboardCheck },
  { name: 'Alerts & Reports', href: '/alerts', icon: Bell },
  { name: 'Admin / Settings', href: '/settings', icon: Settings },
]

const plants = [
  { id: '1', name: 'Matampally', location: 'Telangana' },
  { id: '2', name: 'Gudipadu', location: 'Andhra Pradesh' },
  { id: '3', name: 'Rajasthan Unit 1', location: 'Rajasthan' },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [showPlantDropdown, setShowPlantDropdown] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState(plants[0])
  const [unreadAlerts] = useState(3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Plant Picker */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary">LatSpace</span>
                <span className="ml-2 text-sm text-gray-500">CCTS Manager</span>
              </div>
              
              {/* Plant Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowPlantDropdown(!showPlantDropdown)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <Factory className="h-4 w-4" />
                  <span>{selectedPlant.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showPlantDropdown && (
                  <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {plants.map((plant) => (
                        <button
                          key={plant.id}
                          onClick={() => {
                            setSelectedPlant(plant)
                            setShowPlantDropdown(false)
                          }}
                          className={cn(
                            "block w-full px-4 py-2 text-left text-sm hover:bg-gray-100",
                            selectedPlant.id === plant.id && "bg-gray-50 font-medium"
                          )}
                        >
                          <div>{plant.name}</div>
                          <div className="text-xs text-gray-500">{plant.location}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="block w-full rounded-md border border-gray-300 bg-white py-1.5 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Alerts */}
              <Link to="/alerts" className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                {unreadAlerts > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-error rounded-full">
                    {unreadAlerts}
                  </span>
                )}
              </Link>

              {/* User Avatar */}
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm">
          <div className="px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === '/plants' && location.pathname.startsWith('/plants'))
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href === '/plants' ? `/plants/${selectedPlant.id}` : item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </Link>
                    
                    {item.hasSubmenu && isActive && (
                      <ul className="mt-2 ml-8 space-y-1">
                        <li>
                          <Link
                            to={`/plants/${selectedPlant.id}`}
                            className="block px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
                          >
                            Plant Overview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/plants/upload"
                            className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
                          >
                            <Upload className="mr-2 h-3 w-3" />
                            Data Upload Wizard
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}