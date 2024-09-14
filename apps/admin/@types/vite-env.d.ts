/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string
  readonly VITE_MANAGER_CENTER_API_PREFIX: string
  readonly VITE_MANAGER_CENTER_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
