export interface ListVo {
  UID?: null | string
  /**
   * 生产订单号
   */
  cCode?: null | string
  /**
   * 部门编码
   */
  cDepCode?: null | string
  /**
   * 生产部门名称
   */
  cDepName?: null | string
  /**
   * 存货编码
   */
  cInvCode?: null | string
  /**
   * 存货名称
   */
  cInvName?: null | string
  /**
   * 存货规格
   */
  cInvStd?: null | string
  /**
   * 物料编码
   */
  cMaterialCode?: null | string
  /**
   * 物料名称
   */
  cMaterialName?: null | string
  /**
   * 物料规格
   */
  cMaterialStd?: null | string
  /**
   * 物料单位
   */
  cMaterialUnitName?: null | string
  /**
   * 生产订单标准类型
   */
  cStandardType?: null | string
  /**
   * 生产订单标准类型
   */
  cStandardTypeName?: null | string
  /**
   * 单位
   */
  cUnitName?: null | string
  /**
   * 生产订单类别
   */
  cVouchType?: null | string
  /**
   * 生产订单类别
   */
  cVouchTypeName?: null | string
  /**
   * 开工日期
   */
  dBeginTime?: Date | null
  /**
   * 开工日期
   */
  dBeginTimeStr?: null | string
  /**
   * 单据日期
   */
  dDate?: Date | null
  /**
   * 完工日期
   */
  dEndTime?: Date | null
  /**
   * 完工日期
   */
  dEndTimeStr?: null | string
  /**
   * 单据状态
   */
  HeadiStatus?: number | null
  /**
   * 单据状态
   */
  HeadiStatusName?: null | string
  /**
   * 子件行号
   */
  iMaterialRow?: number | null
  /**
   * 行号
   */
  iRow?: number | null
  /**
   * 应领数量
   */
  nMaterialQuantity?: number | null
  /**
   * 数量
   */
  nQuantity?: number | null
  /**
   * 已领数量
   */
  nUseQuantity?: null | string
}
