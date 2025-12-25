import type { FormProps } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Dicts from '@/features/dicts'
import type { EmployeeSetPositionDto } from '@/features/employee'
import * as Employee from '@/features/employee'

import type { EditPositionModalMeta } from '../-types'

interface EditPositionModalProps {
  meta?: EditPositionModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditPositionModal(props: EditPositionModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<EmployeeSetPositionDto>()

  const { data: employeeCandidates } = useQuery(Employee.fullListQO())
  const { data: positionCandidates } = useQuery(Dicts.fullListQO('cProfessionalTypeCode'))

  const setPositionMutation = Employee.useSetPositionMutation()

  const onFinish: FormProps<EmployeeSetPositionDto>['onFinish'] = (values) =>
    setPositionMutation.mutate(
      {
        ...values
      },
      {
        onSuccess: () => setOpen?.(false)
      }
    )

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ KeyVal: meta?.ids })
    } else {
      form.setFieldsValue({ KeyVal: [], cProfessionalTypeCode: undefined })
    }
  }, [form, meta?.ids, open])

  return (
    <Modal
      title="编辑部门"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="50%"
      okButtonProps={{
        loading: setPositionMutation.isPending,
        disabled: setPositionMutation.isPending
      }}
    >
      <Form
        className="pt-3"
        name="edit-position-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{
          KeyVal: []
        }}
        onFinish={onFinish}
      >
        <Form.Item<EmployeeSetPositionDto>
          name="KeyVal"
          label="人员"
          rules={[{ required: true, message: '请选择人员' }]}
        >
          <Select
            mode="multiple"
            options={employeeCandidates ?? []}
            fieldNames={{
              label: 'cEmployeeName',
              value: 'UID'
            }}
            allowClear
            placeholder="请选择人员"
          />
        </Form.Item>
        <Form.Item<EmployeeSetPositionDto>
          name="cProfessionalTypeCode"
          label="职务"
          rules={[{ required: true, message: '请选择职务' }]}
        >
          <Select
            options={positionCandidates ?? []}
            fieldNames={{
              label: 'cDictonaryName',
              value: 'cDictonaryCode'
            }}
            allowClear
            placeholder="请选择职务"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
