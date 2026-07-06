export interface TableSettingVo {
  key: string
  value: string
}

export interface TableSettingAddDto extends TableSettingVo {}

export interface TableSettingEditDto extends TableSettingAddDto {}
