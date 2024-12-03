import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type CustomerEditDto,
  detailQO,
  useEditMutation
} from '@/features/digital-modeling/merchants/customer'
import {
  customerClassTreeSelectFieldNames,
  treeQO
} from '@/features/digital-modeling/merchants/customer-class'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<CustomerEditDto>()

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

  const onFinish: FormProps<CustomerEditDto>['onFinish'] = (values) => {
    editMutation.mutate(
      {
        ...detailData,
        ...values
      },
      {
        onSuccess: () => {
          setOpen?.(false)
        }
      }
    )
  }

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
      width="60%"
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
          <Form.Item<CustomerEditDto>
            name="cCustomerName"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<CustomerEditDto>
            name="cCustomerCode"
            label="客户编码"
            rules={[{ required: true, message: '请输入客户编码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cParentCode"
            label="所属分类"
          >
            <TreeSelect
              treeData={treeData}
              fieldNames={customerClassTreeSelectFieldNames}
              allowClear
            />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
