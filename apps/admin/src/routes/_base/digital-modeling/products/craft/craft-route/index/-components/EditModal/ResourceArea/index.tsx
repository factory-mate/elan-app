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

  const { data: { data: inventoryCandidates } = {} } = useQuery(
    Inventory.listQO({
      ...defaultMinPageDto,
      conditions: 'IsProduct = true'
    })
  )

  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const columnDefs = useMemo<ColDef<CraftRouteResourceVo>[]>(
    () => [
      {
        field: 'cResourceCode',
        headerName: '产品编码',
        flex: 1,
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams<CraftRouteResourceVo>) => (
          <Select
            className="size-full"
            variant="borderless"
            value={params.data?.cResourceCode}
            options={inventoryCandidates}
            fieldNames={{
              value: 'cInvCode',
              label: 'cInvCode'
            }}
            showSearch={{
              filterOption: (input, option) =>
                (option?.cInvCode ?? '').toLowerCase().includes(input.toLowerCase()) ||
                (option?.cInvName ?? '').toLowerCase().includes(input.toLowerCase())
            }}
            onSelect={(value, option) => {
              setData((draft) => {
                draft[params.node.rowIndex!] = {
                  ...params.data,
                  cResourceCode: value,
                  cResourceName: option.cInvName,
                  cInvStd: option.cInvstd
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
    [inventoryCandidates, setData]
  )

  return (
    <Space
      orientation="vertical"
      className="w-full"
    >
      <Flex justify="space-between">
        <Button
          onClick={() => {
            if (selectedRows.length === 0) {
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
