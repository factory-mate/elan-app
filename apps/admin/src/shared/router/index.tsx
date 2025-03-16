import nprogress from 'nprogress'

import type { PermCode } from '@/features/perm-management/perms'

import { queryClient } from '../query-client'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0, // We use @tanstack/react-query, so we don't need to cache the data in the router.
  defaultPendingComponent: GlobalLoading,
  defaultErrorComponent: () => (
    <ErrorPage
      title="出错了"
      subTitle="🚧 请联系系统管理员"
    />
  )
})

export const getRouterStaticData = (path: string) =>
  router.matchRoutes(path, {}).at(-1)!.staticData ?? {}

// NProgress
nprogress.configure({ showSpinner: false })
router.subscribe('onBeforeLoad', ({ pathChanged }) => pathChanged && nprogress.start())
router.subscribe('onResolved', () => nprogress.done())
router.subscribe('onBeforeRouteMount', ({ toLocation }) => {
  const tabbarStore = useTabbarStore.getState()
  const { pathname } = toLocation
  if (['/login'].includes(pathname)) {
    return
  }
  if (['/403', '/404'].includes(pathname)) {
    tabbarStore.setActiveKey('')
    return
  }
  if (!tabbarStore.hasItem(pathname)) {
    tabbarStore.addItem({ label: getRouterStaticData(pathname).title, key: pathname })
  }
  tabbarStore.setActiveKey(pathname)
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface StaticDataRouteOption {
    title?: string
    authKey?: PermCode | PermCode[]
  }
}
