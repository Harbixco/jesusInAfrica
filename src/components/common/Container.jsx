import { classNames } from '../../utils/helpers'

export default function Container({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={classNames('container', className)}>{children}</Tag>
}
