import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { type CustomerAddDto, useAddMutation } from '@/features/digital-modeling/merchants/customer'
import { treeQO } from '@/features/digital-modeling/merchants/customer-class'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<CustomerAddDto>()

  const { data } = useSuspenseQuery(treeQO())

  const addMutation = useAddMutation()

  const onFinish: FormProps<CustomerAddDto>['onFinish'] = (values) => {
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
  }

  return (
    <Modal
      title="新增部门"
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
        labelCol={{ span: 4 }}
        initialValues={{
          bProduct: false
        }}
        onFinish={onFinish}
      >
        <Form.Item<CustomerAddDto>
          name="cCustomerName"
          label="客户名称"
          rules={[{ required: true, message: '请输入客户名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<CustomerAddDto>
          name="cCustomerCode"
          label="客户编码"
          rules={[{ required: true, message: '请输入客户编码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cParentCode"
          label="所属分类"
        >
          <TreeSelect
            treeData={data}
            fieldNames={{
              label: 'cCustomerName',
              value: 'cCustomerCode',
              children: 'Child'
            }}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
