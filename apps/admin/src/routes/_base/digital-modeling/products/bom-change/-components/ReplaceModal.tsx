import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { type BOMChangeReplaceDto, useReplaceMutation } from '@/features/bom-change'
import * as Inventory from '@/features/inventory'

import type { ReplaceModalMeta } from '../-types'

interface ReplaceModalProps {
  meta?: ReplaceModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function ReplaceModal(props: ReplaceModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<BOMChangeReplaceDto>()

  const replaceMutation = useReplaceMutation()

  const onFinish: FormProps<BOMChangeReplaceDto>['onFinish'] = (values) => {
    replaceMutation.mutate(
      {
        ...values,
        list_UID: meta?.UIDs ?? []
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
      title="替代子件"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="500px"
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Row>
          <Col span={24}>
            <Form.Item<BOMChangeReplaceDto>
              name="cInvCode"
              label="子件编码"
            >
              <Inventory.MaterialCodeRemoteSelect
                onConfirm={(v) =>
                  form.setFieldsValue({
                    cInvCode: v.cInvCode
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
