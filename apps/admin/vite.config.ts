import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import { antdResolver, reactPresets } from '@bit-ocean/auto-import'
import { BootstrapAnimation } from '@bit-ocean/bootstrap-animation'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import ReactSWC from '@vitejs/plugin-react-swc'
import { visualizer as Visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import iconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Info from 'unplugin-info/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import { defineConfig, loadEnv, type ProxyOptions } from 'vite'
import Compression from 'vite-plugin-compression'
import WebfontDownload from 'vite-plugin-webfont-dl'

const DEFAULT_APP_PORT = 5070

export default defineConfig(({ mode }) => {
  const envPath = path.resolve(process.cwd())
  const environment = loadEnv(mode, envPath) as ImportMetaEnv
  const {
    VITE_PORT,
    VITE_MANAGE_CENTER_API_PREFIX,
    VITE_MANAGE_CENTER_API_URL,
    VITE_MES_SERVICE_API_PREFIX,
    VITE_MES_SERVICE_API_URL
  } = environment

  const port = Number.parseInt(VITE_PORT, 10) || DEFAULT_APP_PORT
  const proxy: Record<string, string | ProxyOptions> = {
    [VITE_MANAGE_CENTER_API_PREFIX]: {
      target: VITE_MANAGE_CENTER_API_URL,
      changeOrigin: true,
      rewrite: (p: string) => p.replace(VITE_MANAGE_CENTER_API_PREFIX, '')
    },
    [VITE_MES_SERVICE_API_PREFIX]: {
      target: VITE_MES_SERVICE_API_URL,
      changeOrigin: true,
      rewrite: (p: string) => p.replace(VITE_MES_SERVICE_API_PREFIX, '')
    }
  }

  return {
    plugins: [
      ReactSWC(),
      TanStackRouterVite(),
      AutoImport({
        dts: '@types/auto-imports.d.ts',
        include: [/\.[tj]sx?$/, /\.md$/],
        imports: [
          ...reactPresets,
          { from: '@elan/config', imports: ['appConfig'] },
          { from: '@/shared/router', imports: ['router'] },
          { from: '@/shared/query-client', imports: ['queryClient'] }
        ],
        dirs: [
          'src/shared/ag-grid/*',
          'src/shared/antd/*',
          'src/shared/api/*',
          'src/shared/components/**',
          'src/shared/consts/*',
          'src/shared/enums/*',
          'src/shared/echarts/*',
          'src/shared/hooks/**',
          'src/shared/layouts/*',
          'src/shared/providers/**',
          'src/shared/store/*',
          'src/shared/utils/*',
          { glob: 'src/shared/types', types: true }
        ],
        resolvers: [
          antdResolver(),
          iconsResolver({
            prefix: false,
            extension: 'jsx',
            enabledCollections: ['line-md', 'logos', 'lucide']
          })
        ]
      }),
      Icons({
        autoInstall: true,
        compiler: 'jsx',
        jsx: 'react'
      }),
      Info({
        package: {
          dependencies: true,
          devDependencies: true
        }
      }),
      TurboConsole(),
      WebfontDownload(),
      Compression({
        verbose: true,
        disable: true,
        threshold: 10_240,
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: true
      }),
      Visualizer({
        open: false,
        gzipSize: true
      }),
      BootstrapAnimation({
        name: 'Factory Mate',
        description: '',
        customContent: 'Powered by FactoryMate'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url))
      }
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    build: {
      outDir: `dist/${mode}`,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
            return undefined
          }
        }
      }
    },
    server: {
      host: true,
      port,
      strictPort: true,
      open: false,
      proxy
    },
    preview: {
      host: true,
      port,
      strictPort: true,
      open: false,
      proxy
    }
  }
})
