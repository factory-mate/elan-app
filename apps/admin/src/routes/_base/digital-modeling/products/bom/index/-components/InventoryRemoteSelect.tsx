import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { SelectProps } from 'antd'

import type { InventoryVo } from '@/features/digital-modeling/products/inventory'
import { InventoryAPI, listQO } from '@/features/digital-modeling/products/inventory'
import { defaultMinPageDto, defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import { queryBuilder } from '@/features/query-builder'

interface InventoryRemoteSelectProps extends SelectProps {}

interface FilterForm {
  cInvCode?: string
  cInvName?: string
  IsProduct?: boolean
}

export default function InventoryRemoteSelect(props: InventoryRemoteSelectProps) {
  const { message } = useMessage()
  const [form] = Form.useForm<InventoryVo>()

  const refModal = useModal()

  const [data, setData] = useState<SelectProps['options']>([])
  const [value, setValue] = useState<string>()
  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>({})

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentValue = useRef<string>('')

  const gridRef = useRef<AgGridReact<InventoryVo>>(null)

  const {
    data: { data: tableData = [], dataCount } = {},
    isFetching,
    isPlaceholderData
  } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'IsProduct', type: 'eq', val: true },
        { key: 'cInvCode', type: 'like', val: filterData.cInvCode },
        { key: 'cInvName', type: 'like', val: filterData.cInvName }
      ])
    })
  )

  const columnDefs = useMemo<ColDef<InventoryVo>[]>(
    () => [
      { field: 'cInvName', headerName: '产品编码', flex: 1 },
      { field: 'cInvCode', headerName: '产品名称', flex: 1 }
    ],
    []
  )

  const fetchData = (v: string, callback: (data: { value: string }[]) => void) => {
    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = null
    }

    currentValue.current = v

    const handler = () => {
      InventoryAPI.list({
        ...defaultMinPageDto,
        conditions: queryBuilder([
          { key: 'IsProduct', type: 'eq', val: true },
          { key: 'cInvCode', type: 'like', val: currentValue.current.replaceAll(' ', '') }
        ])
      }).then((res) => {
        if (currentValue.current === v) {
          const d = res.data.map((i) => ({
            ...i,
            value: i.cInvCode
          }))
          callback(d ?? [])
        }
      })
    }

    // if (v) {
    timeout.current = setTimeout(handler, 300)
    // } else {
    //   callback([])
    // }
  }

  const handleSearch = (newValue: string) => {
    fetchData(newValue, setData)
  }

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const handleSave = () => {
    console.log(selectedRows)
    if (!selectedRows.length) {
      message.warning('请选择数据')
      return
    }
    const selected = selectedRows[0] as InventoryVo
  }

  useEffect(() => {
    fetchData('', setData)
  }, [])

  return (
    <Space.Compact block>
      <Select
        options={data}
        fieldNames={{
          label: 'cInvCode',
          value: 'cInvCode'
        }}
        showSearch
        allowClear
        value={value}
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        optionRender={(option) => (
          <Flex justify="space-between">
            <span>{option.data.cInvCode}</span>
            <span> {option.data.cInvName}</span>
          </Flex>
        )}
        {...props}
      />
      <Button
        icon={<LucideEllipsis style={{ marginTop: 4 }} />}
        onClick={() => refModal.toggle()}
      />

      <Modal
        title="选择产品"
        open={refModal.open}
        onOk={() => handleSave()}
        onCancel={() => refModal.setOpen?.(false)}
        forceRender
        width="70%"
        centered
      >
        <Space
          className="w-full pl-2"
          direction="vertical"
        >
          <Form
            className="pt-3"
            name="add-form"
            form={form}
            labelCol={{ span: 6 }}
            initialValues={{}}
            onFinish={(values) => setFilterData?.({ ...values })}
          >
            <Row>
              <Col span={8}>
                <Form.Item<InventoryVo>
                  name="cInvCode"
                  label="产品编码"
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item<InventoryVo>
                  name="cInvName"
                  label="产品名称"
                >
                  <Input allowClear />
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

          <div className="ag-theme-quartz h-[500px]">
            <AgGridReact<InventoryVo>
              ref={gridRef}
              columnDefs={columnDefs}
              rowData={tableData}
              rowSelection={{
                mode: 'singleRow',
                enableClickSelection: true
              }}
              selectionColumnDef={{
                sortable: true,
                suppressHeaderMenuButton: true,
                pinned: 'left',
                lockPinned: true
              }}
              loading={isFetching}
              onSelectionChanged={(event) => setSelectedRows(event.api.getSelectedRows())}
            />
          </div>
          <Flex
            justify="end"
            align="center"
          >
            <Pagination
              disabled={isPlaceholderData}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `共计 ${total} 条`}
              total={dataCount}
              pageSize={pageParams.pageSize}
              pageSizeOptions={defaultPageSizeOptions}
              onChange={(pageIndex, pageSize) =>
                setPageParams({ ...pageParams, pageIndex, pageSize })
              }
            />
          </Flex>
        </Space>
      </Modal>
    </Space.Compact>
  )
}
