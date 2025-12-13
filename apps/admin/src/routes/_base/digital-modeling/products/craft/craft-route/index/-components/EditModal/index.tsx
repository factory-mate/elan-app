import { type FormProps, Modal } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import {
  type CraftRouteEditDto,
  type CraftRouteProcessVo,
  type CraftRouteResourceVo,
  listforTreeQO,
  useEditMutation
} from '@/features/craft-route'

import type { EditModalMeta } from '../../-types'
import ProcessArea from './ProcessArea'
import ResourceArea from './ResourceArea'

interface EditModalProps {
  meta?: EditModalMeta
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function EditModal(props: EditModalProps) {
  const { meta, open, setOpen } = props

  const [form] = Form.useForm<CraftRouteEditDto>()

  const { data: detailData, isPending } = useQuery(listforTreeQO(meta?.UID))
  const [processData, setProcessData] = useImmer<CraftRouteProcessVo[]>([])
  const [resourceData, setResourceData] = useImmer<CraftRouteResourceVo[]>([])
  const [activeKey, setActiveKey] = useState('process')

  const editMutation = useEditMutation()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(detailData?.[0] ?? {})
      setProcessData(detailData?.[0]?.Items ?? [])
      setResourceData(detailData?.[0]?.Resources ?? [])
    } else {
      form.resetFields()
      setProcessData([])
      setResourceData([])
    }
  }, [detailData, form, open, setProcessData, setResourceData])

  useEffect(() => {
    setActiveKey('process')
  }, [open])

  const onFinish: FormProps<CraftRouteEditDto>['onFinish'] = (values) => {
    editMutation.mutate(
      {
        ...detailData?.[0],
        ...values,
        list_S: processData.map((i) => ({
          ...i,
          list_SS: i.list_step ?? []
        })),
        list_Resource: resourceData
      },
      {
        onSuccess: () => setOpen?.(false)
      }
    )
  }

  return (
    <Modal
      title="编辑工艺路线"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen?.(false)}
      okButtonProps={{
        disabled: isPending || editMutation.isPending,
        loading: editMutation.isPending
      }}
      forceRender
      width="60%"
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
          <Row>
            <Col span={12}>
              <Form.Item<CraftRouteEditDto>
                name="cCraftRouteCode"
                label="工艺路线编码"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<CraftRouteEditDto>
                name="cCraftRouteName"
                label="工艺路线名称"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Tabs
            activeKey={activeKey}
            onTabClick={(ak) => setActiveKey(ak)}
            items={[
              {
                label: '流程信息',
                key: 'process',
                children: (
                  <ProcessArea
                    data={processData}
                    setData={setProcessData}
                  />
                )
              },
              {
                label: '关联产品',
                key: 'resource',
                children: (
                  <ResourceArea
                    data={resourceData}
                    setData={setResourceData}
                  />
                )
              }
            ]}
          />
        </Skeleton>
      </Form>
    </Modal>
  )
}
