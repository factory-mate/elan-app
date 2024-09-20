import type { ColDef } from '@ag-grid-community/core'
import { AgGridReact, type CustomCellRendererProps } from '@ag-grid-community/react'

export default function BasicTable() {
  const colDefs = useMemo<ColDef<any>[]>(
    () => [
      { headerName: '序号', width: 90, pinned: 'left' },
      {
        field: 'avatarUrl',
        headerName: 'Avatar Url',
        cellRenderer: (params: CustomCellRendererProps) => <Avatar src={params.value} />
      },
      { field: 'username', headerName: 'Username', suppressHeaderFilterButton: true },
      { field: 'nickName', headerName: 'Nick Name' },
      { field: 'firstName', headerName: 'First Name' },
      { field: 'middleName', headerName: 'Middle Name' },
      { field: 'lastName', headerName: 'Last Name' },
      { field: 'fullName', headerName: 'Full Name' },
      { field: 'email', headerName: 'Email' },
      { field: 'birthDate', headerName: 'Birth Date' },
      {
        headerName: '操作',
        cellRenderer: () => (
          <Space>
            <Button size="small">编辑</Button>
            <Button size="small">查看</Button>
            <Button size="small">更多</Button>
          </Space>
        ),
        pinned: 'right',
        lockPosition: 'right'
      }
    ],
    []
  )

  return (
    <div className={clsx('h-[calc(100vh-210px)]', 'ag-theme-quartz')}>
      <AgGridReact
        rowData={[{ id: '123' }]}
        columnDefs={colDefs}
        selection={{
          mode: 'multiRow',
          enableMultiSelectWithClick: true
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
