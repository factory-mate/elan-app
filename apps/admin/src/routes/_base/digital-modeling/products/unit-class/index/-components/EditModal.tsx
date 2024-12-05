import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import { dictSelectFieldNames, fullListQO } from '@/features/dicts'
import {
  detailQO,
  type UnitClassEditDto,
  useEditMutation
} from '@/features/digital-modeling/products/unit-class'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<UnitClassEditDto>()

  const { data } = useQuery(fullListQO('UnitClassType'))
  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<UnitClassEditDto>['onFinish'] = (values) =>
    editMutation.mutate(
      {
        ...detailData,
        ...values
      },
      {
        onSuccess: () => setOpen?.(false)
      }
    )

  return (
    <Modal
      title="编辑计量单位组档案"
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
        initialValues={{ cUnitClassTypeName: '' }}
        onFinish={onFinish}
      >
        <Skeleton loading={isPending}>
          <Form.Item<UnitClassEditDto>
            name="cUnitClassName"
            label="计量单位组名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UnitClassEditDto>
            name="cUnitClassCode"
            label="计量单位组编码"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UnitClassEditDto>
            name="cUnitClassType"
            label="计量单位组类别"
          >
            <Select
              options={data}
              fieldNames={dictSelectFieldNames}
            />
          </Form.Item>
          <Form.Item<UnitClassEditDto>
            name="bDefault"
            label="是否默认"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
