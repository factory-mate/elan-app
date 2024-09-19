import { loadRouteConfig } from '@/features/low-code'

export const Route = createFileRoute('/_base/digital-modeling/products/unit-group')({
  staticData: {
    title: '单位组档案',
    authKey: '300300301'
  },
  loader: async (ctx) => loadRouteConfig(ctx)
})
