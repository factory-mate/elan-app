import { HttpClient } from '../axios'

export const MANAGER_CENTER_API_PREFIX = import.meta.env.VITE_MANAGER_CENTER_API_PREFIX
export const MES_SERVICE_API_PREFIX = import.meta.env.VITE_MES_SERVICE_API_PREFIX

export const httpClient = new HttpClient()
