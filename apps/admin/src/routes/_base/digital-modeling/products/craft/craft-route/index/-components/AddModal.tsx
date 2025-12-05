import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type CraftRouteAddDto,
  useAddMutation
} from '@/features/digital-modeling/products/craft/craft-route'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<CraftRouteAddDto>()

  const addMutation = useAddMutation()

  const onFinish: FormProps<CraftRouteAddDto>['onFinish'] = (values) =>
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
      title="新增工艺路线"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="400px"
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 9 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<CraftRouteAddDto>
          name="cCraftRouteName"
          label="工艺路线名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
