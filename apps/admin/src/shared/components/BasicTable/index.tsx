import type { ColDef } from '@ag-grid-community/core'
import { AgGridReact, type CustomCellRendererProps } from '@ag-grid-community/react'

export default function BasicTable() {
  const colDefs = useMemo<ColDef<any>[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 100, lockPosition: true },
      {
        field: 'avatarUrl',
        headerName: 'Avatar Url',
        lockPosition: true,
        cellRenderer: (params: CustomCellRendererProps) => <Avatar src={params.value} />
      },
      { field: 'username', headerName: 'Username', lockPosition: true },
      { field: 'nickName', headerName: 'Nick Name' },
      { field: 'firstName', headerName: 'First Name' },
      { field: 'middleName', headerName: 'Middle Name' },
      { field: 'lastName', headerName: 'Last Name' },
      { field: 'fullName', headerName: 'Full Name' },
      { field: 'email', headerName: 'Email' },
      { field: 'birthDate', headerName: 'Birth Date' }
    ],
    []
  )

  return (
    <div className={clsx('h-[calc(100vh-210px)]', 'ag-theme-quartz')}>
      <AgGridReact
        rowData={[]}
        columnDefs={colDefs}
        getRowId={(params) => params.data.id.toString()}
      />
    </div>
  )
}
