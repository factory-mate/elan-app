// import { flattenMenus, menusQO } from '@/features/menus'

export const Route = createFileRoute('/_base')({
  beforeLoad: async (ctx) => {
    const { location } = ctx
    if (!AuthUtils.isAuthenticated()) {
      throw redirect({
        to: '/login',
        replace: true,
        search: {
          redirect: location.pathname === '/' ? undefined : location.pathname
        }
      })
    }
    // TODO: 页面跳转鉴权
    // const menus = flattenMenus(await queryClient.ensureQueryData(menusQO()))
    // const authKey = ctx.matches.at(-1)?.staticData.authKey
    // if (authKey) {
    //   if (!menus.some((menu) => menu.cMenuCode === authKey)) {
    //     throw redirect({
    //       to: '/403',
    //       replace: true
    //     })
    //   }
    // }
  }
})
