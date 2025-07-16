import { defineConfig } from '@rsbuild/core'
import { pluginMdx } from '@rsbuild/plugin-mdx'
import { pluginReact } from '@rsbuild/plugin-react'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'
import { version } from './package.json' with { type: 'json' }
import { remarkCodeSrc } from './plugins/remark'

const APP_TITLE = 'template rs'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginMdx({
      mdxLoaderOptions: {
        remarkPlugins: [
          [remarkCodeSrc, { basePath: '' }],
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.2.91:8000',
        changeOrigin: true,
        pathRewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  source: {
    define: {
      APP_TITLE: JSON.stringify(APP_TITLE),
      APP_VERSION: JSON.stringify(version),
    },
  },
  html: {
    favicon: './src/assets/icon/app-icon.png',
    title: APP_TITLE,
  },
  performance: {
    buildCache: process.env.NODE_ENV === 'development',
  },
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },
})
