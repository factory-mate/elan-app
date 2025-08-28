/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string
  readonly VITE_MANAGE_CENTER_API_PREFIX: string
  readonly VITE_MANAGE_CENTER_API_URL: string
  readonly VITE_MES_SERVICE_API_PREFIX: string
  readonly VITE_MES_SERVICE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
