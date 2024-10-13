import type { LowCodeWidgetType } from './enums'

export interface LowCodeConfigVo {
  cNodeCode: string
  cAppCode: string
  /**
   * 布局代码
   */
  cModelCode: string
  /**
   * 区域号
   */
  cFormPropertyCode: string
  /**
   * 区域类型
   */
  cPropertyClassTypeCode: string
  IsDynamic: boolean
  cCssTypeCode: string
  IsSelectIndex: boolean
  DefinedParmnumber: boolean
  DefinedParm1: boolean
  DefinedParm2: boolean
  DefinedParm3: string
  DefinedParm4: string
  DefinedParm5: string
  DefinedParm6: string
  DefinedParm7: string
  DefinedParm8: string
  DefinedParm9: string
  Parms: LowCodeConfigParamVo[]
}

export interface LowCodeConfigParamVo {
  cPropertyClassTypeCode: string
  /**
   * 区域号
   */
  cFormPropertyCode: string
  /**
   * 资源代码
   */
  cResourcesCode: string
  /**
   * 字段参数名
   */
  cAttributeCode: string
  /**
   * 字段名称
   */
  cAttributeName: string
  /**
   * 字段名称展示值（优先级大于 cAttributeName）
   */
  cShowName: string
  /**
   * 控件类型
   * @enum
   * - `TextBox` 文本
   * - `TextBoxLink` 搜索弹框选择
   */
  cControlTypeCode: string
  /**
   * 数据类型
   * @description `TextBox` 时， Int 只能输入数字，Nvarchar 可以输入字母等字符
   */
  cDataTypeCode: string
  cInputTypeCode: string
  IsIncludeMode: boolean
  /**
   * 引用布局对象
   * @description 有数据表示要获取布局
   */
  cIncludeModelCode: string
  /**
   * 是否必填
   */
  IsRequest: boolean
  /**
   * 最大输入长度
   */
  iMaxLengh: number
  /**
   * 是否显示
   */
  IsShow: boolean
  IsSet: boolean
  /**
   * 显示顺序
   */
  iIndex: number
  /**
   * 是否多选
   */
  IsMulitChoose: boolean
  /**
   * 查询条件字段拼接前缀
   */
  cPrefix: string
  /**
   * 查询条件比较符号、
   * @description `cControlTypeCode` 是 `DatePicker2` 时，即代表日期区间，前端固定条件比较符号是 `>=` 和 `<=`
   */
  cConditions: string
  IsOrderBy: boolean
  cAttributeTypeCode: string
  IsAuth: boolean
  cAuthCode: string
  /**
   * 接口调用请求方式
   */
  cHttpTypeCode: string
  /**
   * 接口名称
   */
  cUrl: string
  cModelView: string
  /**
   * 调用地址
   */
  cServerIP: string
  iStatusValue: number
  cPropertyParm: string
  IsFlow: boolean
  iConditionValue: number
  cFlowNodeCode: string
  cFlowTypeCode: string
  Resource: LowCodeConfigResourceVo
  DefinedParmnumber: boolean
  /**
   * 显示时是否独占一行
   */
  DefinedParm1: boolean
  /**
   * 是否合并条件
   */
  DefinedParm2: boolean
  /**
   * 表格宽度占比
   */
  DefinedParm3: string
  /**
   * 是否只读
   */
  DefinedParm4: string
  DefinedParm5: string
  DefinedParm6: string
  DefinedParm7: string
  DefinedParm8: string
  DefinedParm9: string
  IsValid: boolean
}

export interface LowCodeConfigResourceVo {
  cServerIP: string
  cResourcesCode: string
  cAttributeTypeCode: string
  cAttributeCode: string
  cAttributeName: string
  IsAuth: boolean
  cAuthCode: string
  IsStatusControl: boolean
  cStatusValue: string
  cHttpTypeCode: string
  cUrl: string
  cModelView: string
  cMemo: string
  cServerName: string
}

export interface LowCodeTransformedParam {
  /**
   * 字段参数名
   */
  code?: string
  /**
   * 字段显示名
   */
  label?: string
  /**
   * 控件类型
   */
  type?: LowCodeWidgetType
  /**
   * 布局代码
   */
  modelCode?: string
  /**
   * 必填字段
   */
  required?: boolean
  /**
   * 最大输入长度
   */
  maxLength?: number
  /**
   * 是否显示
   */
  show?: boolean
  /**
   * 显示顺序
   */
  sortIndex?: number
  /**
   * 是否多选
   */
  multiple?: boolean
  /**
   * 是否只读
   */
  readonly?: boolean
  /**
   * 接口请求方式
   */
  httpType: string
  /**
   * 接口 IP
   */
  ip: string
  /**
   * 接口地址
   */
  url: string
}

export interface LowCodeTransformedConfig {
  filter: LowCodeTransformedParam[]
  action: LowCodeTransformedParam[]
  table: LowCodeTableConfig
  detail: LowCodeTransformedParam[]
}

export interface LowCodeTableConfig {
  cols: LowCodeTransformedParam[]
  actionButtons: LowCodeTransformedParam[]
  api?: LowCodeTransformedParam
}

export interface LowCodeAPIConfig {
  httpType?: string
  url?: string
}
