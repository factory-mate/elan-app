import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as BOM from '@/features/bom'
import * as Employee from '@/features/employee'
import {
  detailQO,
  type RecipeEmployeeRefEditDto,
  useEditMutation
} from '@/features/recipe-employee-ref'

import type { EditModalMeta } from '../-types'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<RecipeEmployeeRefEditDto>()

  const { data: { data: bomCandidates } = {} } = useQuery(
    BOM.listQO({
      ...defaultMaxPageDto
    })
  )
  const { data: { data: employeeCandidates } = {} } = useQuery(
    Employee.listQO({
      ...defaultMaxPageDto
    })
  )

  const { data: detailData, isPending } = useQuery(detailQO(meta?.UID))

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData ?? {})
    } else {
      form.resetFields()
    }
  }, [detailData, form, open])

  const onFinish: FormProps<RecipeEmployeeRefEditDto>['onFinish'] = (values) =>
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
      title="编辑配方职员对照"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="700px"
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
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cEmployeeCode"
            label="职员编码"
            rules={[{ required: true }]}
          >
            <Select
              options={employeeCandidates}
              fieldNames={{
                label: 'cEmployeeCode',
                value: 'cEmployeeCode'
              }}
              showSearch={{
                filterOption: (input, option) =>
                  (option?.cEmployeeCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                  (option?.cEmployeeName ?? '').toLowerCase().includes(input.toLowerCase())
              }}
              onSelect={(_value, option) => {
                form.setFieldsValue({
                  cEmployeeName: option.cEmployeeName
                })
              }}
              optionRender={(option) => (
                <Flex justify="space-between">
                  <span>{option.data.cEmployeeName}</span>
                  <span> {option.data.cEmployeeCode}</span>
                </Flex>
              )}
            />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cEmployeeName"
            label="职员名称"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cInvCode"
            label="产品编码"
            rules={[{ required: true }]}
          >
            <Select
              options={bomCandidates}
              fieldNames={{
                label: 'cInvCode',
                value: 'cInvCode'
              }}
              showSearch={{
                filterOption: (input, option) =>
                  (option?.cInvCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                  (option?.cInvName ?? '').toLowerCase().includes(input.toLowerCase())
              }}
              onSelect={(_value, option) => {
                form.setFieldsValue({
                  BomUID: option.UID,
                  cInvName: option.cInvName,
                  cInvstd: option.cInvstd,
                  iBOMStatus: option.iStatus,
                  iBOMStatusName: option.iStatusName,
                  cBOMType: option.cBOMType,
                  cBOMTypeName: option.cBOMTypeName,
                  cVersion: option.cVersion,
                  dVersionDate: option.dVersionDate,
                  cVerisionMemo: option.cVerisionMemo
                })
              }}
              optionRender={(option) => (
                <Row>
                  <Col span={8}>{option.data.cInvCode}</Col>
                  <Col span={12}> {option.data.cInvName}</Col>
                  <Col span={4}> {option.data.cVersion}</Col>
                </Row>
              )}
            />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cInvName"
            label="产品名称"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="BomUID"
            hidden
          />
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cInvstd"
            label="规格型号"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="iBOMStatus"
            hidden
          />
          <Form.Item<RecipeEmployeeRefEditDto>
            name="iBOMStatusName"
            label="BOM状态"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cBOMType"
            hidden
          />
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cBOMTypeName"
            label="BOM类别"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cVersion"
            label="版本代号"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="dVersionDate"
            label="版本日期"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<RecipeEmployeeRefEditDto>
            name="cVerisionMemo"
            label="版本说明"
          >
            <Input.TextArea disabled />
          </Form.Item>
        </Skeleton>
      </Form>
    </Modal>
  )
}
