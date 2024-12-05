import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type UnitClassAddDto,
  useAddMutation
} from '@/features/digital-modeling/products/unit-class'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<UnitClassAddDto>()

  const addMutation = useAddMutation()

  const onFinish: FormProps<UnitClassAddDto>['onFinish'] = (values) =>
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
      title="新增计量单位组档案"
      open={open}
      onOk={() => {
        setOpen?.(true)
        form.submit()
      }}
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
        <Form.Item<UnitClassAddDto>
          name="cUnitClassName"
          label="计量单位组名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<UnitClassAddDto>
          name="cUnitClassCode"
          label="计量单位组编码"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<UnitClassAddDto>
          name="cUnitClassType"
          label="计量单位组类别"
        >
          <Select />
        </Form.Item>
        <Form.Item<UnitClassAddDto>
          name="bDefault"
          label="是否默认"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  )
}
