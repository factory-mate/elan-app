import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type CustomerClassEditDto,
  detailQO,
  treeQO,
  useEditMutation
} from '@/features/customer-class'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<CustomerClassEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))
  const { data: treeData } = useQuery(treeQO())

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<CustomerClassEditDto>['onFinish'] = (values) =>
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

  return (
    <Modal
      title="编辑客户分类"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="60%"
    >
      <Form
        className="pt-3"
        name="edit-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
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
                value: 'cCustomerClassCode',
                label: 'cCustomerClassName',
                children: 'Child'
              }}
              allowClear
            />
          </Form.Item>
          <Form.Item<CustomerClassEditDto>
            name="cCustomerClassName"
            label="客户分类名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<CustomerClassEditDto>
            name="cCustomerClassCode"
            label="客户分类编码"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<CustomerClassEditDto>
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
