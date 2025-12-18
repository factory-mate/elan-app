import type { BOMVo } from '@/features/bom'

export interface ProductionOrderVo {
  iRow: string
  RestQuantity: number
  cCode: string
  dDate: string
  cVouchType: string
  cStandardType: string
  cVerifyer: string
  dVerifyTime: string
  cCloser: string
  dCloseTime: string
  HeadiStatus: number
  cVouchTypeName: string
  cStandardTypeName: string
  HeadiStatusName: string
  MID: string
  cSourceCode: string
  cSourceRowUID: string
  cInvCode: string
  cInvName: string
  nQuantity: number
  cMemo: string
  cDefindParm01: string
  cDefindParm02: string
  cDefindParm03: string
  cDefindParm04: string
  cDefindParm05: string
  cDefindParm06: string
  cDefindParm07: string
  cDefindParm08: string
  cDefindParm09: string
  cDefindParm10: string
  cInvStd: string
  cAssQuantity: number
  cAssUnitName: string
  bCheck: boolean
  cUnitName: string
  bHalf: boolean
  cUnitCode: string
  dEndTime: string
  cBomType: string
  cBomTypeName: string
  cBomVersion: string
  cVerisionMemo: string
  dBeginTime: string
  cBomUID: string
  UID: string
  IsValid: boolean
  IsDelete: boolean
  cCreateUserCode: string
  cCreateUserName: string
  dCreateTime: string
  cModifyUserCode: string
  cModifyUserName: string
  dModifyTime: string
  cSourceAppType: string
  iStatus: number
  utfs: string
}

export interface ProductionOrderAddDto {
  head: ProductionOrderHead
  bodys: ProductionOrderBody[]
}

export interface ProductionOrderHead {
  cCode: string
  UID: string
  dDate: string
  cMemo: string
  cDefindParm01: string
  cDefindParm02: string
  cDefindParm03: string
  cDefindParm04: string
  cDefindParm05: string
  cDefindParm06: string
  cDefindParm07: string
  cDefindParm08: string
  cDefindParm09: string
  cDefindParm10: string
  cStandardType: string
  cVouchType: string
}

export interface ProductionOrderBody {
  cSourceCode?: string
  cSourceRowUID?: string
  cInvCode?: string
  cInvName?: string
  nQuantity?: number
  cMemo?: string
  cDefindParm01?: string
  cDefindParm02?: string
  cDefindParm03?: string
  cDefindParm04?: string
  cDefindParm05?: string
  cDefindParm06?: string
  cDefindParm07?: string
  cDefindParm08?: string
  cDefindParm09?: string
  cDefindParm10?: string
  cInvStd?: string
  cAssQuantity?: number
  cAssUnitName?: string
  bCheck?: boolean
  cUnitName?: string
  bHalf?: boolean
  cUnitCode?: string
  dEndTime?: string
  cBomType?: string
  cBomTypeName?: string
  cBomVersion?: string
  dBeginTime?: string
  cBomUID?: string
  bodyss?: BOMItemVo[]
  MID?: string
  UID?: string
  cVerisionMemo?: string
  versionCandidates?: BOMVo[]
  utfs?: string
  cStandardType?: string
  cStandardTypeName?: string
  cVouchType?: string
  cVouchTypeName?: string
}

export interface BOMItemVo {
  iRow?: string
  cMaterialCode?: string
  cMaterialName?: string
  cMaterialStd?: string
  nQuantity?: number
  cMemo?: string
  cAssQuantity?: number
  nAssUnitCode?: string
  nAssUnitName?: string
  cDefindParm01?: string
  cDefindParm02?: string
  cDefindParm03?: string
  cDefindParm04?: string
  cDefindParm05?: string
  cDefindParm06?: string
  cDefindParm07?: string
  cDefindParm08?: string | null
  cDefindParm09?: string
  cDefindParm10?: string
  cWareHouseCode?: string
  cWareHouseName?: string | null
  iLossRate?: number
  cMaterialType?: string
  cMaterialTypeName?: string
  iProcessNumber?: string
  cUnitCode?: string
  cUnitName?: string
}

