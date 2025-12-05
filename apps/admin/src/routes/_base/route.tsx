import * as Perms from '@/features/perms'

const getRouterStaticData = (path: string) => router.matchRoutes(path, {}).at(-1)!.staticData ?? {}

export const Route = createFileRoute('/_base')({
  beforeLoad: async (ctx) => {
    const { location } = ctx
    // 身份校验
    if (!AuthUtils.isAuthenticated()) {
      throw redirect({
        to: '/login',
        replace: true,
        search: {
          redirect: location.pathname === '/' ? undefined : location.pathname
        }
      })
    }
    // 权限校验
    const { permCode } = getRouterStaticData(location.pathname)
    if (
      permCode &&
      !usePermStore.getState().hasCode(...(Array.isArray(permCode) ? permCode : [permCode]))
    ) {
      throw redirect({
        to: '/403',
        replace: true
      })
    }
  },
  loader: async () => {
    const data = await queryClient.ensureQueryData(Perms.userPermCodesQO())
    usePermStore
      .getState()
      .setCodes(
        new Set(
          data
            .map((i) =>
              i.cOperationPath ? `${i.cMenuPath}:${i.cOperationPath}` : (i.cMenuPath ?? '')
            )
            .filter((i) => i)
        )
      )
  }
})
