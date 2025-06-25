import { SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[]
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base'
    }

    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "appearance-none w-full rounded-md border border-gray-300 bg-white pr-10",
            "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            sizes[size],
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select