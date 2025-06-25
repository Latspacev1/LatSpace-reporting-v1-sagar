import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = 'md', error, ...props }, ref) => {
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base'
    }

    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md border bg-white",
          "focus:outline-none focus:ring-1",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          "placeholder:text-gray-400",
          error
            ? "border-error focus:border-error focus:ring-error"
            : "border-gray-300 focus:border-primary focus:ring-primary",
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input