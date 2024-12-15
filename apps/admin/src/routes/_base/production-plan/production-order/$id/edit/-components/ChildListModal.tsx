import type { ColDef, ICellRendererParams } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'
import type { Dispatch, MutableRefObject, SetStateAction } from 'react'

import type {
  ProductionOrderBody,
  ProductionOrderBodyss
} from '@/features/production-plan/production-order'

interface ChildListModalProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  currentOperateRow?: MutableRefObject<ProductionOrderBody | null>
  onSave?: (data?: ProductionOrderBody | null) => void
}

export default function ChildListModal(props: ChildListModalProps) {
  const { open, setOpen, currentOperateRow, onSave } = props

  const gridRef = useRef<AgGridReact>(null)

  const [tableData, setTableData] = useState<ProductionOrderBodyss[]>([])

  const columnDefs = useMemo<ColDef<ProductionOrderBodyss>[]>(
    () => [
      { field: 'cSourceCode', headerName: '子件行号', editable: true },
      { field: 'cDefindParm10', headerName: '工序行号', editable: true },
      { field: 'cInvCode', headerName: '子件编码', editable: true },
      { field: 'cInvName', headerName: '子件名称', editable: true },
      { field: 'cInvStd', headerName: '规格型号', editable: true },
      { field: 'cDefindParm01', headerName: '子件属性', editable: true },
      { field: 'nQuantity', headerName: '应领数量', editable: true },
      { field: 'cDefindParm02', headerName: '已领数量', editable: true },
      { field: 'cDefindParm03', headerName: '计量单位', editable: true },
      { field: 'cDefindParm04', headerName: '基本用量', editable: true },
      { field: 'cDefindParm05', headerName: '基础用量', editable: true },
      { field: 'cDefindParm06', headerName: '损耗率', editable: true },
      { field: 'cDefindParm07', headerName: '使用数量', editable: true },
      { field: 'cDefindParm08', headerName: '供应仓库', editable: true },
      { field: 'cDefindParm09', headerName: '仓库名称', editable: true },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: (params: ICellRendererParams<ProductionOrderBodyss>) => (
          <Space>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                setTableData((prev) => {
                  const newTableData = [...prev]
                  newTableData.splice(params.node.rowIndex! + 1, 0, {})
                  return newTableData
                })
              }}
            >
              新增
            </Button>
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={() => {
                setTableData(tableData.filter((_, index) => index !== params.node.rowIndex))
              }}
            >
              删除
            </Button>
          </Space>
        )
      }
    ],
    [tableData]
  )

  useEffect(() => {
    setTableData?.([...(currentOperateRow?.current?.bodyss ?? [])])
  }, [open])

  return (
    <Modal
      title="编辑子件"
      open={open}
      onOk={() => {
        onSave?.({ ...currentOperateRow?.current, bodyss: tableData })
        setOpen?.(false)
      }}
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
            onClick={() => setTableData([...tableData, {}])}
          >
            新增
          </Button>
        </Space>

        <div className="ag-theme-quartz h-[500px]">
          <AgGridReact<ProductionOrderBodyss>
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={tableData}
            headerHeight={36}
            rowHeight={36}
            tooltipShowDelay={1000}
            tooltipHideDelay={0}
            noRowsOverlayComponent={() => '暂无数据'}
            editType="fullRow"
          />
        </div>
      </Space>
    </Modal>
  )
}
