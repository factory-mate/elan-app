export interface ProcessVo {
  UID: string
  cProcessCode: string
  cProcessName: string
  cCreateUserName: string
  dCreateTime: string
  utfs: string
}

export interface ProcessAddDto extends ProcessVo {}

export interface ProcessEditDto extends ProcessAddDto {}
