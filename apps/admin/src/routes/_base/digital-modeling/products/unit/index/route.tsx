import { listQO } from '@/features/digital-modeling/products/unit'
import { defaultPageDto } from '@/features/pagination'

export const Route = createFileRoute('/_base/digital-modeling/products/unit/')({
  staticData: {
    title: '单位档案'
  },
  loader: async () => {
    await queryClient.ensureQueryData(listQO(defaultPageDto))
  }
})
