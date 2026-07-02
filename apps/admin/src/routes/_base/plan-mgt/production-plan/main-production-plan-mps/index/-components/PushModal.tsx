import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Dicts from '@/features/dicts'
import {
  type MainProductionPlanMpsPushDto,
  usePushMutation
} from '@/features/main-production-plan-mps'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  selectedRows?: Record<string, any>[]
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen, selectedRows } = props

  const [form] = Form.useForm<MainProductionPlanMpsPushDto>()

  const { data: vouchTypeCandidates } = useQuery(Dicts.fullListQO('ProductVouchType'))

  const pushMutation = usePushMutation()

  const onFinish: FormProps<MainProductionPlanMpsPushDto>['onFinish'] = (values) => {
    pushMutation.mutate(
      {
        KeyVal: selectedRows!.map((i) => i.UID),
        cVouchType: values.cVouchType
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
      title="生单"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="400px"
      okButtonProps={{
        loading: pushMutation.isPending,
        disabled: pushMutation.isPending
      }}
    >
      <Form
        className="pt-3"
        name="push-form"
        form={form}
        labelCol={{ span: 8 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<MainProductionPlanMpsPushDto>
          name="cVouchType"
          label="生产订单类别"
          rules={[{ required: true, message: '请选择生产订单类别' }]}
        >
          <Select
            options={vouchTypeCandidates}
            fieldNames={{
              label: 'cDictonaryName',
              value: 'cDictonaryCode'
            }}
            allowClear
            placeholder="请选择生产订单类别"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
