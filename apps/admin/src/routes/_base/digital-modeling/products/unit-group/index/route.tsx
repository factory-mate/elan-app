import { listQO } from '@/features/digital-modeling/products/unit'
import { defaultPageDto } from '@/features/pagination'

export const Route = createFileRoute('/_base/digital-modeling/products/unit-group/')({
  staticData: {
    title: '单位组档案'
  },
  loader: async () => {
    await queryClient.prefetchQuery(listQO(defaultPageDto))
  }
})
