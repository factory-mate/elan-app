import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Department from '@/features/department'
import * as Inventory from '@/features/inventory'
import {
  detailQO,
  type MainProductionPlanMpsEditDto,
  useEditMutation
} from '@/features/main-production-plan-mps'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<MainProductionPlanMpsEditDto>()

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))
  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ ...detailData })
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<MainProductionPlanMpsEditDto>['onFinish'] = (values) =>
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
      title="编辑"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="500px"
    >
      <Form
        className="pt-3"
        name="edit-form"
        form={form}
        labelCol={{ span: 6 }}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Skeleton loading={isPending}>
          <Form.Item<MainProductionPlanMpsEditDto>
            name="cInvCode"
            label="产品编码"
          >
            <Inventory.ProductCodeRemoteSelect
              onConfirm={(v) => {
                form.setFieldsValue({
                  cInvCode: v.cInvCode,
                  cInvName: v.cInvName,
                  cInvStd: v.cInvstd
                })
              }}
            />
          </Form.Item>
          <Form.Item<MainProductionPlanMpsEditDto>
            name="cInvStd"
            label="物料规格"
          >
            <Input />
          </Form.Item>
          <Form.Item<MainProductionPlanMpsEditDto>
            name="cDepCode"
            label="生产部门"
          >
            <Select
              options={departmentCandidates}
              fieldNames={{
                label: 'cDepName',
                value: 'cDepCode'
              }}
              onSelect={(_value, option) => {
                form.setFieldsValue({
                  cDepCode: option.cDepCode,
                  cDepName: option.cDepName
                })
              }}
            />
          </Form.Item>
          <Form.Item<MainProductionPlanMpsEditDto>
            name="cDepName"
            label="生产部门名称"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item<MainProductionPlanMpsEditDto>
            name="nQuantity"
            label="计划数量"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<MainProductionPlanMpsEditDto>
            name="nStockQuantity"
            label="库存"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<MainProductionPlanMpsEditDto>
            name="dStartDate"
            label="开始日期"
            getValueProps={(value) => ({ value: value && DateUtils.convertToDayjs(value) })}
            normalize={(value) => value && DateUtils.formatTime(value)}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item<MainProductionPlanMpsEditDto>
            name="dEndDate"
            label="结束日期"
            getValueProps={(value) => ({ value: value && DateUtils.convertToDayjs(value) })}
            normalize={(value) => value && DateUtils.formatTime(value)}
          >
            <DatePicker />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
