import type { TreeProps } from 'antd'

export const bomClassTreeFieldNames: TreeProps['fieldNames'] = {
  key: 'Id',
  title: 'cInvName',
  children: 'Child'
}

export const NOT_FOUND_UID = '00000000-0000-0000-0000-000000000000'
