import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type { Updater } from 'use-immer'

import type { CraftRouteResourceVo } from '@/features/craft-route'
import * as Inventory from '@/features/inventory'

interface ResourceAreaProps {
  data: CraftRouteResourceVo[]
  setData: Updater<CraftRouteResourceVo[]>
}

export default function ResourceArea(props: ResourceAreaProps) {
  const { data, setData } = props

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
              setData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cResourceCode: v.cInvCode,
                  cResourceName: v.cInvName,
                  cInvStd: v.cInvstd
                }
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
            onClick={() =>
              setData((draft) => {
                draft.splice(params.node.rowIndex!, 1)
              })
            }
          >
            删行
          </Button>
        )
      }
    ],
    [setData]
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
            setData((draft) => draft.filter((_, index) => !selectedRows.includes(index)))
          }}
        >
          删除
        </Button>
        <Button
          type="primary"
          onClick={() =>
            setData((draft) => {
              draft.push({})
            })
          }
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
