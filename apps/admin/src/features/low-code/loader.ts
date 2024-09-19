import type { LoaderFnContext } from '@tanstack/react-router'

import { menusQK, type MenuVo } from '../menus'
import { lowCodeConfigQO } from './queries'

export async function loadRouteConfig(ctx: LoaderFnContext) {
  const menus = queryClient.getQueryData<MenuVo[]>(menusQK())
  const authKey = ctx.route.options.staticData?.authKey
  const modelCode = menus?.find((m) => m.cMenuCode === authKey)?.cModelCode
  if (!modelCode) {
    throw new Error('缺少配置')
  }
  await queryClient.ensureQueryData(lowCodeConfigQO(modelCode))
}
