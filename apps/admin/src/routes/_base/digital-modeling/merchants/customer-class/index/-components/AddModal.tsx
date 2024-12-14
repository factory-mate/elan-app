import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type CustomerClassAddDto,
  customerClassTreeSelectFieldNames,
  treeQO,
  useAddMutation
} from '@/features/digital-modeling/merchants/customer-class'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<CustomerClassAddDto>()

  const { data } = useSuspenseQuery(treeQO())

  const addMutation = useAddMutation()

  const onFinish: FormProps<CustomerClassAddDto>['onFinish'] = (values) =>
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
      title="新增客户分类"
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
            fieldNames={customerClassTreeSelectFieldNames}
            allowClear
          />
        </Form.Item>
        <Form.Item<CustomerClassAddDto>
          name="cCustomerClassName"
          label="客户分类名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<CustomerClassAddDto>
          name="cCustomerClassCode"
          label="客户分类编码"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<CustomerClassAddDto>
          name="iGrade"
          label="分类级次"
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}
