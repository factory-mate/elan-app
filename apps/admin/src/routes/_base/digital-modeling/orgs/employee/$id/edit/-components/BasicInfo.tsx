import * as Dicts from '@/features/dicts'
import * as Department from '@/features/digital-modeling/orgs/department'
import * as Employee from '@/features/digital-modeling/orgs/employee'
import { type EmployeeVo } from '@/features/digital-modeling/orgs/employee'

export default function BasicInfo() {
  const [form] = Form.useForm<EmployeeVo>()

  const tabbarStore = useTabbarStore()
  const navigate = useNavigate()
  const match = useMatch({ from: '/_base/digital-modeling/orgs/employee/$id/edit' })

  const { data: detailData } = useSuspenseQuery(Employee.detailQO(match.params.id))
  const { data: deptTreeData } = useQuery(Department.treeQO())
  const { data: positionCandidates } = useQuery(Dicts.fullListQO('cProfessionalTypeCode'))

  const editMutation = Employee.useEditMutation()

  useEffect(() => {
    if (detailData) {
      form.setFieldsValue(detailData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailData])

  return (
    <Form
      style={{ width: '500px', margin: '0 auto' }}
      layout="vertical"
      form={form}
      onFinish={(values) =>
        editMutation.mutate(
          { ...detailData, ...values },
          {
            onSuccess: () => {
              navigate({ to: '/digital-modeling/orgs/employee' })
              tabbarStore.removeItem(match.fullPath)
            }
          }
        )
      }
    >
      <Form.Item<EmployeeVo>
        name="cEmployeeName"
        label="姓名"
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Input placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item<EmployeeVo>
        name="cEmployeeCode"
        label="账号"
      >
        <Input readOnly />
      </Form.Item>

      <Form.Item<EmployeeVo>
        name="cDepCode"
        label="部门"
        rules={[{ required: true, message: '请选择部门' }]}
      >
        <TreeSelect
          treeData={deptTreeData ?? []}
          fieldNames={Department.departmentTreeSelectFieldNames}
          allowClear
          placeholder="请选择部门"
        />
      </Form.Item>

      <Form.Item<EmployeeVo>
        name="cProfessionalTypeCode"
        label="职务"
        rules={[{ required: true, message: '请选择职务' }]}
      >
        <Select
          options={positionCandidates ?? []}
          fieldNames={Dicts.dictSelectFieldNames}
          placeholder="请选择职务"
        />
      </Form.Item>

      <Form.Item<EmployeeVo>
        name="cMobile"
        label="手机"
        rules={[{ required: true, message: '请输入手机' }]}
      >
        <Input placeholder="请输入手机" />
      </Form.Item>

      <Form.Item<EmployeeVo>
        name="cMeil"
        label="邮箱"
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item<EmployeeVo>
        name="cWeChat"
        label="微信"
      >
        <Input placeholder="请输入微信" />
      </Form.Item>

      <Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={editMutation.isPending}
          disabled={editMutation.isPending}
        >
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}
