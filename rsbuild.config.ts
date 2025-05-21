import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'
import { pluginMdx } from '@rsbuild/plugin-mdx'
import { remarkCodeSrc } from './plugins/remark'
import { version } from './package.json' with { type: 'json' }

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
    })
  ],
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
