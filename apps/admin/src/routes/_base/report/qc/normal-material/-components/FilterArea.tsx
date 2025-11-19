import type { FormInstance } from 'antd'
import type { Dispatch, SetStateAction } from 'react'

import * as Inventory from '@/features/digital-modeling/products/inventory'
import { defaultMinPageDto } from '@/features/pagination'
import { LIST_QK } from '@/features/report/qc/normal-material'

import type { FilterForm } from '../-types'

interface FilterAreaProps {
  form: FormInstance<FilterForm>
  setFilterData?: Dispatch<SetStateAction<FilterForm>>
}

export default function FilterArea(props: FilterAreaProps) {
  const { form, setFilterData } = props

  const { data: { data: parentInventoryCandidates } = {} } = useQuery(
    Inventory.listQO({
      ...defaultMinPageDto,
      conditions: 'IsProduct = true'
    })
  )

  // const [expand, setExpand] = useState(false)

  return (
    <Card size="small">
      <Form<FilterForm>
        form={form}
        layout="horizontal"
        initialValues={{ isExpand: true }}
        labelCol={{ span: 7 }}
        onFinish={(values) => setFilterData?.({ ...values })}
      >
        <Row>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cInvCode"
              label="产品名称"
            >
              <Select
                options={parentInventoryCandidates}
                fieldNames={{
                  label: 'cInvCode',
                  value: 'cInvCode'
                }}
                showSearch
                filterOption={(input, option) =>
                  (option?.cInvCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                  (option?.cInvName ?? '').toLowerCase().includes(input.toLowerCase())
                }
                optionRender={(option) => (
                  <Flex justify="space-between">
                    <span>{option.data.cInvCode}</span>
                    <span>{option.data.cInvName}</span>
                  </Flex>
                )}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={16}>
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
                    queryClient.resetQueries({ queryKey: [LIST_QK] })
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
