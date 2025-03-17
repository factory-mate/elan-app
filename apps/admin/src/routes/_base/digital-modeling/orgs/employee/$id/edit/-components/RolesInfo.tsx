import type { FormProps } from 'antd'

import * as Employee from '@/features/digital-modeling/orgs/employee'
import * as Role from '@/features/perm-management/roles'

interface FormValues {
  cRoleCode: string[]
}

export default function RolesInfo() {
  const [form] = Form.useForm<FormValues>()

  const match = useMatch({ from: '/_base/digital-modeling/orgs/employee/$id/edit' })

  const { data: detailData } = useSuspenseQuery(Employee.detailQO(match.params.id))
  const { data: roleCandidates } = useQuery(Role.fullListQO())
  const { data: userRoleData } = useQuery(
    Role.userRoleFullListQO({
      conditions: `cLoginName=${detailData?.cEmployeeCode}`
    })
  )

  const batchAddMutation = Role.useBatchAddMutation()

  const onFinish: FormProps<FormValues>['onFinish'] = (values) =>
    batchAddMutation.mutate({
      Items: values.cRoleCode.map((i) => ({ cRoleCode: i, cLoginName: detailData?.cEmployeeCode }))
    })

  useEffect(() => {
    if (userRoleData) {
      form.setFieldValue(
        'cRoleCode',
        userRoleData.map((i) => i.cRoleCode)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRoleData])

  return (
    <Form
      style={{ width: '500px', margin: '0 auto' }}
      layout="vertical"
      form={form}
      labelCol={{ span: 6 }}
      initialValues={{
        cRoleCode: []
      }}
      onFinish={onFinish}
    >
      <Form.Item<FormValues>
        name="cRoleCode"
        label="角色"
      >
        <Select
          mode="multiple"
          options={roleCandidates ?? []}
          fieldNames={{
            label: 'cRoleName',
            value: 'cRoleCode'
          }}
          allowClear
          placeholder="请选择角色"
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={batchAddMutation.isPending}
          disabled={batchAddMutation.isPending}
        >
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}
