import type { AgGridReactProps } from '@ag-grid-community/react'
import { AgGridReact } from '@ag-grid-community/react'

interface BasicTableProps {
  columnDefs?: AgGridReactProps['columnDefs']
  rowData?: AgGridReactProps['rowData']
  getRowId?: AgGridReactProps['getRowId']
  rowKey?: string
}

const DEFAULT_ROW_KEY = 'UID'

export default function BasicTable(props: BasicTableProps) {
  const { columnDefs, rowData, getRowId, rowKey } = props

  return (
    <div className="ag-theme-quartz h-[calc(100vh-210px)]">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection={{
          mode: 'multiRow',
          enableClickSelection: true
        }}
        selectionColumnDef={{
          sortable: true,
          maxWidth: 70,
          suppressHeaderMenuButton: true,
          pinned: 'left',
          lockPinned: true
        }}
        getRowId={
          typeof getRowId === 'function'
            ? getRowId
            : (params) => params.data[rowKey ?? DEFAULT_ROW_KEY]
        }
      />
    </div>
  )
}
