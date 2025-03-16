import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { detailQO, type RoleEditDto, useEditMutation } from '@/features/perm-management/roles'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<RoleEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<RoleEditDto>['onFinish'] = (values) =>
    editMutation.mutate(
      {
        ...detailData,
        ...values
      },
      {
        onSuccess: () => setOpen?.(false)
      }
    )

  return (
    <Modal
      title="编辑角色"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="60%"
    >
      <Form
        className="pt-3"
        name="edit-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Skeleton loading={isPending}>
          <Form.Item<RoleEditDto>
            name="cRoleCode"
            label="角色编码"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<RoleEditDto>
            name="cRoleName"
            label="角色名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<RoleEditDto>
            name="IsValid"
            label="是否启用"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>
          <Form.Item<RoleEditDto>
            name="cMemo"
            label="备注"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
