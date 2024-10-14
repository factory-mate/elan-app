interface BasicFilterProps {}

export default function BasicFilter(props: BasicFilterProps) {
  const colSpan = useResponsiveColSpan()

  const [showExpand, setShowExpand] = useState(true)
  const [expand, setExpand] = useState(false)

  return (
    <Card size="small">
      <Form
        layout="horizontal"
        initialValues={{}}
        labelCol={{ span: 7 }}
      >
        <Row>
          <Col span={colSpan}>
            <Form.Item
              label="单位编号"
              className={clsx(expand ? 'mb-2' : 'mb-0')}
            >
              <Input placeholder="请输入关键字" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label="单位名称xx"
              className={clsx(expand ? 'mb-2' : 'mb-0')}
            >
              <Input placeholder="请输入关键字" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label="单位名称xx"
              className={clsx(expand ? 'mb-2' : 'mb-0')}
            >
              <Input placeholder="请输入关键字" />
            </Form.Item>
          </Col>
          {expand && (
            <>
              <Col span={colSpan}>
                <Form.Item
                  label="单位名称单"
                  className={clsx(expand ? 'mb-2' : 'mb-0')}
                >
                  <Input placeholder="请输入关键字" />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item
                  label="单位名称"
                  className={clsx(expand ? 'mb-2' : 'mb-0')}
                >
                  <Input placeholder="请输入关键字" />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item
                  label="单位名称"
                  className={clsx(expand ? 'mb-2' : 'mb-0')}
                >
                  <Input placeholder="请输入关键字" />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item
                  label="单位名称xx"
                  className={clsx(expand ? 'mb-2' : 'mb-0')}
                >
                  <Input placeholder="请输入关键字" />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item
                  label="单位名称"
                  className={clsx(expand ? 'mb-2' : 'mb-0')}
                >
                  <Input placeholder="请输入关键字" />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item
                  label="单位名称"
                  className={clsx(expand ? 'mb-2' : 'mb-0')}
                >
                  <Input placeholder="请输入关键字" />
                </Form.Item>
              </Col>
            </>
          )}
          <Col span={colSpan}>
            <Flex
              justify="end"
              align="center"
              gap={8}
              className="mt-2 sm:mt-0"
            >
              <Tooltip title="搜索">
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  <LucideSearch />
                  {/* 搜索 */}
                </Button>
              </Tooltip>
              <Tooltip title="重置">
                <Button>
                  <LucideRefreshCcw />
                  {/* 重置 */}
                </Button>
              </Tooltip>
              {showExpand && (
                <Tooltip title={expand ? '折叠' : '展开'}>
                  <Button onClick={() => setExpand(!expand)}>
                    <LucideChevronsDown
                      className={clsx('transition-all', expand ? 'rotate-180' : 'rotate-0')}
                    />
                    {/* {expand ? '折叠' : '展开'} */}
                  </Button>
                </Tooltip>
              )}
            </Flex>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
