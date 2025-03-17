import type { FormProps } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import type { EmployeeSetRoleDto } from '@/features/digital-modeling/orgs/employee'
import * as Employee from '@/features/digital-modeling/orgs/employee'
import type { RoleBatchAddItemDto } from '@/features/perm-management/roles'
import * as Role from '@/features/perm-management/roles'

import type { EditRoleModalMeta } from '../-types'

interface EditRoleModalProps {
  meta?: EditRoleModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditRoleModal(props: EditRoleModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<EmployeeSetRoleDto>()

  const { data: employeeCandidates } = useQuery(Employee.fullListQO())
  const { data: roleCandidates } = useQuery(Role.fullListQO())

  const batchAddMutation = Role.useBatchAddMutation()

  const onFinish: FormProps<EmployeeSetRoleDto>['onFinish'] = (values) => {
    const items: RoleBatchAddItemDto[] = []
    const userRoleList = values.cLoginName.map((i) => ({
      cLoginName: i,
      cRoleCode: values.cRoleCode
    }))
    userRoleList.forEach((i) => {
      i.cRoleCode.forEach((j) => {
        items.push({
          cLoginName: i.cLoginName,
          cRoleCode: j
        })
      })
    })
    batchAddMutation.mutate(
      {
        Items: items
      },
      {
        onSuccess: () => setOpen?.(false)
      }
    )
  }
  useEffect(() => {
    if (open) {
      form.setFieldsValue({ cLoginName: meta?.ids, cRoleCode: [] })
    } else {
      form.setFieldsValue({ cLoginName: [], cRoleCode: [] })
    }
  }, [meta?.ids, open])

  return (
    <Modal
      title="编辑角色"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="50%"
      okButtonProps={{
        loading: batchAddMutation.isPending,
        disabled: batchAddMutation.isPending
      }}
    >
      <Form
        className="pt-3"
        name="edit-role-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{
          cLoginName: [],
          cRoleCode: []
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="cLoginName"
          label="人员"
          rules={[{ required: true, message: '请选择人员' }]}
        >
          <Select
            mode="multiple"
            options={employeeCandidates ?? []}
            fieldNames={{
              label: 'cEmployeeName',
              value: 'UID'
            }}
            allowClear
            placeholder="请选择人员"
          />
        </Form.Item>
        <Form.Item
          name="cRoleCode"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
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
      </Form>
    </Modal>
  )
}
