import type { Dispatch, SetStateAction } from 'react'

import * as Dicts from '@/features/dicts'
import { TaskStatus } from '@/features/production-plan/production-order'

import type { FilterForm } from '../-types'

interface FilterAreaProps {
  setFilterData?: Dispatch<SetStateAction<FilterForm>>
}

export default function FilterArea(props: FilterAreaProps) {
  const { setFilterData } = props

  const [form] = Form.useForm()

  // const [expand, setExpand] = useState(false)

  const { data: standardTypeCandidates } = useSuspenseQuery(
    Dicts.fullListQO('ProductVouchStandardType')
  )
  const { data: vouchTypeCandidates } = useSuspenseQuery(Dicts.fullListQO('ProductVouchType'))

  return (
    <Card size="small">
      <Form<FilterForm>
        form={form}
        layout="horizontal"
        initialValues={{}}
        labelCol={{ span: 7 }}
        onFinish={(values) => setFilterData?.({ ...values })}
      >
        <Row>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cStandardType"
              label="生产订单类型"
            >
              <Select
                options={standardTypeCandidates}
                fieldNames={Dicts.dictSelectFieldNames}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cVouchType"
              label="生产订单类别"
            >
              <Select
                options={vouchTypeCandidates}
                fieldNames={Dicts.dictSelectFieldNames}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="iStatus"
              label="生产订单状态"
            >
              <Select
                options={[
                  { label: '审核', value: TaskStatus.AUDIT },
                  { label: '放弃', value: TaskStatus.ABANDON },
                  { label: '打开', value: TaskStatus.OPEN },
                  { label: '关闭', value: TaskStatus.CLOSE }
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cCode"
              label="生产订单编号"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="dBeginTime"
              label="订单日期"
            >
              <DatePicker.RangePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cInvCode"
              label="料品编码"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Flex
              justify="end"
              align="center"
              gap={8}
            >
              <Tooltip title="搜索">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => queryClient.invalidateQueries()}
                >
                  <LucideSearch />
                </Button>
              </Tooltip>
              <Tooltip title="重置">
                <Button
                  htmlType="submit"
                  onClick={() => {
                    form.resetFields()
                    setFilterData?.({})
                    queryClient.invalidateQueries()
                  }}
                >
                  <LucideRefreshCcw />
                </Button>
              </Tooltip>

              {/* <Tooltip title={expand ? '折叠' : '展开'}>
                <Button onClick={() => setExpand(!expand)}>
                  <LucideChevronsDown
                    className={clsx('transition-all', expand ? 'rotate-180' : 'rotate-0')}
                  />
                </Button>
              </Tooltip> */}
            </Flex>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
