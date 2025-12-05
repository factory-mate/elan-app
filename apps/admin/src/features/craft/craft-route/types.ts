export interface CraftRouteVo {
  UID: string
  cCraftRouteCode: string
  cCraftRouteName: string
  cCraftRouteGroupCode: string
  cCreateUserName: string
  dCreateTime: string
  utfs: string
}

export interface CraftRouteAddDto extends CraftRouteVo {}

export interface CraftRouteEditDto extends CraftRouteAddDto {}
