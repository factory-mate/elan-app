export interface UnitVo {
  UID: string
  cUnitClassCode: string
  cUnitCode: string
  cUnitName: string
  iRate: number
  bMainUnit: boolean
}

export interface UnitAddDto {
  cUnitClassCode: string
  cUnitCode: string
  cUnitName: string
  iRate: number
  bMainUnit: boolean
}

export interface UnitEditDto extends UnitAddDto {
  UID: string
  utfs: string
}
