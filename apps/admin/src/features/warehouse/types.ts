export interface WarehouseVo {
  /**
   * 授权码
   */
  cAuthCode?: null | string
  cCreateUserCode?: null | string
  cCreateUserName?: null | string
  cDefindParm01?: null | string
  cDefindParm02?: null | string
  cDefindParm03?: null | string
  cDefindParm04?: null | string
  cDefindParm05?: null | string
  cDefindParm06?: null | string
  cDefindParm07?: null | string
  cDefindParm08?: null | string
  cDefindParm09?: null | string
  cDefindParm10?: number | null
  /**
   * 出入库方式
   */
  cInOutTypeCode?: null | string
  cMemo?: null | string
  cModifyUserCode?: null | string
  cModifyUserName?: null | string
  /**
   * 节点号（多租户预留）
   */
  cNodeCode?: null | string
  cSourceAppType?: null | string
  /**
   * 仓库地址
   */
  cWareHouseAdress?: null | string
  /**
   * 条码
   */
  cWareHouseBarCode?: null | string
  /**
   * 仓库编码
   */
  cWareHouseCode?: null | string
  /**
   * 仓库名称
   */
  cWareHouseName?: null | string
  /**
   * 仓库类型编号
   */
  cWareHouseTypeCode?: null | string
  dCreateTime?: Date | null
  dModifyTime?: Date | null
  /**
   * 是否加权控制
   */
  IsAuth?: boolean | null
  /**
   * 数据是否删除
   */
  IsDelete?: boolean | null
  /**
   * 业务流控制(预留)
   */
  iStatus?: number
  /**
   * 数据是否有效
   */
  IsValid?: boolean | null
  UID?: string
  /**
   * 时间戳
   */
  utfs?: null | string
}

export interface WarehouseAddDto extends WarehouseVo {}

export interface WarehouseEditDto extends WarehouseVo {}
