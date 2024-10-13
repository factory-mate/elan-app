export const Route = createLazyFileRoute('/_base/digital-modeling/products/unit-group/')({
  component: Page
})

function Page() {
  return (
    <PageContainer>
      <BasicTable />
    </PageContainer>
  )
}
