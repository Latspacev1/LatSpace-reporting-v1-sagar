import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/common/Layout'
import Dashboard from './pages/Dashboard'
import PlantOverview from './pages/PlantOverview'
import DataUpload from './pages/DataUpload'
import CCCLedger from './pages/CCCLedger'
import ComplianceCockpit from './pages/ComplianceCockpit'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plants/:plantId" element={<PlantOverview />} />
            <Route path="/plants/upload" element={<DataUpload />} />
            <Route path="/ledger" element={<CCCLedger />} />
            <Route path="/compliance" element={<ComplianceCockpit />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
