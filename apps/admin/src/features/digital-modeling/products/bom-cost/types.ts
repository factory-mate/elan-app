export interface BOMCostDto {
  cInvCodeStart?: string
  cInvCodeEnd?: string
  cInvNameStart?: string
  cInvNameEnd?: string
  iQty?: number
}

export interface BOMCostVo {
  Child: BOMCostVo[]
  /**
   * BOM类别
   */
  cBOMType?: null | string
  cCreateUserCode?: null | string
  cCreateUserName?: null | string
  /**
   * 母件编码
   */
  cInvCode?: null | string
  /**
   * 母件名称
   */
  cInvName?: null | string
  /**
   * 规格型号
   */
  cInvstd?: null | string
  cModifyUserCode?: null | string
  cModifyUserName?: null | string
  /**
   * 替代说明
   */
  cReplaceMemo?: null | string
  /**
   * 替代标识
   */
  cReplaceStatus?: null | string
  cSourceAppType?: null | string
  /**
   * 原状态
   */
  cSourceStatus?: null | string
  /**
   * 计量单位编码
   */
  cUnitCode?: null | string
  /**
   * 计量单位名称
   */
  cUnitName?: null | string
  /**
   * 版本说明
   */
  cVerisionMemo?: null | string
  /**
   * 版本代号
   */
  cVersion?: null | string
  dCreateTime?: Date | null
  /**
   * 生效日期
   */
  dEffectiveDate?: Date | null
  /**
   * 失效日期
   */
  dExpirationDate?: Date | null
  dModifyTime?: Date | null
  /**
   * 版本日期
   */
  dVersionDate?: Date | null
  /**
   * 单价
   */
  iCost?: number | null
  Id?: null | string
  /**
   * 金额
   */
  iMoney?: number | null
  /**
   * 数量
   */
  iQty?: number | null
  /**
   * 数据是否删除
   */
  IsDelete?: boolean
  /**
   * 是否自制件
   */
  IsProduct?: boolean | null
  /**
   * 业务流控制(预留)
   */
  iStatus?: number
  /**
   * 数据是否有效
   */
  IsValid?: boolean
  UID?: string
  /**
   * 时间戳
   */
  utfs?: null | string
}
