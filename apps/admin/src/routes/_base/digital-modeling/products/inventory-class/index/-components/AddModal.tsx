import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { type InventoryClassAddDto, treeQO, useAddMutation } from '@/features/inventory-class'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<InventoryClassAddDto>()

  const { data } = useQuery(treeQO())

  const addMutation = useAddMutation()

  const onFinish: FormProps<InventoryClassAddDto>['onFinish'] = (values) =>
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
      title="新增料品分类"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="60%"
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item
          name="cParentCode"
          label="上级分类"
        >
          <TreeSelect
            treeData={data}
            fieldNames={{
              label: 'cInvClassName',
              value: 'cInvClassCode',
              children: 'Child'
            }}
            allowClear
          />
        </Form.Item>
        <Form.Item<InventoryClassAddDto>
          name="cInvClassName"
          label="料品分类名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<InventoryClassAddDto>
          name="cInvClassCode"
          label="料品分类编码"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<InventoryClassAddDto>
          name="iGrate"
          label="分类级次"
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}
