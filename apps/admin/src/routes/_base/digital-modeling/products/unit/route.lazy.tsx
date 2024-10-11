import type { ColDef } from '@ag-grid-community/core'

import { lowCodePageQueryQO, useTableConfig } from '@/features/low-code'
import { defaultPageParams } from '@/features/pagination'
import { buildIndexColDef } from '@/features/ui'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/unit')({
  component: Page
})

function Page() {
  const { cols, actionButtons, api } = useTableConfig()

  const {
    data: { data: rowData }
  } = useSuspenseQuery(
    lowCodePageQueryQO({ method: api?.httpType, url: api?.url }, defaultPageParams)
  )

  const columnDefs = useMemo<ColDef[]>(
    () => [
      buildIndexColDef(),
      ...cols.map((i) => ({
        field: i.code,
        headerName: i.label
      })),
      {
        headerName: '操作',
        width: 200,
        sortable: false,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: () => (
          <Space>
            {actionButtons.map((actionButton) => (
              <Button
                key={actionButton.code}
                size="small"
                onClick={() => {}}
              >
                {actionButton.label}
              </Button>
            ))}
          </Space>
        )
      }
    ],
    [cols, actionButtons]
  )

  return (
    <PageContainer>
      <BasicTable
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </PageContainer>
  )
}
