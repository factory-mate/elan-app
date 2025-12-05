export enum SupplyType {
  USE = '1', // 领用
  INBOUND = '2', // 入库倒冲
  PROCESS = '3' // 工序倒冲
}

export enum TaskStatus {
  CANCEL = 0, // 弃审
  AUDIT = 1, // 审核
  STOP = 2, // 停用
  RESTORE = 3 // 还原
}
