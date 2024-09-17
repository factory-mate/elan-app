export interface LowCodeConfigVo {
  cNodeCode: string
  cAppCode: string
  cModelCode: string
  cFormPropertyCode: string
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
  cFormPropertyCode: string
  cResourcesCode: string
  cAttributeCode: string
  cAttributeName: string
  cShowName: string
  cControlTypeCode: string
  cDataTypeCode: string
  cInputTypeCode: string
  IsIncludeMode: boolean
  cIncludeModelCode: string
  IsRequest: boolean
  iMaxLengh: number
  IsShow: boolean
  IsSet: boolean
  iIndex: number
  IsMulitChoose: boolean
  cPrefix: string
  cConditions: string
  IsOrderBy: boolean
  cAttributeTypeCode: string
  IsAuth: boolean
  cAuthCode: string
  cHttpTypeCode: string
  cUrl: string
  cModelView: string
  cServerIP: string
  iStatusValue: number
  cPropertyParm: string
  IsFlow: boolean
  iConditionValue: number
  cFlowNodeCode: string
  cFlowTypeCode: string
  Resource: LowCodeConfigResourceVo
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
