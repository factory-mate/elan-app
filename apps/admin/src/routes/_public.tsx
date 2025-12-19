import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
  beforeLoad: () => {
    if (AuthUtils.isAuthenticated()) {
      throw redirect({
        to: '/$',
        replace: true
      })
    }
  }
})

function RouteComponent() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  )
}
