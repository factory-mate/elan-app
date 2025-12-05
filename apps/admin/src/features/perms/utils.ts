interface CheckCodeOptions {
  matchAll?: boolean
}

/**
 * 是否满足权限代码
 * @param codes 权限代码
 * @param options 选项
 * @example
 * ```ts
 * const hasCode = Perms.checkCode('users:add') // 是否有 users:add 权限
 * const hasCode = Perms.checkCode(['users:add', 'users:delete']) // 是否有 users:add 或 users:delete 权限
 * const hasCode = Perms.checkCode(['users:add', 'users:delete'], { matchAll: true }) // 是否有 users:add 和 users:delete 权限
 */
export const checkCode = (codes?: PermCode | PermCode[], options?: CheckCodeOptions): boolean => {
  const { matchAll } = options ?? {}

  if (!codes) {
    return true
  }

  if (Array.isArray(codes)) {
    return matchAll
      ? usePermStore.getState().hasAllCode(...codes)
      : usePermStore.getState().hasCode(...codes)
  }

  return usePermStore.getState().hasCode(codes)
}
