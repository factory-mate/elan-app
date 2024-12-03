import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { useAddMutation, type VendorAddDto } from '@/features/digital-modeling/merchants/vendor'
import {
  treeQO,
  vendorClassTreeSelectFieldNames
} from '@/features/digital-modeling/merchants/vendor-class'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<VendorAddDto>()

  const { data } = useSuspenseQuery(treeQO())

  const addMutation = useAddMutation()

  const onFinish: FormProps<VendorAddDto>['onFinish'] = (values) => {
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
        labelCol={{ span: 6 }}
        initialValues={{
          bProduct: false
        }}
        onFinish={onFinish}
      >
        <Form.Item<VendorAddDto>
          name="cVendorName"
          label="供应商名称"
          rules={[{ required: true, message: '请输入供应商名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<VendorAddDto>
          name="cVendorCode"
          label="供应商编码"
          rules={[{ required: true, message: '请输入供应商编码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cParentCode"
          label="所属分类"
        >
          <TreeSelect
            treeData={data}
            fieldNames={vendorClassTreeSelectFieldNames}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
