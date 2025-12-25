import type { Dispatch, SetStateAction } from 'react'

import * as Department from '@/features/department'

import type { FilterForm } from '../-types'

interface FilterAreaProps {
  setFilterData?: Dispatch<SetStateAction<FilterForm>>
}

export default function FilterArea(props: FilterAreaProps) {
  const { setFilterData } = props

  const [form] = Form.useForm()

  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )

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
              name="cInvCodeStart"
              label="料品编码（开始）"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cInvCodeEnd"
              label="料品编码（结束）"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cDepCode"
              label="部门"
            >
              <Select
                options={departmentCandidates}
                fieldNames={{
                  label: 'cDepName',
                  value: 'cDepCode'
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="dStartDate"
              label="开始日期"
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="dEndDate"
              label="结束日期"
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={8}>
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
                  onClick={() => {
                    form.resetFields()
                    setFilterData?.({})
                    queryClient.invalidateQueries()
                  }}
                >
                  <LucideRefreshCcw />
                </Button>
              </Tooltip>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
