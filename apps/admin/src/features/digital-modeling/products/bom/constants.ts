import type { SelectProps, TreeProps } from 'antd'

export const bomClassTreeFieldNames: TreeProps['fieldNames'] = {
  key: 'Id',
  title: 'cInvName',
  children: 'Child'
}

export const bomCodeSelectFieldNames: SelectProps['fieldNames'] = {
  label: 'cInvCode',
  value: 'cInvCode'
}

export const NOT_FOUND_UID = '00000000-0000-0000-0000-000000000000'

export const DEFAULT_PROCESS_NUMBER = '0000'

export const DEFAULT_EXPIRATION_DATE = '2099-12-31'
