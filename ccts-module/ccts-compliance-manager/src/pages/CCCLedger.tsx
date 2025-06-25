import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { 
  Plus, 
  Download, 
  Upload, 
  Filter,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  Search
} from 'lucide-react'
import type {
  SortingState,
  ColumnFiltersState
} from '@tanstack/react-table'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import { cn } from '../lib/utils'
import type { CCCTransaction } from '../types/index.js'

// Mock data
const mockTransactions: CCCTransaction[] = [
  {
    id: '1',
    date: '2024-02-15',
    type: 'purchase',
    quantity: 5000,
    price: 45.50,
    plantId: '1',
    description: 'Q1 2024 compliance purchase',
    evidence: 'invoice_2024_001.pdf'
  },
  {
    id: '2',
    date: '2024-02-10',
    type: 'transfer',
    quantity: 1500,
    plantId: '2',
    description: 'Transfer to Gudipadu plant',
  },
  {
    id: '3',
    date: '2024-01-28',
    type: 'sale',
    quantity: 2000,
    price: 48.00,
    description: 'Excess credits sale',
    evidence: 'sale_receipt_2024_001.pdf'
  },
  {
    id: '4',
    date: '2024-01-15',
    type: 'purchase',
    quantity: 3000,
    price: 44.00,
    plantId: '3',
    description: 'Emergency purchase for Rajasthan unit',
  },
  {
    id: '5',
    date: '2024-01-05',
    type: 'expiry',
    quantity: 500,
    description: '2021 vintage credits expired',
  },
]

// Form schema
const transactionSchema = z.object({
  type: z.enum(['purchase', 'sale', 'transfer', 'expiry']),
  date: z.string().min(1, 'Date is required'),
  quantity: z.number().min(1, 'Quantity must be greater than 0'),
  price: z.number().optional(),
  plantId: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
})

type TransactionFormData = z.infer<typeof transactionSchema>

const columnHelper = createColumnHelper<CCCTransaction>()

