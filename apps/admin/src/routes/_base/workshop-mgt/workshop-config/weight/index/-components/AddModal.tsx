import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { useAddMutation, type WeightAddDto } from '@/features/weight'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<WeightAddDto>()

  const addMutation = useAddMutation()

  const onFinish: FormProps<WeightAddDto>['onFinish'] = (values) =>
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
      title="新增电子秤误差配置"
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
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<WeightAddDto>
          name="ScaleQuantity"
          label="称最大计量"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<WeightAddDto>
          name="iErrorQuantity"
          label="误差范围"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<WeightAddDto>
          name="cMemo"
          label="备注"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
