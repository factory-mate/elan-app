import { type ColDef } from 'ag-grid-community'

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

export function booleanLabelValueGetter(data: any) {
  switch (data) {
    case '1':
    case true:
    case 'true':
      return '是'
    default:
      return '否'
  }
}
