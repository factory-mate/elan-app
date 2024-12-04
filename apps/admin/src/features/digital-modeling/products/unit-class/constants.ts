import type { SelectProps, TreeProps } from 'antd'

export const unitClassTreeFieldNames: TreeProps['fieldNames'] = {
  title: 'cUnitClassName',
  key: 'cUnitClassCode'
}

export const unitClassSelectFieldNames: SelectProps['fieldNames'] = {
  value: 'cUnitClassCode',
  label: 'cUnitClassName'
}
