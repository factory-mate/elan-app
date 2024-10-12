import { type ColDef, provideGlobalGridOptions } from '@ag-grid-community/core'
import { AG_GRID_LOCALE_CN } from '@ag-grid-community/locale'

provideGlobalGridOptions({
  localeText: AG_GRID_LOCALE_CN
})

export function buildIndexColDef(colDef?: ColDef): ColDef {
  return {
    headerName: '序号',
    width: 85,
    pinned: 'left',
    lockPinned: true,
    valueGetter: (params) =>
      typeof params.node?.rowIndex === 'number' ? params.node.rowIndex + 1 : undefined,
    ...colDef
  }
}
