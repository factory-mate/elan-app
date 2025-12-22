import type { Dispatch, SetStateAction } from 'react'

import type { FilterForm } from '../-types'

interface FilterAreaProps {
  setFilterData?: Dispatch<SetStateAction<FilterForm>>
}

export default function FilterArea(props: FilterAreaProps) {
  const { setFilterData } = props

  const [form] = Form.useForm()

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
              name="cInvCode"
              label="料品编码"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FilterForm>
              name="cInvName"
              label="料品名称"
            >
              <Input />
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
