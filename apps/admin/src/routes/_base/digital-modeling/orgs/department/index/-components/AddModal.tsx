import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type DepartmentAddDto,
  departmentTreeSelectFieldNames,
  treeQO,
  useAddMutation
} from '@/features/digital-modeling/orgs/department'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<DepartmentAddDto>()

  const { data } = useSuspenseQuery(treeQO())

  const addMutation = useAddMutation()

  const onFinish: FormProps<DepartmentAddDto>['onFinish'] = (values) =>
    addMutation.mutate(
      {
        ...values,
        bodys: []
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
      title="新增部门"
      open={open}
      onOk={() => {
        setOpen?.(true)
        form.submit()
      }}
      onCancel={() => setOpen?.(false)}
      forceRender
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{
          bProduct: false
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="cParentCode"
          label="上级部门"
        >
          <TreeSelect
            treeData={data}
            fieldNames={departmentTreeSelectFieldNames}
            allowClear
          />
        </Form.Item>
        <Form.Item<DepartmentAddDto>
          name="cDepName"
          label="部门名称"
          rules={[{ required: true, message: '请输入部门名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<DepartmentAddDto>
          name="cDepCode"
          label="部门编码"
          rules={[{ required: true, message: '请输入部门编码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="负责人员">
          <Select
            mode="multiple"
            allowClear
          />
        </Form.Item>
        <Form.Item<DepartmentAddDto>
          name="bProduct"
          label="生产部门"
        >
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
