import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { detailQO, useEditMutation, type WeightEditDto } from '@/features/weight'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<WeightEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<WeightEditDto>['onFinish'] = (values) =>
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
      title="编辑电子秤误差配置"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="400px"
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
          <Form.Item<WeightEditDto>
            name="ScaleQuantity"
            label="称最大计量"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<WeightEditDto>
            name="iErrorQuantity"
            label="误差范围"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<WeightEditDto>
            name="cMemo"
            label="备注"
          >
            <Input.TextArea />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
