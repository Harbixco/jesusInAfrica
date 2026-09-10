import { Loader2 } from 'lucide-react'
import { classNames } from '../../utils/helpers'

export default function LoadingSpinner({ className = '', size = 18 }) {
  return (
    <Loader2
      size={size}
      className={classNames('animate-spin', className)}
      aria-hidden="true"
    />
  )
}
