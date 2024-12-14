export const Route = createLazyFileRoute('/_base/production-plan/production-order/$id/edit')({
  component: RouteComponent
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <div>{id}</div>
}
