import { type ColDef, type ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { Ref } from 'react'

import type { CraftRouteResourceVo } from '@/features/craft-route'
import * as Inventory from '@/features/inventory'

interface ResourceAreaProps {
  data: CraftRouteResourceVo[]
  ref: Ref<ResourceAreaRef>
}

export interface ResourceAreaRef {
  getRowData: () => CraftRouteResourceVo[]
}

export default function ResourceArea(props: ResourceAreaProps) {
  const { data, ref } = props

  const { showMessage } = useMessage()
  const gridRef = useRef<AgGridReact>(null)

  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const columnDefs = useMemo<ColDef<CraftRouteResourceVo>[]>(
    () => [
      {
        field: 'cResourceCode',
        headerName: '产品编码',
        flex: 1,
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<CraftRouteResourceVo>) => (
          <Inventory.ProductCodeRemoteSelect
            className="size-full"
            variant="borderless"
            allowClear={false}
            button={{ type: 'link' }}
            value={params.data?.cResourceCode}
            onConfirm={async (v) => {
              params.node.setData({
                ...params.node.data,
                cResourceCode: v.cInvCode,
                cResourceName: v.cInvName,
                cInvStd: v.cInvstd
              })
            }}
          />
        )
      },
      { field: 'cResourceName', headerName: '产品名称', flex: 1 },
      { field: 'cInvStd', headerName: '规格', editable: true, flex: 1 },
      {
        headerName: '操作',
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        width: 120,
        cellRenderer: (params: ICellRendererParams<CraftRouteResourceVo>) => (
          <Button
            size="small"
            color="primary"
            variant="text"
            onClick={() => gridRef.current!.api.applyTransaction({ remove: [params.data] })}
          >
            删行
          </Button>
        )
      }
    ],
    []
  )

  useImperativeHandle(
    ref,
    () => ({
      getRowData: () => {
        const rowData: CraftRouteResourceVo[] = []
        gridRef.current!.api.forEachNode((node) => {
          rowData.push(node.data)
        })
        return rowData
      }
    }),
    []
  )

  return (
    <Space
      orientation="vertical"
      className="w-full"
    >
      <Flex justify="space-between">
        <Button
          onClick={() => {
            if (!selectedRows.length) {
              showMessage('select-data')
              return
            }
            const { api } = gridRef.current!
            api.applyTransaction({ remove: api.getSelectedRows() })
          }}
        >
          删除
        </Button>
        <Button
          type="primary"
          onClick={() => gridRef.current!.api.applyTransaction({ add: [{}] })}
        >
          增行
        </Button>
      </Flex>
      <div className="ag-theme-quartz h-[500px]">
        <AgGridReact<CraftRouteResourceVo>
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data}
          editType="fullRow"
          rowSelection={{
            mode: 'multiRow'
          }}
          selectionColumnDef={{
            sortable: true,
            suppressHeaderMenuButton: true,
            pinned: 'left',
            lockPinned: true
          }}
          onSelectionChanged={(event) =>
            setSelectedRows(event.api.getSelectedNodes().map((i) => i.rowIndex!))
          }
        />
      </div>
    </Space>
  )
}