export interface ProductionOrderBOMListEditDto {
  UID?: string
  utfs?: string
  list_bom: BOMItemVo[]
}

export interface ProductionOrderEditDto extends ProductionOrderHead {
  bodys: ProductionOrderBody[]
}

export enum TaskStatus {
  AUDIT = 0, // 审核
  ABANDON = 1, // 弃审
  OPEN = 2, // 打开
  CLOSE = 3 // 关闭
}

export interface PrintDetailVo {
  /**
   * 是否检验
   */
  bCheck?: boolean | null
  /**
   * 是否半成品
   */
  bHalf?: boolean | null
  /**
   * 辅计量数量
   */
  cAssQuantity?: number | null
  /**
   * 辅计量单位
   */
  cAssUnitName?: null | string
  /**
   * BOM类型
   */
  cBomType?: null | string
  cBomUID?: null | string
  /**
   * BOM版本号
   */
  cBomVersion?: null | string
  cCreateUserCode?: null | string
  cCreateUserName?: null | string
  /**
   * 生产人员编码
   */
  cDefindParm01?: null | string
  /**
   * 生产人员名称
   */
  cDefindParm02?: null | string
  /**
   * 生产日期
   */
  cDefindParm03?: null | string
  /**
   * 工位编码
   */
  cDefindParm04?: null | string
  /**
   * 工位名称
   */
  cDefindParm05?: null | string
  cDefindParm06?: null | string
  cDefindParm07?: null | string
  cDefindParm08?: null | string
  cDefindParm09?: null | string
  cDefindParm10?: null | string
  /**
   * 存货编码
   */
  cInvCode?: null | string
  /**
   * 存货名称
   */
  cInvName?: null | string
  /**
   * 规格型号
   */
  cInvStd?: null | string
  /**
   * 备注
   */
  cMemo?: null | string
  cModifyUserCode?: null | string
  cModifyUserName?: null | string
  cSourceAppType?: null | string
  /**
   * 来源单号
   */
  cSourceCode?: null | string
  /**
   * 来源单行ID
   */
  cSourceRowUID?: string
  /**
   * 主计量单位编码
   */
  cUnitCode?: null | string
  /**
   * 主计量单位
   */
  cUnitName?: null | string
  /**
   * BOM版本说明
   */
  cVerisionMemo?: null | string
  /**
   * 开工时间
   */
  dBeginTime?: Date | null
  dCreateTime?: Date | null
  /**
   * 完工时间
   */
  dEndTime?: Date | null
  dModifyTime?: Date | null
  IsDelete?: boolean
  iStatus?: number
  IsValid?: boolean
  /**
   * BOM数据
   */
  List_BOM?: PrintBodyItemVo[] | null
  MID?: string
  /**
   * 数量
   */
  nQuantity?: number | null
  /**
   * 总用量
   */
  SumQuantity?: number
  /**
   * 总配比
   */
  SumRate?: number
  UID?: string
  utfs?: null | string
}

export interface PrintBodyItemVo {
  /**
   * 辅计量数量
   */
  cAssQuantity?: number | null
  cCreateUserCode?: null | string
  cCreateUserName?: null | string
  /**
   * 比例
   */
  cDefindParm01?: null | string
  cDefindParm02?: null | string
  cDefindParm03?: null | string
  cDefindParm04?: null | string
  cDefindParm05?: null | string
  cDefindParm06?: null | string
  cDefindParm07?: null | string
  cDefindParm08?: null | string
  cDefindParm09?: null | string
  cDefindParm10?: null | string
  /**
   * 原材料编码
   */
  cMaterialCode?: null | string
  /**
   * 原材料名称
   */
  cMaterialName?: null | string
  /**
   * 规格
   */
  cMaterialStd?: null | string
  cModifyUserCode?: null | string
  cModifyUserName?: null | string
  cSourceAppType?: null | string
  dCreateTime?: Date | null
  dModifyTime?: Date | null
  IsDelete?: boolean
  iStatus?: number
  IsValid?: boolean
  MID?: string
  /**
   * 辅计量单位
   */
  nAssUnitName?: null | string
  /**
   * 数量
   */
  nQuantity?: number | null
  UID?: string
  utfs?: null | string
}
