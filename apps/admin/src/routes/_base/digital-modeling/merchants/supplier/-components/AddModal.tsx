import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type SupplierAddDto,
  treeQO,
  useAddMutation
} from '@/features/digital-modeling/merchants/supplier'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<SupplierAddDto>()

  const { data } = useSuspenseQuery(treeQO())

  const addMutation = useAddMutation()

  const onFinish: FormProps<SupplierAddDto>['onFinish'] = (values) => {
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
        <Form.Item<SupplierAddDto>
          name="cSupplierName"
          label="供应商名称"
          rules={[{ required: true, message: '请输入供应商名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<SupplierAddDto>
          name="cSupplierCode"
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
