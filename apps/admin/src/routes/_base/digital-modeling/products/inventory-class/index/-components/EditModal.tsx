import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  detailQO,
  type InventoryClassEditDto,
  treeQO,
  useEditMutation
} from '@/features/inventory-class'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<InventoryClassEditDto>()

  const { data } = useSuspenseQuery(treeQO())
  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<InventoryClassEditDto>['onFinish'] = (values) =>
    editMutation.mutate(
      {
        ...detailData,
        ...values
      },
      {
        onSuccess: () => setOpen?.(false)
      }
    )

  return (
    <Modal
      title="编辑料品分类"
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
              treeData={data}
              fieldNames={{
                label: 'cInvClassName',
                value: 'cInvClassCode',
                children: 'Child'
              }}
              allowClear
            />
          </Form.Item>
          <Form.Item<InventoryClassEditDto>
            name="cInvClassName"
            label="料品分类名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<InventoryClassEditDto>
            name="cInvClassCode"
            label="料品分类编码"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<InventoryClassEditDto>
            name="iGrate"
            label="分类级次"
          >
            <InputNumber />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
