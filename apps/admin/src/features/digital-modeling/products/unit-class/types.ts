export interface UnitClassVo {
  UID: string
  cUnitClassCode: string
  cUnitClassName: string
  cUnitClassType: string
  cUnitClassTypeName: string
  bDefault: boolean
}

export interface UnitClassTreeItemVo extends UnitClassVo {
  title: string
  key: string
  Child: UnitClassTreeItemVo[]
}

export interface UnitClassAddDto {
  cUnitClassCode: string
  cUnitClassName: string
  cUnitClassType: string
  cUnitClassTypeName: string
  bDefault: boolean
}

export interface UnitClassEditDto extends UnitClassAddDto {
  UID: string
  utfs: string
}
