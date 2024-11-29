import type { Dispatch, SetStateAction } from 'react'

export interface UseModalProps<T> {
  /**
   * 模态框元数据
   */
  meta: T
  /**
   * 模态框初始化打开状态
   */
  open?: boolean
}

export interface UseModal<T = any> {
  /**
   * 模态框当前打开状态
   * @default false
   */
  open: boolean
  /**
   * 设置模态框打开状态
   */
  setOpen: Dispatch<SetStateAction<boolean>>
  /**
   * 切换模态框打开状态
   */
  toggle: () => void
  /**
   * 模态框元数据
   */
  meta?: T
  /**
   * 设置模态框元数据
   */
  setMeta: Dispatch<SetStateAction<T | undefined>>
  /**
   * 重置模态框元数据
   */
  resetMeta: () => void
  /**
   * 关闭模态框
   */
  close: () => void
}

export const useModal = <T = any>(props?: UseModalProps<T>): UseModal<T> => {
  const { meta: defaultMeta, open: defaultValue = false } = props ?? {}

  const [meta, setMeta] = useState<T | undefined>(defaultMeta)
  const [open, setOpen] = useState(defaultValue)

  const toggle = useCallback(() => setOpen((prev) => !prev), [])

  const resetMeta = useCallback(() => setMeta(defaultMeta), [defaultMeta])

  const close = useCallback(() => setOpen(false), [])

  return {
    open,
    setOpen,
    toggle,
    meta,
    setMeta,
    resetMeta,
    close
  }
}
