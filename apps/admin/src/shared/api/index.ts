import { HttpClient } from '../axios'

export const MANAGE_CENTER_API_PREFIX = import.meta.env.VITE_MANAGE_CENTER_API_PREFIX
export const MES_SERVICE_API_PREFIX = import.meta.env.VITE_MES_SERVICE_API_PREFIX

export const httpClient = new HttpClient()
