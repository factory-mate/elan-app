import { BasicInfo, RolesInfo } from './-components'

export const Route = createLazyFileRoute('/_base/digital-modeling/orgs/employee/$id/edit')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Card>
      <Tabs
        items={[
          {
            key: 'basic',
            label: '基本信息',
            children: <BasicInfo />
          },
          {
            key: 'roles',
            label: '角色信息',
            children: <RolesInfo />
          }
        ]}
      />
    </Card>
  )
}
