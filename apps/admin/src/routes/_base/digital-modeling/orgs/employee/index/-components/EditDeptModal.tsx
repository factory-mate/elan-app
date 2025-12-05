import type { FormProps } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Department from '@/features/department'
import type { EmployeeSetDeptDto } from '@/features/employee'
import * as Employee from '@/features/employee'

import type { EditDeptModalMeta } from '../-types'

interface EditDeptModalProps {
  meta?: EditDeptModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditDeptModal(props: EditDeptModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<EmployeeSetDeptDto>()

  const { data: employeeCandidates } = useQuery(Employee.fullListQO())
  const { data: deptTreeData } = useQuery(Department.treeQO())

  const setDeptMutation = Employee.useSetDeptMutation()

  const onFinish: FormProps<EmployeeSetDeptDto>['onFinish'] = (values) =>
    setDeptMutation.mutate(
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
      form.setFieldsValue({ KeyVal: [], cDepCode: undefined })
    }
  }, [meta?.ids, open])

  return (
    <Modal
      title="编辑部门"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="50%"
      okButtonProps={{
        loading: setDeptMutation.isPending,
        disabled: setDeptMutation.isPending
      }}
    >
      <Form
        className="pt-3"
        name="edit-dept-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{
          KeyVal: []
        }}
        onFinish={onFinish}
      >
        <Form.Item
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
        <Form.Item
          name="cDepCode"
          label="部门"
          rules={[{ required: true, message: '请选择部门' }]}
        >
          <TreeSelect
            treeData={deptTreeData ?? []}
            fieldNames={Department.departmentTreeSelectFieldNames}
            allowClear
            placeholder="请选择部门"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
