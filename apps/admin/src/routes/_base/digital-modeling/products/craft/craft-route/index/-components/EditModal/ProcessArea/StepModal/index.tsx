import type { FormProps } from 'antd'
import type { Dispatch, SetStateAction } from 'react'
import type { Updater } from 'use-immer'

import type { CraftRouteProcessVo, CraftRouteStepDto } from '@/features/craft-route'
import * as Step from '@/features/step'

export interface StepModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  meta?: CraftRouteStepDto
  type?: string
  setData: Updater<CraftRouteProcessVo[]>
  currentProcess: number
  currentStep: number
}

export default function StepModal(props: StepModalProps) {
  const { open, setOpen, meta, type, setData, currentProcess, currentStep } = props

  const [form] = Form.useForm<CraftRouteStepDto>()

  const { data: { data: StepCandidates } = {} } = useQuery(
    Step.listQO({
      ...defaultMaxPageDto
    })
  )

  const onFinish: FormProps<CraftRouteStepDto>['onFinish'] = (values) => {
    if (currentStep >= 0 && type === 'edit') {
      setData?.((draft) => {
        draft[currentProcess].list_step![currentStep] = {
          ...draft[currentStep],
          ...values
        }
      })
    } else {
      setData?.((draft) => {
        draft[currentProcess].list_step!.push({
          ...values
        })
      })
    }
    setOpen?.(false)
    form.resetFields()
  }

  useEffect(() => {
    if (type === 'edit') {
      form.setFieldsValue(meta ?? {})
    } else {
      form.resetFields()
    }
  }, [form, type, meta])

  return (
    <Modal
      title={`${type === 'edit' ? '编辑' : '新增'}工步`}
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="400px"
    >
      <Form
        className="pt-3"
        name="Step-form"
        form={form}
        labelCol={{ span: 9 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<CraftRouteStepDto>
          name="cStepCode"
          label="工步编码"
          rules={[{ required: true }]}
        >
          <Select
            options={StepCandidates}
            fieldNames={{
              label: 'cStepCode',
              value: 'cStepCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cStepCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                (option?.cStepName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            onSelect={(value, option) => {
              form.setFieldsValue({
                cStepCode: value,
                cStepName: option.cStepName
              })
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cStepCode}</span>
                <span> {option.data.cStepName}</span>
              </Flex>
            )}
          />
        </Form.Item>
        <Form.Item<CraftRouteStepDto>
          name="cStepName"
          label="工步名称"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  )
}
