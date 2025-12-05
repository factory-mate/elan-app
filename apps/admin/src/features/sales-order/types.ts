export interface SalesOrderVo {
  /**
   * 单据号
   */
  cCode?: null | string
  cCreateUserCode?: null | string
  cCreateUserName?: null | string
  /**
   * 客户编码
   */
  cCusCode?: null | string
  /**
   * 客户名称
   */
  cCusName?: null | string
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
   * 部门编码
   */
  cDepCode?: null | string
  /**
   * 部门名称
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
   * 规格
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
   * 销售类型
   */
  cSTName?: null | string
  /**
   * 单位
   */
  cUnitName?: null | string
  dCreateTime?: Date | null
  /**
   * 单据日期
   */
  dDate?: Date | null
  dModifyTime?: Date | null
  IsDelete?: boolean
  iStatus?: number
  IsValid?: boolean
  /**
   * 父UID
   */
  MID?: string
  /**
   * 辅计量数量
   */
  nAssQuantity?: number | null
  /**
   * 辅计量单位
   */
  nAssUnitName?: null | string
  /**
   * 数量
   */
  nQuantity?: number
  /**
   * 剩余数量
   */
  RestQuantity?: number | null
  UID?: string
  utfs?: null | string
}
