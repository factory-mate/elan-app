import { createLazyFileRoute } from '@tanstack/react-router'
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useReactToPrint } from 'react-to-print'

import * as BOM from '@/features/bom'
import * as Department from '@/features/department'
import * as Dicts from '@/features/dicts'
import * as Inventory from '@/features/inventory'
import * as ProductionOrder from '@/features/production-order'

import { BOMListModal } from './-components'
import styles from './-styles/print.module.scss'
import type { FilterForm } from './-types'

export const Route = createLazyFileRoute('/_base/production-mgt/production-order/')({
  component: RouteComponent
})

function RouteComponent() {
  const [form] = Form.useForm()
  const { showMessage } = useMessage()
  const location = useLocation()
  const bomListModal = useModal()
  const queryClient = useQueryClient()
  const { getContextMenuItems, initTableSettings } = useTableSettings()

  const filterCacheStore = useFilterCacheStore()

  const gridRef = useRef<AgGridReact>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [pageParams, setPageParams] = useState(defaultPageDto)
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([])
  const [filterData, setFilterData] = useState<FilterForm>(
    filterCacheStore.getItem(location.pathname) ?? { iStatus: [0, 1] }
  )
  const [printData, setPrintData] = useState<ProductionOrder.PrintDetailGroupedVo[]>([])
  const currentOperateRow = useRef<ProductionOrder.ProductionOrderBody | null>(null)
  const [currentOperateUID, setCurrentOperateRowUID] = useState<string | null>(null)

  const reactToPrintFn = useReactToPrint({ contentRef })

  const { data, isFetching, isPlaceholderData, refetch } = useQuery(
    ProductionOrder.listQO({
      ...pageParams,
      conditions: queryBuilder<FilterForm>([
        { key: 'cStandardType', type: 'eq', val: filterData.cStandardType },
        { key: 'cVouchType', type: 'eq', val: filterData.cVouchType },
        { key: 'iStatus', type: 'in', val: filterData.iStatus },
        { key: 'cCode', type: 'like', val: filterData.cCode },
        { key: 'dBeginTime', type: 'date-range', val: filterData.dBeginTime },
        { key: 'cInvCode', type: 'like', val: filterData.cInvCode },
        { key: 'cInvName', type: 'like', val: filterData.cInvName },
        { key: 'cDefindParm10', type: 'eq', val: filterData.cDefindParm10 }
      ])
    })
  )
  const { data: bomCandidates } = useQuery(Dicts.fullListQO('BOMType'))
  const { data: departmentCandidates } = useQuery(
    Department.fullListQO({ conditions: 'bProduct = true' })
  )
  const { data: standardTypeCandidates } = useQuery(Dicts.fullListQO('ProductVouchStandardType'))
  const { data: vouchTypeCandidates } = useQuery(Dicts.fullListQO('ProductVouchType'))

  const auditMutation = ProductionOrder.useAuditMutation()
  const abandonMutation = ProductionOrder.useAbandonMutation()
  const openMutation = ProductionOrder.useOpenMutation()
  const closeMutation = ProductionOrder.useCloseMutation()
  const deleteMutation = ProductionOrder.useDeleteMutation()
  const editMutation = ProductionOrder.useEditMutation()
  const exportMutation = ProductionOrder.useExportMutation()
  const pushMutation = ProductionOrder.usePushMutation()

  const filterDefs = useMemo<FilterDef<FilterForm>[]>(
    () => [
      {
        name: 'iStatus',
        label: '生产订单状态',
        type: 'select',
        selectProps: {
          mode: 'multiple',
          options: [
            { label: '保存', value: ProductionOrder.TaskStatus.ABANDON },
            { label: '审核', value: ProductionOrder.TaskStatus.AUDIT },
            { label: '关闭', value: ProductionOrder.TaskStatus.CLOSE }
          ]
        }
      },
      {
        name: 'cStandardType',
        label: '生产订单类型',
        type: 'select',
        selectProps: {
          options: standardTypeCandidates,
          fieldNames: {
            label: 'cDictonaryName',
            value: 'cDictonaryCode'
          }
        }
      },
      {
        name: 'cVouchType',
        label: '生产订单类别',
        type: 'select',
        selectProps: {
          options: vouchTypeCandidates,
          fieldNames: {
            label: 'cDictonaryName',
            value: 'cDictonaryCode'
          }
        }
      },
      { name: 'cCode', label: '生产订单编号', type: 'input' },
      { name: 'dBeginTime', label: '订单日期', type: 'date-range-picker' },
      { name: 'cInvCode', label: '料品编码', type: 'input' },
      { name: 'cInvName', label: '料品名称', type: 'input' },
      {
        name: 'cDefindParm10',
        label: '是否复核',
        type: 'select',
        selectProps: {
          options: [
            { label: '是', value: '1' },
            { label: '否', value: '0' }
          ]
        }
      }
    ],
    [standardTypeCandidates, vouchTypeCandidates]
  )

  const columnDefs = useMemo<ColDef<ProductionOrder.ProductionOrderVo>[]>(
    () => [
      { field: 'dCreateTime', headerName: '订单日期' },
      { field: 'cCode', headerName: '生产订单号' },
      { field: 'iRow', headerName: '行号' },
      {
        field: 'cVouchType',
        headerName: '类别',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) =>
          currentOperateUID === params.data?.UID ? (
            <Select
              className="size-full"
              variant="borderless"
              value={params.data?.cVouchType}
              options={vouchTypeCandidates}
              fieldNames={{
                label: 'cDictonaryName',
                value: 'cDictonaryCode'
              }}
              onSelect={(value, option) =>
                params.api.applyTransaction({
                  update: [
                    {
                      ...params.data,
                      cVouchType: value,
                      cVouchTypeName: option.cDictonaryName
                    }
                  ]
                })
              }
            />
          ) : (
            params.data?.cVouchTypeName
          )
      },
      {
        field: 'cInvCode',
        headerName: '料品编码',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) =>
          currentOperateUID === params.data?.UID ? (
            <Inventory.ProductCodeRemoteSelect
              className="size-full"
              variant="borderless"
              allowClear={false}
              button={{ type: 'link' }}
              value={params.data?.cInvCode}
              onConfirm={async (v) => {
                const { data: versionCandidates = [] } = await queryClient.fetchQuery(
                  BOM.listQO({
                    ...defaultMaxPageDto,
                    conditions: queryBuilder([
                      { key: 'cInvCode', type: 'eq', val: v.cInvCode },
                      { key: 'iStatus', type: 'eq', val: 1 },
                      {
                        key: 'dEffectiveDate',
                        type: 'lte',
                        val: DateUtils.formatTime(new Date(), 'YYYY-MM-DD')
                      },
                      {
                        key: 'dExpirationDate',
                        type: 'gte',
                        val: DateUtils.formatTime(new Date(), 'YYYY-MM-DD')
                      }
                    ]),
                    orderByFileds: 'dCreateTime desc'
                  })
                )
                const matchedBom = versionCandidates.at(0)
                params.api.applyTransaction({
                  update: [
                    {
                      ...params.data,
                      cInvCode: v.cInvCode,
                      cInvName: v.cInvName,
                      cInvStd: v.cInvstd,
                      cUnitCode: v.cProductUnitCode,
                      cUnitName: v.cProductUnitName,
                      cBomUID: matchedBom?.UID ?? undefined,
                      cBomVersion: matchedBom?.cVersion ?? undefined,
                      cVerisionMemo: matchedBom?.cVerisionMemo ?? undefined,
                      versionCandidates
                    }
                  ]
                })
              }}
            />
          ) : (
            params.data?.cInvCode
          )
      },
      { field: 'cInvName', headerName: '料品名称' },
      { field: 'cInvStd', headerName: '规格型号' },
      {
        field: 'nQuantity',
        headerName: '生产数量',
        cellDataType: 'number',
        cellEditorParams: {
          precision: 4,
          showStepperButtons: true
        },
        editable: (params) => currentOperateUID === params.data?.UID
      },
      { field: 'u8Quantity', headerName: '现存量' },
      { field: 'cDefindParm06', headerName: '生产批号' },
      {
        field: 'cDefindParm05',
        headerName: '包装规格',
        editable: (params) => currentOperateUID === params.data?.UID
      },
      { field: 'cDefindParm10Name', headerName: '是否复核' },
      {
        field: 'cStandardType',
        headerName: '类型',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) =>
          currentOperateUID === params.data?.UID ? (
            <Select
              className="size-full"
              variant="borderless"
              value={params.data?.cStandardType}
              options={standardTypeCandidates}
              fieldNames={{
                label: 'cDictonaryName',
                value: 'cDictonaryCode'
              }}
              onSelect={(value) =>
                params.api.applyTransaction({
                  update: [
                    {
                      ...params.data,
                      cStandardType: value
                    }
                  ]
                })
              }
            />
          ) : (
            params.data?.cStandardTypeName
          )
      },
      { field: 'dPlanStartDate', headerName: '计划开工日期' },
      { field: 'dPlanEndDate', headerName: '计划完工日期' },
      { field: 'dBeginTime', headerName: '开工日期' },
      { field: 'dEndTime', headerName: '完工日期' },
      { field: 'cUnitName', headerName: '计量单位' },
      {
        field: 'cDepCode',
        headerName: '生产部门',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderBody>) =>
          currentOperateUID === params.data?.UID ? (
            <Select
              className="size-full"
              variant="borderless"
              value={params.data?.cDepCode}
              options={departmentCandidates}
              fieldNames={{
                label: 'cDepName',
                value: 'cDepCode'
              }}
              onSelect={(value, option) =>
                params.api.applyTransaction({
                  update: [
                    {
                      ...params.data,
                      cDepCode: value,
                      cDepName: option.cDepName
                    }
                  ]
                })
              }
            />
          ) : (
            params.data?.cDepName
          )
      },
      { field: 'cCreateUserName', headerName: '制单人' },
      { field: 'cVerifyer', headerName: '审核人' },
      { field: 'dVerifyTime', headerName: '审核时间' },
      { field: 'cCloser', headerName: '关闭人' },
      { field: 'dCloseTime', headerName: '关闭时间' },
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
              fieldNames={{
                label: 'cDictonaryName',
                value: 'cDictonaryCode'
              }}
              onSelect={(value) =>
                params.api.applyTransaction({
                  update: [
                    {
                      ...params.data,
                      cBomType: value
                    }
                  ]
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
      {
        field: 'cMemo',
        headerName: '备注',
        editable: (params) => currentOperateUID === params.data?.UID
      },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        width: 260,
        cellRenderer: (params: ICellRendererParams<ProductionOrder.ProductionOrderVo>) => (
          <Space>
            <PermCodeProvider code="production-order:edit">
              <Button
                size="small"
                color="primary"
                variant="text"
                disabled={editMutation.isPending && currentOperateUID === params.data?.UID}
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
            </PermCodeProvider>
            <PermCodeProvider code="production-order:edit">
              {currentOperateUID === params.data?.UID && (
                <Button
                  size="small"
                  color="primary"
                  variant="text"
                  disabled={editMutation.isPending && currentOperateUID === params.data?.UID}
                  onClick={async () => {
                    currentOperateRow.current = null
                    setCurrentOperateRowUID(null)
                    gridRef.current!.api.setGridOption('rowData', (await refetch()).data?.data)
                  }}
                >
                  取消
                </Button>
              )}
            </PermCodeProvider>
            <PermCodeProvider code="production-order:children">
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={() => {
                  currentOperateRow.current = params.data ?? null
                  bomListModal.toggle()
                }}
                disabled={currentOperateUID === params.data?.UID}
              >
                子件
              </Button>
            </PermCodeProvider>
            {params.data?.cDefindParm04 !== '1' && (
              <PermCodeProvider code="production-order:push">
                <Popconfirm
                  title="确认执行该操作？"
                  okButtonProps={{
                    disabled: pushMutation.isPending,
                    loading: pushMutation.isPending
                  }}
                  onConfirm={() => pushMutation.mutate(params.data!.UID)}
                >
                  <Button
                    size="small"
                    color="primary"
                    variant="text"
                    disabled={deleteMutation.isPending || currentOperateUID === params.data?.UID}
                  >
                    推送申请
                  </Button>
                </Popconfirm>
              </PermCodeProvider>
            )}
          </Space>
        )
      }
    ],
    [
      bomCandidates,
      bomListModal,
      currentOperateUID,
      deleteMutation,
      departmentCandidates,
      editMutation,
      pushMutation,
      queryClient,
      refetch,
      standardTypeCandidates,
      vouchTypeCandidates
    ]
  )

  const computeNameText = (text?: string) => {
    if (text && text.length > 7) {
      return `${text.slice(0, 7)}...`
    }
    return text
  }

  return (
    <PageContainer>
      <FilterArea
        form={{ form }}
        filterDefs={filterDefs}
        filterData={filterData}
        setFilterData={setFilterData}
        queryKey={ProductionOrder.LIST_QK}
      />
      <Flex
        className="h-8"
        justify="space-between"
        align="center"
      >
        <Space>
          <PermCodeProvider code="production-order:print">
            <Button
              onClick={async () => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                const res = await queryClient.ensureQueryData(
                  ProductionOrder.printDetailQO(selectedRows.map((i) => i.UID))
                )

                const PAGE_SIZE = 30
                const pd: ProductionOrder.PrintDetailGroupedVo[] = []

                res.forEach((i) => {
                  const bomList = i.List_BOM ?? []

                  if (bomList.length === 0) {
                    pd.push({
                      ...i,
                      List_BOM: [],
                      currentPage: 1,
                      totalPage: 1
                    })
                  } else {
                    const totalPage = Math.ceil(bomList.length / PAGE_SIZE)

                    for (let index = 0; index < bomList.length; index += PAGE_SIZE) {
                      const slicedBOM = bomList.slice(index, index + PAGE_SIZE)
                      const currentPage = Math.floor(index / PAGE_SIZE) + 1
                      const ci = {
                        ...i,
                        List_BOM: slicedBOM,
                        currentPage,
                        totalPage
                      }
                      pd.push(ci)
                    }
                  }
                })

                setPrintData(pd ?? [])
                setTimeout(() => reactToPrintFn(), 16)
              }}
            >
              打印
            </Button>
          </PermCodeProvider>
          <PermCodeProvider code="production-order:audit">
            <Button
              onClick={() => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                auditMutation.mutate(selectedRows.map((i) => i.MID))
              }}
            >
              审核
            </Button>
          </PermCodeProvider>
          <PermCodeProvider code="production-order:quit-audit">
            <Button
              onClick={() => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                abandonMutation.mutate(selectedRows.map((i) => i.MID))
              }}
            >
              弃审
            </Button>
          </PermCodeProvider>
          <PermCodeProvider code="production-order:open">
            <Button
              onClick={() => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                openMutation.mutate(selectedRows.map((i) => i.MID))
              }}
            >
              打开
            </Button>
          </PermCodeProvider>
          <PermCodeProvider code="production-order:close">
            <Button
              onClick={() => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                closeMutation.mutate(selectedRows.map((i) => i.MID))
              }}
            >
              关闭
            </Button>
          </PermCodeProvider>
          <PermCodeProvider code="production-order:delete">
            <Button
              onClick={() => {
                if (!selectedRows.length) {
                  showMessage('select-data')
                  return
                }
                deleteMutation.mutate(selectedRows.map((i) => i.UID))
              }}
            >
              删除
            </Button>
          </PermCodeProvider>
        </Space>
        <Space>
          <PermCodeProvider code="production-order:export">
            <Button
              onClick={() => {
                exportMutation.mutate({
                  ...defaultMaxPageDto,
                  orderByFileds: '',
                  conditions: queryBuilder<FilterForm>([
                    { key: 'cStandardType', type: 'eq', val: filterData.cStandardType },
                    { key: 'cVouchType', type: 'eq', val: filterData.cVouchType },
                    { key: 'iStatus', type: 'eq', val: filterData.iStatus },
                    { key: 'cCode', type: 'like', val: filterData.cCode },
                    { key: 'dBeginTime', type: 'date-range', val: filterData.dBeginTime },
                    { key: 'cInvCode', type: 'like', val: filterData.cInvCode },
                    { key: 'cInvName', type: 'like', val: filterData.cInvName },
                    { key: 'cDefindParm10', type: 'eq', val: filterData.cDefindParm10 }
                  ])
                })
              }}
              loading={exportMutation.isPending}
              disabled={exportMutation.isPending}
            >
              导出
            </Button>
          </PermCodeProvider>
          <PermCodeProvider code="production-order:add">
            <Link to="/production-mgt/production-order/add">
              <Button type="primary">新增</Button>
            </Link>
          </PermCodeProvider>
        </Space>
      </Flex>
      <div className="ag-theme-quartz flex-1">
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
            if (params.data?.bSetColor) {
              return {
                backgroundColor: '#FFF9C4'
              }
            }
            return undefined
          }}
          gridId="list"
          getContextMenuItems={getContextMenuItems}
          onGridReady={(e) => initTableSettings(e)}
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
          onChange={(pageIndex, pageSize) => setPageParams({ ...pageParams, pageIndex, pageSize })}
        />
      </Flex>

      <BOMListModal
        open={bomListModal.open}
        setOpen={bomListModal.setOpen}
        currentOperateRow={currentOperateRow}
      />

      <div
        ref={contentRef}
        className={styles.printContent}
      >
        {printData.map((i, index) => (
          <div key={index}>
            <div className="relative h-screen p-8">
              <div className="flex items-center justify-between">
                <div />
                <div className="text-2xl">Elan 配方投产单</div>
                <div className="right-0">批号：{i?.cDefindParm06}</div>
              </div>
              <div className="mt-4 border-b-2 border-black text-sm">
                <div className="grid grid-cols-4">
                  <div>编号：{i?.cInvCode}</div>
                  <div>名称：{i.cInvName}</div>
                  <div>确认状态：{}</div>
                  <div>{DateUtils.formatTime(new Date(), 'YYYY/MM/DD')}</div>
                </div>
              </div>
              <div className="mt-2 border-b border-black text-sm">
                <div className="grid grid-cols-5">
                  <div>编号</div>
                  <div>名称</div>
                  <div>用量（公斤）</div>
                  <div>实际投料</div>
                  <div>验单号</div>
                </div>
              </div>
              {i?.List_BOM?.map((item, idx) => (
                <div
                  className="mt-2 border-b border-black text-sm"
                  key={idx}
                >
                  <div className="grid grid-cols-5">
                    <div>{item?.cMaterialCode}</div>
                    <div>{computeNameText(item?.cMaterialName ?? '')}</div>
                    <div>{item?.nQuantity}</div>
                    <div />
                    <div />
                  </div>
                </div>
              ))}
              {i.currentPage === i.totalPage && (
                <div className="mt-2 flex justify-end space-x-12">
                  <div>总配比（%）：{i?.SumRate}</div>
                  <div>总用量（公斤）：{i?.SumQuantity}</div>
                </div>
              )}
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
        ))}
      </div>
    </PageContainer>
  )
}
