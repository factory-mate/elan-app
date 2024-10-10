import { LowCodeWidgetType } from './enums'
import type {
  LowCodeConfigParamVo,
  LowCodeConfigVo,
  LowCodeTransformedConfig,
  LowCodeTransformedParam
} from './types'

export function transformConfig(configVoList: LowCodeConfigVo[]) {
  const result: LowCodeTransformedConfig = {
    filter: [],
    action: [],
    table: {
      cols: [],
      actionButtons: []
    },
    detail: []
  }

  configVoList.forEach((configVo) => {
    const { cPropertyClassTypeCode: type, Parms: params = [] } = configVo
    const transformedParams = params
      .map<LowCodeTransformedParam>((param) => {
        const {
          cAttributeCode,
          cAttributeName,
          cShowName,
          cIncludeModelCode,
          IsRequest: required,
          iMaxLengh: maxLength,
          IsShow: show,
          iIndex: sortIndex,
          IsMulitChoose: multiple,
          DefinedParm4,
          cHttpTypeCode: httpType,
          cServerIP: ip,
          cUrl: url
        } = param
        return {
          code: cAttributeCode,
          label: cShowName || cAttributeName,
          type: transformLowCodeWidgetType(param),
          modelCode: cIncludeModelCode,
          required,
          maxLength,
          show,
          sortIndex,
          multiple,
          readonly: DefinedParm4 === '1',
          httpType,
          ip,
          url
        }
      })
      .toSorted(({ sortIndex: a }, { sortIndex: b }) => {
        if (typeof a !== 'number' && typeof b !== 'number') {
          return 0
        }
        if (typeof a !== 'number') {
          return 1
        }
        if (typeof b !== 'number') {
          return -1
        }
        return a - b
      })

    switch (type) {
      case 'Filter':
        result.filter.push(...transformedParams)
        break
      case 'ToolBut':
        result.filter.push(...transformedParams)
        break
      case 'Grid':
        result.table.cols.push(
          ...transformedParams
            .filter((i) => i.type)
            .filter(
              (i) =>
                ![
                  LowCodeWidgetType.API_BUTTON,
                  LowCodeWidgetType.CODE_BUTTON,
                  LowCodeWidgetType.TABLE_API
                ].includes(i.type!)
            )
        )
        result.table.actionButtons.push(
          ...transformedParams.filter(
            (i) =>
              i.type === LowCodeWidgetType.API_BUTTON || i.type === LowCodeWidgetType.CODE_BUTTON
          )
        )
        result.table.api = transformedParams.find((i) => i.type === LowCodeWidgetType.TABLE_API)
        break
      case 'Head':
        result.filter.push(...transformedParams)
        break
      default:
        break
    }
  })

  return result
}

function transformLowCodeWidgetType(param: LowCodeConfigParamVo) {
  const {
    cAttributeTypeCode,
    cControlTypeCode,
    cDataTypeCode,
    cIncludeModelCode,
    cUrl,
    // eslint-disable-next-line unused-imports/no-unused-vars
    IsMulitChoose
  } = param ?? {}
  if (cAttributeTypeCode === 'binddata') {
    return LowCodeWidgetType.TABLE_API
  }

  if (cAttributeTypeCode === 'method') {
    if (cIncludeModelCode) {
      return LowCodeWidgetType.CODE_BUTTON
    }
    if (cUrl) {
      return LowCodeWidgetType.API_BUTTON
    }
  }

  if (cControlTypeCode === 'TextBoxLink') {
    return LowCodeWidgetType.LIST_SEARCH
  }

  if (cControlTypeCode === 'TextBox') {
    if (cDataTypeCode === 'Int') {
      return LowCodeWidgetType.INPUT_NUMBER
    }
    if (cDataTypeCode === 'Nvarchar') {
      return LowCodeWidgetType.INPUT
    }
  }

  if (cDataTypeCode === 'Nvarchar') {
    return LowCodeWidgetType.TEXT
  }

  return undefined
}
