import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { Dispatch, MutableRefObject, SetStateAction } from 'react'

import * as BOM from '@/features/digital-modeling/products/bom'
import * as Inventory from '@/features/digital-modeling/products/inventory'
import * as Warehouse from '@/features/digital-modeling/products/warehouse'
import { defaultMaxPageDto } from '@/features/pagination'
import * as ProductionOrder from '@/features/production-plan/production-order'

interface BOMListModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  currentOperateRow?: MutableRefObject<ProductionOrder.ProductionOrderBody | null>
}

export default function BOMListModal(props: BOMListModalProps) {
  const { open, setOpen, currentOperateRow } = props

  const { message } = useMessage()

  const gridRef = useRef<AgGridReact>(null)

  const { data: bomListData } = useQuery(ProductionOrder.bomListQO(currentOperateRow?.current?.UID))
  const { data: { data: inventoryCandidates } = {} } = useQuery(
    Inventory.listQO({
      ...defaultMaxPageDto,
      conditions: 'IsMaterial = true'
    })
  )
  const { data: { data: warehouseCandidates } = {} } = useQuery(Warehouse.listQO(defaultMaxPageDto))

  const editMutation = ProductionOrder.useEditBOMListMutation()

  const [tableData, setTableData] = useImmer<ProductionOrder.BOMItemVo[]>([])

  const columnDefs = useMemo<ColDef<ProductionOrder.BOMItemVo>[]>(
    () => [
      { field: 'iRow', headerName: '子件行号', cellDataType: 'text' },
      { field: 'iProcessNumber', headerName: '工序行号' },
      {
        field: 'cMaterialCode',
        headerName: '子件编码',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.BOMItemVo>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cMaterialCode}
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
            onSelect={(value, option) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cMaterialCode: value,
                  cMaterialName: option.cInvName,
                  cMaterialStd: option.cInvstd,
                  cUnitCode: option.cSaleUnitCode,
                  cUnitName: option.cSaleUnitName
                }
              })
            }}
            optionRender={(option) => (
              <Flex justify="space-between">
                <span>{option.data.cInvCode}</span>
                <span> {option.data.cInvName}</span>
              </Flex>
            )}
          />
        )
      },
      { field: 'cMaterialName', headerName: '子件名称' },
      { field: 'cMaterialStd', headerName: '子件规格' },
      { field: 'cUnitName', headerName: '计量单位' },
      {
        field: 'iLossRate',
        headerName: '损耗率',
        editable: true,
        cellDataType: 'number',
        cellEditorParams: {
          precision: 0,
          step: 1,
          showStepperButtons: true
        }
      },
      {
        field: 'nQuantity',
        headerName: '数量'
      },
      { field: 'cMaterialTypeName', headerName: '物料属性' },
      {
        field: 'cWareHouseCode',
        headerName: '仓库编码',
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<ProductionOrder.BOMItemVo>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cWareHouseCode}
            options={warehouseCandidates}
            fieldNames={{
              value: 'cWareHouseCode',
              label: 'cWareHouseCode'
            }}
            onSelect={(value, option) => {
              setTableData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cWareHouseCode: value,
                  cWareHouseName: option.cWareHouseName
                }
              })
            }}
          />
        )
      },
      { field: 'cWareHouseName', headerName: '仓库名称' },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<ProductionOrder.BOMItemVo>) => (
          <Space>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                const iRow = `${+params.data!.iRow! + 1}`
                if (tableData.some((i) => i.iRow === iRow)) {
                  message.warning('当前行号已存在，无法增行')
                  return
                }
                setTableData((draft) => {
                  draft.splice(params.node.rowIndex! + 1, 0, {
                    iRow,
                    iProcessNumber: BOM.DEFAULT_PROCESS_NUMBER,
                    iLossRate: 0
                  })
                })
              }}
            >
              增行
            </Button>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() =>
                setTableData((draft) => {
                  draft.splice(params.node.rowIndex!, 1)
                })
              }
            >
              删行
            </Button>
          </Space>
        )
      }
    ],
    [inventoryCandidates, message, setTableData, tableData, warehouseCandidates]
  )

  useEffect(() => {
    setTableData?.(bomListData ?? [])
  }, [bomListData, open, setTableData])

  const handleSubmit = () => {
    // if (tableData.some((i) => !i.iBaseQty || !i.iBasicQty)) {
    //   message.warning('子件基础用量和基本用量必填且大于0')
    //   return
    // }
    editMutation.mutate(
      {
        UID: currentOperateRow?.current?.UID,
        utfs: currentOperateRow?.current?.utfs,
        list_bom: tableData
      },
      {
        onSuccess: () => setOpen?.(false)
      }
    )
  }

  return (
    <Modal
      title="子件"
      open={open}
      onOk={handleSubmit}
      onCancel={() => setOpen?.(false)}
      forceRender
      width="80%"
      centered
    >
      <Space
        className="w-full"
        direction="vertical"
      >
        <Space>
          <Button
            type="primary"
            onClick={() =>
              setTableData((draft) => {
                draft.push({
                  iRow: `${draft.length === 0 ? 10 : +draft.at(-1)!.iRow! + 10}`,
                  iProcessNumber: BOM.DEFAULT_PROCESS_NUMBER,
                  iLossRate: 0
                })
              })
            }
          >
            增行
          </Button>
        </Space>

        <div className="ag-theme-quartz h-[500px]">
          <AgGridReact<ProductionOrder.BOMItemVo>
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={tableData}
            editType="fullRow"
          />
        </div>
      </Space>
    </Modal>
  )
}
