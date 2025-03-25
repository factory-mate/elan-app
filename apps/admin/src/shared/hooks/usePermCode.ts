interface UsePermCodeOptions {
  matchAll?: boolean
}

/**
 * 是否满足权限代码
 * @param codes 权限代码
 * @param options 选项
 * @example
 * ```ts
 * const hasCode = usePermCode('users:add') // 是否有 users:add 权限
 * const hasCode = usePermCode(['users:add', 'users:delete']) // 是否有 users:add 或 users:delete 权限
 * const hasCode = usePermCode(['users:add', 'users:delete'], { matchAll: true }) // 是否有 users:add 和 users:delete 权限
 */
export const usePermCode = (codes?: PermCode | PermCode[], options?: UsePermCodeOptions) => {
  const { matchAll } = options ?? {}

  const permStore = usePermStore()

  const hasCode = useMemo(() => {
    if (!codes) {
      return true
    }
    if (Array.isArray(codes)) {
      return matchAll ? permStore.hasAllCode(...codes) : permStore.hasCode(...codes)
    }
    return permStore.hasCode(codes)
  }, [codes, matchAll, permStore])

  return hasCode
}
