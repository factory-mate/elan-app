import { fullListQO } from '@/features/dicts'

export const Route = createFileRoute('/_base/digital-modeling/products/unit-class/')({
  staticData: {
    title: '计量单位组档案',
    authKey: 'unit-class'
  },
  beforeLoad: async () => {
    await queryClient.ensureQueryData(fullListQO('UnitClassType'))
  }
})
