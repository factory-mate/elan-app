import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Employee from '@/features/employee'
import * as Menus from '@/features/menus'
import * as Policy from '@/features/policy'
import { useBatchAddMutation, type UserPolicyBatchAddFormValues } from '@/features/user-policy'

interface AddModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AddModal(props: AddModalProps) {
  const { open, setOpen } = props

  const [form] = Form.useForm<UserPolicyBatchAddFormValues>()

  const { data: menuCandidates } = useQuery(Menus.fullListQO())
  const { data: employeeCandidates } = useQuery(Employee.fullListQO())
  const { data: policyCandidates } = useQuery(Policy.fullListQO())

  const batchAddMutation = useBatchAddMutation()

  const onFinish: FormProps<UserPolicyBatchAddFormValues>['onFinish'] = (values) => {
    const { cResourcesCode, ...otherValues } = values
    batchAddMutation.mutate(
      {
        Items: cResourcesCode.map((i) => ({
          ...otherValues,
          cResourcesCode: i
        }))
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
      title="新增用户策略"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width={500}
    >
      <Form
        className="pt-3"
        name="add-form"
        form={form}
        labelCol={{ span: 8 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item<UserPolicyBatchAddFormValues>
          name="cLoginName"
          label="用户名称"
          rules={[{ required: true }]}
        >
          <Select
            options={employeeCandidates}
            fieldNames={{
              label: 'cEmployeeName',
              value: 'cEmployeeCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cEmployeeName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cEmployeeCode}</span>
                <span> {option.data.cEmployeeName}</span>
              </Flex>
            )}
            allowClear
          />
        </Form.Item>
        <Form.Item<UserPolicyBatchAddFormValues>
          name="cResourcesCode"
          label="资源名称"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            options={menuCandidates}
            fieldNames={{
              label: 'cMenuName',
              value: 'cMenuCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cMenuName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cMenuCode}</span>
                <span> {option.data.cMenuName}</span>
              </Flex>
            )}
            allowClear
          />
        </Form.Item>
        <Form.Item<UserPolicyBatchAddFormValues>
          name="cPolicyCode"
          label="策略名称"
          rules={[{ required: true }]}
        >
          <Select
            options={policyCandidates}
            fieldNames={{
              label: 'cPolicyName',
              value: 'cPolicyCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cPolicyName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cPolicyCode}</span>
                <span> {option.data.cPolicyName}</span>
              </Flex>
            )}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
