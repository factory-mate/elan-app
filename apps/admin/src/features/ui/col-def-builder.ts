import type { ColDef } from '@ag-grid-community/core'

export function buildIndexColDef(colDef?: ColDef): ColDef {
  return {
    headerName: '序号',
    width: 90,
    pinned: 'left',
    valueGetter: (params) =>
      typeof params.node?.rowIndex === 'number' ? params.node.rowIndex + 1 : undefined,
    ...colDef
  }
}
