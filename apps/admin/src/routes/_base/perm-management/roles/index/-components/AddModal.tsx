import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { type RoleAddDto, useAddMutation } from '@/features/perm-management/roles'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<RoleAddDto>()

  const addMutation = useAddMutation()

  const onFinish: FormProps<RoleAddDto>['onFinish'] = (values) =>
    addMutation.mutate(
      {
        ...values
      },
      {
        onSuccess: () => {
          setOpen?.(false)
          form.resetFields()
        }
      }
    )

  return (
    <Modal
      title="新增角色"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="40%"
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{
          IsValid: true
        }}
        onFinish={onFinish}
      >
        <Form.Item<RoleAddDto>
          name="cRoleCode"
          label="角色编码"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoleAddDto>
          name="cRoleName"
          label="角色名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<RoleAddDto>
          name="IsValid"
          label="是否启用"
        >
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </Form.Item>
        <Form.Item<RoleAddDto>
          name="cMemo"
          label="备注"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
