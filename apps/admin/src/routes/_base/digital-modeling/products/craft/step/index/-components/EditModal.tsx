import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { detailQO, type StepEditDto, useEditMutation } from '@/features/step'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<StepEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<StepEditDto>['onFinish'] = (values) =>
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
      title="编辑工步"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="600px"
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
          <Form.Item<StepEditDto>
            name="cStepCode"
            label="工步编码"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<StepEditDto>
            name="cStepName"
            label="工步名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item<StepEditDto>
            name="isDevice"
            label="是否对接设备"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item>
          <Form.Item<StepEditDto>
            name="isBussiness"
            label="是否对接业务"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
            />
          </Form.Item> */}
        </Skeleton>
      </Form>
    </Modal>
  )
}
