export interface MpsParamsVo {
  UID: string
  utfs: string
  // 是否考虑销售预测
  bSalePrediction: boolean
  // 是否考虑销售订单
  bSaleOrder: boolean
  // 是否考虑未完工订单
  bUnEndVouch: boolean
  // 是否考虑库存
  bStock: boolean
  // 是否考虑合并订单
  bMerge: boolean
}

export interface MpsParamsAddDto extends MpsParamsVo {}

export interface MpsParamsEditDto extends MpsParamsVo {}
