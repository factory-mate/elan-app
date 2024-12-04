import type { TreeProps, TreeSelectProps } from 'antd'

export const unitClassTreeFieldNames: TreeProps['fieldNames'] = {
  key: 'cUnitClassCode',
  title: 'cUnitClassName',
  children: 'Child'
}

export const unitClassTreeSelectFieldNames: TreeSelectProps['fieldNames'] = {
  value: 'cUnitClassCode',
  label: 'cUnitClassName',
  children: 'Child'
}
