import type { LoaderFnContext } from '@tanstack/react-router'

import { lowCodeConfigQO } from './queries'

export async function loadRouteConfig(ctx: LoaderFnContext) {
  const modelCode = ctx.route.options.staticData?.modelCode
  if (!modelCode) {
    throw new Error('缺少配置')
  }
  await queryClient.ensureQueryData(lowCodeConfigQO(modelCode))
}
