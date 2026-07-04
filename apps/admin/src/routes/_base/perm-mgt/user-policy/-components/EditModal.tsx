import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Employee from '@/features/employee'
import * as Menus from '@/features/menus'
import * as Policy from '@/features/policy'
import { detailQO, useEditMutation, type UserPolicyEditDto } from '@/features/user-policy'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<UserPolicyEditDto>()

  const { data: menuCandidates } = useQuery(Menus.fullListQO())
  const { data: employeeCandidates } = useQuery(Employee.fullListQO())
  const { data: policyCandidates } = useQuery(Policy.fullListQO())
  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<UserPolicyEditDto>['onFinish'] = (values) => {
    editMutation.mutate(
      {
        ...detailData,
        ...values
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
      title="编辑用户策略"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width={500}
    >
      <Form
        className="pt-3"
        name="edit-form"
        form={form}
        labelCol={{ span: 8 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Skeleton loading={isPending}>
          <Form.Item<UserPolicyEditDto>
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
          <Form.Item<UserPolicyEditDto>
            name="cResourcesCode"
            label="资源名称"
            rules={[{ required: true }]}
          >
            <Select
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
          <Form.Item<UserPolicyEditDto>
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
        </Skeleton>
      </Form>
    </Modal>
  )
}
