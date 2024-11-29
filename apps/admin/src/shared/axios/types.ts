import type { Router } from '@tanstack/react-router'
import type { MessageInstance } from 'antd/es/message/interface'
import type { HttpStatusCode } from 'axios'

export interface InterceptorInitOptions {
  /**
   * Tanstack Router instance.
   */
  router?: Router<any, any, any>
  /**
   * antd Message instance.
   */
  message?: MessageInstance
}

export interface ErrorMessage {
  Key: string
  Value: string
}

export interface R<T = unknown> {
  msg: string
  errmsg: ErrorMessage[] | null
  status: HttpStatusCode
  success: boolean
  data: T
}
