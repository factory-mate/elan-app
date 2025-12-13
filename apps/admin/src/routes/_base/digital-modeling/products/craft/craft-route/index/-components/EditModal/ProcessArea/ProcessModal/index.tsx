import type { FormProps } from 'antd'
import type { Dispatch, SetStateAction } from 'react'
import type { Updater } from 'use-immer'

import type { CraftRouteProcessDto, CraftRouteProcessVo } from '@/features/craft-route'
import * as Process from '@/features/process'

export interface ProcessModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  meta?: CraftRouteProcessDto
  type?: string
  setData: Updater<CraftRouteProcessVo[]>
  currentProcess: number
}

export default function ProcessModal(props: ProcessModalProps) {
  const { open, setOpen, meta, type, setData, currentProcess } = props

  const [form] = Form.useForm<CraftRouteProcessDto>()

  const { data: { data: processCandidates } = {} } = useQuery(
    Process.listQO({
      ...defaultMaxPageDto
    })
  )

  const onFinish: FormProps<CraftRouteProcessDto>['onFinish'] = (values) => {
    if (currentProcess >= 0 && type === 'edit') {
      setData?.((draft) => {
        draft[currentProcess] = {
          ...draft[currentProcess],
          ...values
        }
      })
    } else {
      setData?.((draft) => {
        draft.push({
          ...values,
          list_step: []
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
      title={`${type === 'edit' ? '编辑' : '新增'}工序`}
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="400px"
    >
      <Form
        className="pt-3"
        name="process-form"
        form={form}
        labelCol={{ span: 9 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<CraftRouteProcessDto>
          name="cProcessCode"
          label="工序编码"
          rules={[{ required: true }]}
        >
          <Select
            options={processCandidates}
            fieldNames={{
              label: 'cProcessCode',
              value: 'cProcessCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cProcessCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                (option?.cProcessName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            onSelect={(value, option) => {
              form.setFieldsValue({
                cProcessCode: value,
                cProcessName: option.cProcessName
              })
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cProcessCode}</span>
                <span> {option.data.cProcessName}</span>
              </Flex>
            )}
          />
        </Form.Item>
        <Form.Item<CraftRouteProcessDto>
          name="cProcessName"
          label="工序名称"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<CraftRouteProcessDto>
          name="dReadyTime"
          label="准备时间"
        >
          <InputNumber
            className="w-full"
            suffix="Min"
          />
        </Form.Item>
        <Form.Item<CraftRouteProcessDto>
          name="dWaitTime"
          label="等待时间"
        >
          <InputNumber
            className="w-full"
            suffix="Min"
          />
        </Form.Item>
        <Form.Item<CraftRouteProcessDto>
          name="bMain"
          label="是否关键工序"
        >
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
