import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useReactToPrint } from 'react-to-print'

import { defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import {
  listQO,
  printDetailQO,
  type PrintDetailVo,
  type ProductionOrderVo,
  useAbandonMutation,
  useAuditMutation,
  useCloseMutation,
  useDeleteMutation,
  useOpenMutation
} from '@/features/production-plan/production-order'
import { queryBuilder } from '@/features/query-builder'

import { FilterArea } from './-components'
import styles from './-styles/print.module.scss'
import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/production-plan/production-order/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>({})
  const [printData, setPrintData] = useState<PrintDetailVo>({})

  const reactToPrintFn = useReactToPrint({ contentRef })

  const { data, isFetching, isPlaceholderData } = useQuery(
    listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cVouchType', type: 'eq', val: filterData.cVouchType },
        { key: 'iStatus', type: 'eq', val: filterData.iStatus },
        { key: 'cCode', type: 'like', val: filterData.cCode },
        { key: 'dBeginTime', type: 'date-range', val: filterData.dBeginTime },
        { key: 'cInvCode', type: 'like', val: filterData.cInvCode }
      ])
    })
  )

  const auditMutation = useAuditMutation()
  const abandonMutation = useAbandonMutation()
  const openMutation = useOpenMutation()
  const closeMutation = useCloseMutation()
  const deleteMutation = useDeleteMutation()

  const columnDefs = useMemo<ColDef<ProductionOrderVo>[]>(
    () => [
      { field: 'cCode', headerName: '生产订单号' },
      {
        field: 'cSourceRowUID',
        headerName: '行号',
        valueGetter: (params) => (params.node!.rowIndex ?? 0) + 1
      },
      { field: 'cVouchTypeName', headerName: '类型' },
      { field: 'cInvName', headerName: '车间' },
      { field: 'iStatus', headerName: '状态' },
      { field: 'cCreateUserName', headerName: '制单人' },
      { field: 'cModifyUserName', headerName: '审核人' },
      { field: 'cModifyUserName', headerName: '关闭人' },
      { field: 'dBeginTime', headerName: '订单时间' },
      { field: 'cInvCode', headerName: '料品编码' },
      { field: 'cInvName', headerName: '料品名称' },
      { field: 'cInvStd', headerName: '规格型号' },
      { field: 'nQuantity', headerName: '生产数量' },
      { field: 'cUnitName', headerName: '计量单位' },
      { field: 'dBeginTime', headerName: '开工时间' },
      { field: 'dEndTime', headerName: '完工时间' },
      { field: 'cAssQuantity', headerName: '已完工数量' },
      { field: 'RestQuantity', headerName: '未完工数量' },
      { field: 'cBomTypeName', headerName: 'BOM类型' },
      { field: 'cBomVersion', headerName: 'BOM版本' },
      { field: 'cBomVersion', headerName: 'BOM版本说明' },
      { field: 'dVerifyTime', headerName: '审核时间' },
      { field: 'dEndTime', headerName: '关闭时间' },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<ProductionOrderVo>) => (
          <Space>
            <Link
              to="/production-plan/production-order/$id/edit"
              params={{ id: params.data!.UID }}
            >
              <Button
                size="small"
                color="primary"
                variant="text"
              >
                编辑
              </Button>
            </Link>
          </Space>
        )
      }
    ],
    []
  )

  return (
    <PageContainer>
      <Space
        direction="vertical"
        className="w-full"
      >
        <FilterArea setFilterData={setFilterData} />
        <Flex
          className="h-8"
          justify="space-between"
          align="center"
        >
          <Space>
            <Button
              onClick={async () => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                if (selectedRows.length > 1) {
                  showMessage('select-only-one')
                  return
                }
                setPrintData(
                  (await queryClient.ensureQueryData(printDetailQO(selectedRows[0].UID))).at(0) ??
                    {}
                )
                setTimeout(() => reactToPrintFn(), 16)
              }}
            >
              打印
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                auditMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              审核
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                abandonMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              弃审
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                openMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              打开
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                closeMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              关闭
            </Button>
            <Button
              onClick={() => {
                if (selectedRows.length === 0) {
                  showMessage('select-data')
                  return
                }
                deleteMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              删除
            </Button>
          </Space>
          <Space>
            <Link to="/production-plan/production-order/add">
              <Button type="primary">新增</Button>
            </Link>
          </Space>
        </Flex>

        <div className="ag-theme-quartz h-[calc(100vh-210px)]">
          <AgGridReact<ProductionOrderVo>
            ref={gridRef}
            getRowId={(params) => params.data.UID}
            columnDefs={columnDefs}
            rowData={data?.data}
            rowSelection={{
              mode: 'multiRow'
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
            total={data?.dataCount}
            pageSize={pageParams.pageSize}
            pageSizeOptions={defaultPageSizeOptions}
            onChange={(pageIndex, pageSize) =>
              setPageParams({ ...pageParams, pageIndex, pageSize })
            }
          />
        </Flex>
      </Space>

      <div
        ref={contentRef}
        className={styles.printContent}
      >
        <div className="relative h-screen p-8">
          <div className="flex items-center justify-between">
            <div />
            <div className="text-2xl">Elan 配方投产单</div>
            <div className="right-0">批号：{printData?.cDefindParm06}</div>
          </div>
          <div className="mt-4 border-b-2 border-black text-lg">
            <div className="grid grid-cols-4">
              <div>编号：{printData?.cInvCode}</div>
              <div>名称：{printData?.cInvName}</div>
              <div>确认状态：{}</div>
              <div>{DateUtils.formatTime(new Date(), 'YYYY/MM/DD')}</div>
            </div>
          </div>

          <div className="mt-2 border-b border-black text-lg">
            <div className="grid grid-cols-6">
              <div>编号</div>
              <div>名称</div>
              <div>配比</div>
              <div>用量（公斤）</div>
              <div>实际投料</div>
              <div>验单号</div>
            </div>
          </div>

          {printData.List_BOM?.map((item, index) => (
            <div
              className="mt-2 border-b border-black text-lg"
              key={index}
            >
              <div className="grid grid-cols-6">
                <div>{item?.cMaterialCode}</div>
                <div>{item?.cMaterialName}</div>
                <div>{item?.cDefindParm01}</div>
                <div>{item?.nQuantity}</div>
                <div />
                <div />
              </div>
            </div>
          ))}

          <div className="mt-2 flex justify-end space-x-12">
            <div>总配比（%）：{printData?.SumRate}</div>
            <div>总用量（公斤）：{printData?.SumQuantity}</div>
          </div>

          <div className="absolute inset-x-0 bottom-0 m-auto w-full px-8 pb-8">
            <div className="flex w-full justify-between border-t border-black pt-2 text-sm">
              <div className={styles.textUnderline}>签发：</div>
              <div className={styles.textUnderline}>生产：</div>
              <div className={styles.textUnderline}>核对：</div>
              <div className={styles.textUnderline}>库存管理：</div>
              <div className={styles.textUnderline}>生产日期：</div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
