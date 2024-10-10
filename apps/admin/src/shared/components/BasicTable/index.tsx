import type { ColDef } from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'

interface BasicTableProps {
  columnDefs?: ColDef[]
}

export default function BasicTable(props: BasicTableProps) {
  const { columnDefs } = props

  return (
    <div className="ag-theme-quartz h-[calc(100vh-210px)]">
      <AgGridReact
        rowData={[{ id: '123' }]}
        columnDefs={columnDefs}
        rowSelection={{
          mode: 'multiRow',
          enableClickSelection: true
        }}
        selectionColumnDef={{
          sortable: true,
          width: 80,
          maxWidth: 80,
          suppressHeaderMenuButton: false,
          pinned: 'left',
          lockPinned: true
        }}
        getRowId={(params) => params.data.id.toString()}
      />
    </div>
  )
}