export default function CCCLedger() {
  const [transactions] = useState(mockTransactions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema)
  })

  const transactionType = watch('type')

  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => format(new Date(info.getValue()), 'MMM dd, yyyy'),
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (info) => {
          const type = info.getValue()
          const styles = {
            purchase: 'bg-green-100 text-green-800',
            sale: 'bg-blue-100 text-blue-800',
            transfer: 'bg-yellow-100 text-yellow-800',
            expiry: 'bg-red-100 text-red-800',
          }
          return (
            <span className={cn(
              "inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize",
              styles[type]
            )}>
              {type}
            </span>
          )
        },
      }),
      columnHelper.accessor('quantity', {
        header: 'Quantity',
        cell: (info) => {
          const type = info.row.original.type
          const qty = info.getValue()
          const isNegative = type === 'sale' || type === 'expiry' || type === 'transfer'
          return (
            <div className={cn("font-medium", isNegative ? "text-red-600" : "text-green-600")}>
              {isNegative ? '-' : '+'}{qty.toLocaleString()} tCO₂e
            </div>
          )
        },
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: (info) => {
          const price = info.getValue()
          return price ? `₹${price.toFixed(2)}` : '-'
        },
      }),
      columnHelper.accessor('description', {
        header: 'Description',
      }),
      columnHelper.accessor('evidence', {
        header: 'Evidence',
        cell: (info) => {
          const evidence = info.getValue()
          return evidence ? (
            <button className="text-primary hover:text-primary/80 flex items-center text-sm">
              <FileText className="h-4 w-4 mr-1" />
              View
            </button>
          ) : (
            <button className="text-gray-400 hover:text-gray-600 text-sm">
              Attach
            </button>
          )
        },
      }),
    ],
    []
  )

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const onSubmit = (data: TransactionFormData) => {
    console.log('New transaction:', data)
    setIsModalOpen(false)
    reset()
  }

  // Calculate summary metrics
  const summary = useMemo(() => {
    const purchases = transactions
      .filter(t => t.type === 'purchase')
      .reduce((sum, t) => sum + t.quantity, 0)
    
    const sales = transactions
      .filter(t => t.type === 'sale')
      .reduce((sum, t) => sum + t.quantity, 0)
    
    const transfers = transactions
      .filter(t => t.type === 'transfer')
      .reduce((sum, t) => sum + t.quantity, 0)
    
    const expired = transactions
      .filter(t => t.type === 'expiry')
      .reduce((sum, t) => sum + t.quantity, 0)
    
    const balance = purchases - sales - transfers - expired
    
    const avgPurchasePrice = transactions
      .filter(t => t.type === 'purchase' && t.price)
      .reduce((acc, t) => {
        acc.total += t.price! * t.quantity
        acc.quantity += t.quantity
        return acc
      }, { total: 0, quantity: 0 })
    
    return {
      balance,
      purchases,
      sales,
      transfers,
      expired,
      avgPrice: avgPurchasePrice.quantity > 0 
        ? avgPurchasePrice.total / avgPurchasePrice.quantity 
        : 0
    }
  }, [transactions])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CCC Ledger</h1>
          <p className="mt-1 text-gray-600">Track and manage Carbon Credit Certificates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Balance</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {summary.balance.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">tCO₂e</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Purchased</p>
              <p className="mt-1 text-2xl font-semibold text-green-600">
                +{summary.purchases.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">tCO₂e</p>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <Plus className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Used/Sold</p>
              <p className="mt-1 text-2xl font-semibold text-red-600">
                -{(summary.sales + summary.transfers + summary.expired).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">tCO₂e</p>
            </div>
            <div className="rounded-full bg-red-100 p-3 text-red-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Purchase Price</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ₹{summary.avgPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">per tCO₂e</p>
            </div>
            <div className="rounded-full bg-gray-100 p-3 text-gray-600">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select
            options={[
              { value: '', label: 'All Types' },
              { value: 'purchase', label: 'Purchase' },
              { value: 'sale', label: 'Sale' },
              { value: 'transfer', label: 'Transfer' },
              { value: 'expiry', label: 'Expiry' },
            ]}
            value={(columnFilters.find(f => f.id === 'type')?.value as string) || ''}
            onChange={(e) => {
              const value = e.target.value
              setColumnFilters(prev =>
                value
                  ? [...prev.filter(f => f.id !== 'type'), { id: 'type', value }]
                  : prev.filter(f => f.id !== 'type')
              )
            }}
          />
          <Select
            options={[
              { value: '', label: 'All Plants' },
              { value: '1', label: 'Matampally' },
              { value: '2', label: 'Gudipadu' },
              { value: '3', label: 'Rajasthan Unit 1' },
            ]}
            value={(columnFilters.find(f => f.id === 'plantId')?.value as string) || ''}
            onChange={(e) => {
              const value = e.target.value
              setColumnFilters(prev =>
                value
                  ? [...prev.filter(f => f.id !== 'plantId'), { id: 'plantId', value }]
                  : prev.filter(f => f.id !== 'plantId')
              )
            }}
          />
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              transactions.length
            )}{' '}
            of {transactions.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          reset()
        }}
        title="Add CCC Transaction"
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Type
              </label>
              <Select
                {...register('type')}
                options={[
                  { value: 'purchase', label: 'Purchase' },
                  { value: 'sale', label: 'Sale' },
                  { value: 'transfer', label: 'Transfer' },
                  { value: 'expiry', label: 'Expiry' },
                ]}
                placeholder="Select type"
              />
              {errors.type && (
                <p className="mt-1 text-sm text-error">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Input
                type="date"
                {...register('date')}
                error={!!errors.date}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-error">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (tCO₂e)
              </label>
              <Input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                error={!!errors.quantity}
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-error">{errors.quantity.message}</p>
              )}
            </div>

            {(transactionType === 'purchase' || transactionType === 'sale') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per tCO₂e (₹)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                />
              </div>
            )}

            {transactionType === 'transfer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plant
                </label>
                <Select
                  {...register('plantId')}
                  options={[
                    { value: '1', label: 'Matampally' },
                    { value: '2', label: 'Gudipadu' },
                    { value: '3', label: 'Rajasthan Unit 1' },
                  ]}
                  placeholder="Select plant"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-error">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Evidence
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                reset()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}