import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/unit/$id/edit')({
  component: Page
})

function Page() {
  const { id } = Route.useParams()

  return <div>unit edit: {id}</div>
}
