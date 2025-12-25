import type { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { ButtonProps } from 'antd'

import { listQO } from '../../queries'
import { LIST_QK } from '../../query-keys'
import type { InventoryVo } from '../../types'

interface ProductCodeRemoteSelectProps extends RemoteSelectProps {
  onConfirm?: (selected: InventoryVo) => void
  button?: ButtonProps
}

interface FilterForm {
  cInvCode?: string
  cInvName?: string
  IsMaterial?: boolean
}

export default function ProductCodeRemoteSelect(props: ProductCodeRemoteSelectProps) {
  const { onConfirm, button, ...otherProps } = props

  const { showMessage } = useMessage()
  const queryClient = useQueryClient()
  const refModal = useModal()
  const [form] = Form.useForm<InventoryVo>()

  const gridRef = useRef<AgGridReact<InventoryVo>>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>({})

  const filterDefs = useMemo<FilterDef<FilterForm>[]>(
    () => [
      { name: 'cInvCode', label: '子件编码', type: 'input' },
      { name: 'cInvName', label: '子件名称', type: 'input' }
    ],
    []
  )

  const columnDefs = useMemo<ColDef<InventoryVo>[]>(
    () => [
      { field: 'cInvCode', headerName: '子件编码', flex: 1 },
      { field: 'cInvName', headerName: '子件名称', flex: 1 }
    ],
    []
  )

  const {
    data: { data: tableData = [], dataCount } = {},
    isFetching,
    isPlaceholderData
  } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'IsMaterial', type: 'eq', val: true },
        { key: 'cInvCode', type: 'like', val: filterData.cInvCode },
        { key: 'cInvName', type: 'like', val: filterData.cInvName }
      ])
    })
  )

  const handleSelect = () => {
    if (!selectedRows.length) {
      showMessage('select-data')
      return
    }
    const selected = selectedRows.at(0) as InventoryVo
    onConfirm?.(selected)
    refModal.close()
  }

  useEffect(() => {
    if (refModal.open) {
      form.setFieldsValue({})
      gridRef.current?.api.deselectAll()
      setPageParams(defaultPageDto)
      setSelectedRows([])
      setFilterData({})
    } else {
      form.resetFields()
    }
  }, [form, refModal.open])

  return (
    <>
      <Space.Compact block>
        <RemoteSelect
          styles={{
            popup: {
              root: {
                width: 500
              }
            }
          }}
          optionRender={(option) => (
            <Flex justify="space-between">
              <span>{option.data.cInvCode}</span>
              <span>{option.data.cInvName}</span>
            </Flex>
          )}
          fieldNames={{
            label: 'cInvName',
            value: 'cInvCode'
          }}
          labelRender={(v) => v.value}
          fetchOptions={(search) =>
            queryClient
              .fetchQuery(
                listQO({
                  ...defaultMinPageDto,
                  conditions: queryBuilder([
                    { key: 'IsProduct', type: 'eq', val: true },
                    { key: 'cInvCode', type: 'like', val: search }
                  ])
                })
              )
              .then((res) => res.data)
          }
          onSelect={(_value, option) => onConfirm?.(option as InventoryVo)}
          {...otherProps}
        />

        <Button
          icon={<LucideEllipsis />}
          onClick={() => refModal.toggle()}
          {...button}
        />
      </Space.Compact>

      <RefModal
        modal={refModal}
        filterArea={{
          form: {
            form,
            onFinish: (values) => setFilterData?.({ ...values })
          },
          filterDefs,
          onReset: () => setFilterData?.({}),
          queryKey: LIST_QK
        }}
        title="选择子件"
        onOk={() => handleSelect()}
      >
        <div className="ag-theme-quartz h-[600px]">
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
            current={pageParams.pageIndex}
            pageSize={pageParams.pageSize}
            pageSizeOptions={defaultPageSizeOptions}
            onChange={(pageIndex, pageSize) =>
              setPageParams({ ...pageParams, pageIndex, pageSize })
            }
          />
        </Flex>
      </RefModal>
    </>
  )
}
