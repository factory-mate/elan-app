import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { dicTypeQO } from '@/features/dicts'
import { type StepAddDto, useAddMutation } from '@/features/step'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<StepAddDto>()

  const { data: stepTypeCandidates } = useQuery(
    dicTypeQO({
      cTableCode: 'FM_MES_STEP',
      cAttributeCode: 'cStepType'
    })
  )

  const addMutation = useAddMutation()

  const onFinish: FormProps<StepAddDto>['onFinish'] = (values) =>
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

  return (
    <Modal
      title="新增工步"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="600px"
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<StepAddDto>
          name="cStepName"
          label="工步名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<StepAddDto>
          name="cStepType"
          label="工步属性"
        >
          <Select
            options={stepTypeCandidates}
            fieldNames={{
              label: 'cDictonaryName',
              value: 'cDictonaryCode'
            }}
            showSearch={{
              onSearch: (value) => form.setFieldValue('cStepType', value)
            }}
            allowClear
          />
        </Form.Item>
        {/* <Form.Item<StepAddDto>
          name="isDevice"
          label="是否对接设备"
        >
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </Form.Item>
        <Form.Item<StepAddDto>
          name="isBussiness"
          label="是否对接业务"
        >
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </Form.Item> */}
      </Form>
    </Modal>
  )
}
