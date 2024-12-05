import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type DepartmentEditDto,
  departmentTreeSelectFieldNames,
  detailQO,
  treeQO,
  useEditMutation
} from '@/features/digital-modeling/orgs/department'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<DepartmentEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))
  const { data: treeData } = useSuspenseQuery(treeQO())

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<DepartmentEditDto>['onFinish'] = (values) =>
    editMutation.mutate(
      {
        ...detailData,
        ...values,
        bodys: []
      },
      {
        onSuccess: () => {
          setOpen?.(false)
        }
      }
    )

  return (
    <Modal
      title="编辑部门"
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
        name="edit-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{
          bProduct: false
        }}
        onFinish={onFinish}
      >
        <Skeleton loading={isPending}>
          <Form.Item
            name="cParentCode"
            label="上级部门"
          >
            <TreeSelect
              treeData={treeData}
              fieldNames={departmentTreeSelectFieldNames}
              allowClear
            />
          </Form.Item>
          <Form.Item<DepartmentEditDto>
            name="cDepName"
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<DepartmentEditDto>
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
          <Form.Item<DepartmentEditDto>
            name="bProduct"
            label="生产部门"
          >
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
            />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
