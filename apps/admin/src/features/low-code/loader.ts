import type { LoaderFnContext } from '@tanstack/react-router'

import { defaultPageParams } from '../pagination'
import { lowCodeConfigQO, lowCodePageQueryQO } from './queries'

export async function loadRouteConfig(ctx: LoaderFnContext) {
  const modelCode = ctx.route.options.staticData?.modelCode
  if (!modelCode) {
    throw new Error('缺少布局配置')
  }

  const { api } = (await queryClient.ensureQueryData(lowCodeConfigQO(modelCode)))?.table ?? {}
  const { httpType: method, url } = api ?? {}

  if (method && url) {
    await queryClient.prefetchQuery(
      lowCodePageQueryQO(
        {
          method,
          url
        },
        defaultPageParams
      )
    )
  } else {
    // eslint-disable-next-line no-console
    console.warn('缺少接口配置')
  }
}
