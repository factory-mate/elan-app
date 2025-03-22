import type { ColDef, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useReactToPrint } from 'react-to-print'

import * as Dicts from '@/features/dicts'
import * as Department from '@/features/digital-modeling/orgs/department'
import * as BOM from '@/features/digital-modeling/products/bom'
import * as Inventory from '@/features/digital-modeling/products/inventory'
import { defaultMaxPageDto, defaultPageDto, defaultPageSizeOptions } from '@/features/pagination'
import * as ProductionOrder from '@/features/production-plan/production-order'
import { queryBuilder } from '@/features/query-builder'

import { BOMListModal, FilterArea } from './-components'
import styles from './-styles/print.module.scss'
import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/production-plan/production-order/')({
  component: RouteComponent
})

function RouteComponent() {
  const { showMessage } = useMessage()
  const bomListModal = useModal()

  const gridRef = useRef<AgGridReact>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>({})
  const [printData, setPrintData] = useState<ProductionOrder.PrintDetailVo>({})
  const currentOperateRow = useRef<ProductionOrder.ProductionOrderBody | null>(null)
  const [currentOperateUID, setCurrentOperateRowUID] = useState<string | null>(null)

  const reactToPrintFn = useReactToPrint({ contentRef })

  const { data, isFetching, isPlaceholderData, refetch } = useQuery(
    ProductionOrder.listQO({
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
  const { data: bomCandidates } = useSuspenseQuery(Dicts.fullListQO('BOMType'))
  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )
  const { data: { data: inventoryCandidates } = {} } = useQuery(
    Inventory.listQO({
      ...defaultMaxPageDto,
      conditions: 'IsProduct = true'
    })
  )

  const auditMutation = ProductionOrder.useAuditMutation()
  const abandonMutation = ProductionOrder.useAbandonMutation()
  const openMutation = ProductionOrder.useOpenMutation()
  const closeMutation = ProductionOrder.useCloseMutation()
  const deleteMutation = ProductionOrder.useDeleteMutation()
  const editMutation = ProductionOrder.useEditMutation()

  const columnDefs = useMemo<ColDef<ProductionOrder.ProductionOrderVo>[]>(
    () => [
      { field: 'cCode', headerName: '生产订单号' },
      { field: 'iRow', headerName: '行号' },
      { field: 'cVouchTypeName', headerName: '类型' },
      {
        field: 'cDefindParm04',
        headerName: '车间',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) =>
          currentOperateUID === params.data?.UID ? (
            <Select
              className="size-full"
              variant="borderless"
              value={params.data?.cDefindParm04}
              options={departmentCandidates}
              fieldNames={Department.departmentSelectFieldNames}
              onSelect={(value) =>
                params.api.applyTransaction({
                  update: [{ ...params.data, cDefindParm04: value }]
                })
              }
            />
          ) : (
            params.data?.cDefindParm04
          )
      },
      { field: 'cCreateUserName', headerName: '制单人' },
      { field: 'cModifyUserName', headerName: '审核人' },
      { field: 'cModifyUserName', headerName: '关闭人' },
      { field: 'dBeginTime', headerName: '订单时间' },
      {
        field: 'cInvCode',
        headerName: '料品编码',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) =>
          currentOperateUID === params.data?.UID ? (
            <Select
              className="size-full"
              variant="borderless"
              value={params.data?.cInvCode}
              options={inventoryCandidates}
              fieldNames={{
                value: 'cInvCode',
                label: 'cInvCode'
              }}
              showSearch
              filterOption={(input, option) =>
                (option?.cInvCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                (option?.cInvName ?? '').toLowerCase().includes(input.toLowerCase())
              }
              onSelect={async (value, option) => {
                const { data: versionCandidates = [] } = await queryClient.ensureQueryData(
                  BOM.listQO({
                    ...defaultMaxPageDto,
                    conditions: `cInvCode=${value} && iStatus=1 && dEffectiveDate<=${DateUtils.formatTime(new Date(), 'YYYY-MM-DD')} && dExpirationDate>=${DateUtils.formatTime(new Date(), 'YYYY-MM-DD')}`,
                    orderByFileds: 'dCreateTime desc'
                  })
                )
                const matchedBom = versionCandidates.at(0)
                params.api.applyTransaction({
                  update: [
                    {
                      ...params.data,
                      cInvCode: value,
                      cInvName: option.cInvName,
                      cInvStd: option.cInvstd,
                      cUnitCode: option.cProductUnitCode,
                      cUnitName: option.cProductUnitName,
                      cBomUID: matchedBom?.UID ?? undefined,
                      cBomVersion: matchedBom?.cVersion ?? undefined,
                      cVerisionMemo: matchedBom?.cVerisionMemo ?? undefined,
                      versionCandidates
                    }
                  ]
                })
              }}
              optionRender={(option) => (
                <Flex justify="space-between">
                  <span>{option.data.cInvCode}</span>
                  <span> {option.data.cInvName}</span>
                </Flex>
              )}
            />
          ) : (
            params.data?.cInvCode
          )
      },
      { field: 'cInvName', headerName: '料品名称' },
      { field: 'cInvStd', headerName: '规格型号' },
      { field: 'cUnitName', headerName: '计量单位' },
      {
        field: 'nQuantity',
        headerName: '生产数量',
        cellDataType: 'number',
        cellEditorParams: {
          precision: 0,
          step: 1,
          showStepperButtons: true
        },
        editable: (params) => currentOperateUID === params.data?.UID
      },
      {
        field: 'dBeginTime',
        headerName: '开工时间',
        cellDataType: 'dateString',
        valueFormatter: (params: ValueFormatterParams) =>
          params.value ? DateUtils.formatTime(params.value, 'YYYY-MM-DD') : '',
        editable: (params) => currentOperateUID === params.data?.UID
      },
      {
        field: 'dEndTime',
        headerName: '完工时间',
        cellDataType: 'dateString',
        valueFormatter: (params: ValueFormatterParams) =>
          params.value ? DateUtils.formatTime(params.value, 'YYYY-MM-DD') : '',
        editable: (params) => currentOperateUID === params.data?.UID
      },
      { field: 'cAssQuantity', headerName: '已完工数量' },
      { field: 'RestQuantity', headerName: '未完工数量' },
      {
        field: 'cBomType',
        headerName: 'BOM类型',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) =>
          currentOperateUID === params.data?.UID ? (
            <Select
              className="size-full"
              variant="borderless"
              value={params.data?.cBomType}
              options={bomCandidates}
              fieldNames={Dicts.dictSelectFieldNames}
              onSelect={(value) =>
                params.api.applyTransaction({
                  update: [{ ...params.data, cBomType: value }]
                })
              }
            />
          ) : (
            params.data?.cBomTypeName
          )
      },
      {
        field: 'cBomVersion',
        headerName: 'BOM版本',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) =>
          currentOperateUID === params.data?.UID ? (
            <Select
              className="size-full"
              variant="borderless"
              value={params.data?.cBomVersion}
              options={params.data?.versionCandidates}
              fieldNames={{
                value: 'cVersion',
                label: 'cVersion'
              }}
              onSelect={(value, option) => {
                params.api.applyTransaction({
                  update: [
                    {
                      ...params.data,
                      cBomVersion: value,
                      cBomUID: option.UID,
                      cVerisionMemo: option.cVerisionMemo
                    }
                  ]
                })
              }}
            />
          ) : (
            params.data?.cBomVersion
          )
      },
      {
        field: 'cVerisionMemo',
        headerName: 'BOM版本说明',
        editable: (params) => currentOperateUID === params.data?.UID
      },
      { field: 'dVerifyTime', headerName: '审核时间' },
      { field: 'dEndTime', headerName: '关闭时间' },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderVo>) => (
          <Space>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                if (currentOperateUID !== params.data?.UID) {
                  currentOperateRow.current = params.data ?? null
                  setCurrentOperateRowUID(params.data?.UID ?? null)
                } else {
                  params.api.stopEditing()
                  editMutation.mutate(
                    {
                      ...params.data,
                      bodys: [params.data]
                    },
                    {
                      onSuccess: () => {
                        currentOperateRow.current = null
                        setCurrentOperateRowUID(null)
                      }
                    }
                  )
                }
              }}
            >
              {currentOperateUID === params.data?.UID ? '保存' : '编辑'}
            </Button>
            {currentOperateUID === params.data?.UID && (
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={() => {
                  refetch()
                  currentOperateRow.current = null
                  setCurrentOperateRowUID(null)
                }}
              >
                取消
              </Button>
            )}
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                currentOperateRow.current = params.data ?? null
                setCurrentOperateRowUID(params.data?.UID ?? null)
                bomListModal.toggle()
              }}
              disabled={currentOperateUID === params.data?.UID}
            >
              子件
            </Button>
          </Space>
        )
      }
    ],
    [
      bomCandidates,
      bomListModal,
      currentOperateUID,
      departmentCandidates,
      editMutation,
      inventoryCandidates,
      refetch
    ]
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
                  (
                    await queryClient.ensureQueryData(
                      ProductionOrder.printDetailQO(selectedRows[0].UID)
                    )
                  ).at(0) ?? {}
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
          <AgGridReact<ProductionOrder.ProductionOrderVo>
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
            editType="fullRow"
            loading={isFetching}
            onSelectionChanged={(event) => setSelectedRows(event.api.getSelectedRows())}
            getRowStyle={(params) => {
              if (params.data?.UID === currentOperateUID) {
                return {
                  backgroundColor: '#fff7e6'
                }
              }
              return undefined
            }}
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

      <BOMListModal
        open={bomListModal.open}
        setOpen={bomListModal.setOpen}
        currentOperateRow={currentOperateRow}
      />

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
