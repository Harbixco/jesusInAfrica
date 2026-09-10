import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { classNames } from '../../utils/helpers'

export default function RevealSection({ children, className = '', as: Tag = 'div' }) {
  const ref = useScrollAnimation()
  return (
    <Tag ref={ref} className={classNames('reveal', className)}>
      {children}
    </Tag>
  )
}
