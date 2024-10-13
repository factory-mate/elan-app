import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/unit/add')({
  component: Page
})

function Page() {
  return <div>unit add</div>
}
