export const Route = createLazyFileRoute('/_public')({
  component: () => (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  )
})
