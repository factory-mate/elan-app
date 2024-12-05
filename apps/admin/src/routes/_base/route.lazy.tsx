import { BaseLayout } from '@/features/layouts'

export const Route = createLazyFileRoute('/_base')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
