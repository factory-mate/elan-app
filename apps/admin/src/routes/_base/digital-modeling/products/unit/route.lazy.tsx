import type { ColDef } from '@ag-grid-community/core'

import { useTableConfig } from '@/features/low-code'
import { buildIndexColDef } from '@/features/ui'

export const Route = createLazyFileRoute('/_base/digital-modeling/products/unit')({
  component: Page
})

function Page() {
  const tableConfig = useTableConfig()

  const columnDefs = useMemo<ColDef[]>(
    () => [
      buildIndexColDef(), // 序号列
      ...tableConfig.cols.map<ColDef>((i) => ({
        field: i.code,
        headerName: i.label
      })), // 配置列
      // 操作列
      {
        headerName: '操作',
        width: 200,
        cellRenderer: () => (
          <Space>
            {tableConfig.actionButtons.map((actionButton) => (
              <Button
                key={actionButton.code}
                size="small"
                onClick={() => {}}
              >
                {actionButton.label}
              </Button>
            ))}
          </Space>
        ),
        pinned: 'right',
        lockPosition: 'right'
      }
    ],
    [tableConfig]
  )

  return (
    <PageContainer>
      <BasicTable columnDefs={columnDefs} />
    </PageContainer>
  )
}
