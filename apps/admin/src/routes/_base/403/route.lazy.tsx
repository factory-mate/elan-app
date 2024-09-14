export const Route = createLazyFileRoute('/_base/403')({
  component: () => (
    <ErrorPage
      title="403 没有权限访问"
      subTitle="请联系系统管理员"
    />
  )
})
