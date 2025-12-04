import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  detailQO,
  type ProcessEditDto,
  useEditMutation
} from '@/features/digital-modeling/products/craft/process'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<ProcessEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<ProcessEditDto>['onFinish'] = (values) =>
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
      title="编辑工序"
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
          <Form.Item<ProcessEditDto>
            name="cProcessCode"
            label="工序编码"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<ProcessEditDto>
            name="cProcessName"
            label="工序名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
