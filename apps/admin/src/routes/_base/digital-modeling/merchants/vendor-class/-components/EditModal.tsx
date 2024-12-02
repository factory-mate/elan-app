import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  detailQO,
  treeQO,
  useEditMutation,
  type VendorClassEditDto
} from '@/features/digital-modeling/merchants/vendor-class'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<VendorClassEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))
  const { data: treeData } = useSuspenseQuery(treeQO())

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<VendorClassEditDto>['onFinish'] = (values) => {
    editMutation.mutate(
      {
        ...detailData,
        ...values
      },
      {
        onSuccess: () => {
          setOpen?.(false)
        }
      }
    )
  }

  return (
    <Modal
      title="编辑部门"
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
        name="edit-form"
        form={form}
        labelCol={{ span: 4 }}
        initialValues={{
          bProduct: false
        }}
        onFinish={onFinish}
      >
        <Skeleton loading={isPending}>
          <Form.Item
            name="cParentCode"
            label="上级分类"
          >
            <TreeSelect
              treeData={treeData}
              fieldNames={{
                label: 'cVendorClassName',
                value: 'cVendorClassCode',
                children: 'Child'
              }}
              allowClear
            />
          </Form.Item>
          <Form.Item<VendorClassEditDto>
            name="cVendorClassName"
            label="供应商分类名称"
            rules={[{ required: true, message: '请输入供应商分类名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<VendorClassEditDto>
            name="cVendorClassCode"
            label="供应商分类编码"
            rules={[{ required: true, message: '请输入供应商分类编码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="iGrade"
            label="分类级次"
          >
            <InputNumber />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
