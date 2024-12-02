import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  detailQO,
  useEditMutation,
  type VendorEditDto
} from '@/features/digital-modeling/merchants/vendor'
import { treeQO } from '@/features/digital-modeling/merchants/vendor-class'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<VendorEditDto>()

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

  const onFinish: FormProps<VendorEditDto>['onFinish'] = (values) => {
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
          <Form.Item<VendorEditDto>
            name="cVendorName"
            label="供应商名称"
            rules={[{ required: true, message: '请输入供应商名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<VendorEditDto>
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
              treeData={treeData}
              fieldNames={{
                label: 'cVendorName',
                value: 'cVendorCode',
                children: 'Child'
              }}
              allowClear
            />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
