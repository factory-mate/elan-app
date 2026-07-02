import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Department from '@/features/department'
import {
  type MainProductionPlanMpsComputeDto,
  useMpsMutation
} from '@/features/main-production-plan-mps'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<MainProductionPlanMpsComputeDto>()

  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )

  const mpsMutation = useMpsMutation()

  const onFinish: FormProps<MainProductionPlanMpsComputeDto>['onFinish'] = (values) =>
    mpsMutation.mutate(
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
      title="MPS运算"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="400px"
      okButtonProps={{
        loading: mpsMutation.isPending,
        disabled: mpsMutation.isPending
      }}
    >
      <Form
        className="pt-3"
        name="mps-form"
        form={form}
        labelCol={{ span: 8 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<MainProductionPlanMpsComputeDto>
          name="cDepCode"
          label="部门"
          rules={[{ required: true, message: '请选择部门' }]}
        >
          <Select
            options={departmentCandidates}
            fieldNames={{
              label: 'cDepName',
              value: 'cDepCode'
            }}
            allowClear
            placeholder="请选择部门"
          />
        </Form.Item>
        <Form.Item<MainProductionPlanMpsComputeDto>
          name="dStartDate"
          label="开始日期"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item<MainProductionPlanMpsComputeDto>
          name="dEndDate"
          label="结束日期"
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
}
