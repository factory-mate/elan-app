import { type LowCodeConfigVo, type LowCodeTransformedConfig } from './types'

export function transformConfig(configVo: LowCodeConfigVo): LowCodeTransformedConfig {
  const {
    cModelCode: modelCode,
    cFormPropertyCode: formPropertyCode,
    cPropertyClassTypeCode: propertyClassTypeCode,
    Parms: params
  } = configVo

  return {
    modelCode,
    formPropertyCode,
    propertyClassTypeCode,
    params: params.map((param) => ({}))
  }
}
