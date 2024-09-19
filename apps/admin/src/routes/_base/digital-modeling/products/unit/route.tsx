import { loadRouteConfig } from '@/features/low-code'

export const Route = createFileRoute('/_base/digital-modeling/products/unit')({
  staticData: {
    title: '单位档案',
    authKey: '300300305'
  },
  loader: async (ctx) => loadRouteConfig(ctx)
})
