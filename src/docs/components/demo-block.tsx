import { useClipboard } from '@mantine/hooks'
import cls from 'clsx'
import { Tooltip } from '@mantine/core'
import React, { useEffect, useMemo, useState } from 'react'
import { codeToHtml } from 'shiki'
import { notifications } from '@mantine/notifications';

interface Props {
  src: string
  source: string
  auth?: boolean
}

const contextExample = import.meta.webpackContext('../example', {
  recursive: true,
  regExp: /\.tsx$/,
})

const ExampleComponent: React.FC<Props> = ({ src, source, auth = false }) => {
  // 状态管理
  const [render, setRender] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [html, setHtml] = useState('')
  const [AsyncComp, setAsyncComp] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const module = contextExample(`./${src}`)
        if (!module) {
          throw new Error('not found comp')
        }
        setAsyncComp(() => (module as { default: React.ComponentType }).default)
        setRender(true)
      }
      catch (error) {
        console.error(error)
      }
    }

    loadComponent()
  }, [src])

  const code = useMemo(() => decodeURIComponent(source), [source])

  useEffect(() => {
    const highlightCode = async () => {
      if (showCode) {
        const highlighted = await codeToHtml(code, {
          lang: 'tsx',
          theme: 'vitesse-light',
        })
        setHtml(highlighted)
      }
    }

    highlightCode()
  }, [showCode, code])

  // 复制功能
  const { copy } = useClipboard()
  const handleCopy = () => {
    copy(code)
    notifications.show({
      position: 'top-center',
      title: '复制成功',
      message: '代码已成功复制到剪贴板',
      color: 'green',
      autoClose: 2000,
    })
  }

  return (
    <div className="mt-6 border border-solid pt-4 px-2 rounded border-slate-200 overflow-auto mx-3">
      {/* 组件渲染区域 */}
      {render && (
        <div
          className={cls(`w-full min-h-[120px] relative ${auth ? 'after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-gray-1 after:dark:bg-[#ccc] after:text-black after:content-[\'授权后查看\'] after:text-2xl after:flex after:items-center after:justify-center' : ''
            }`)}
        >
          {(auth) || !auth
            ? (
              AsyncComp ? <AsyncComp /> : null
            )
            : null}
        </div>
      )}

      {/* 代码展示区域 */}
      {showCode && (
        <div className="border-t border-solid border-slate-200 pt-2 flex justify-end items-center mt-4 overflow-auto">
          <div className="w-full" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}

      {/* 操作按钮 */}
      <div className="border-t border-solid border-slate-200 flex justify-end items-center h-8">
        <Tooltip label={showCode ? '收起代码' : '打开代码'}>
          <div
            title="show source code"
            className="icon-[carbon--code] mx-2 cursor-pointer"
            style={{ color: '#737373' }}
            onClick={() => setShowCode(!showCode)}
          />
        </Tooltip>
        <Tooltip label="复制代码">
          <div
            title="copy source code"
            className="icon-[carbon--copy-file] mx-2 cursor-pointer"
            style={{ color: '#737373' }}
            onClick={handleCopy}
          />
        </Tooltip>

      </div>
    </div>
  )
}

export default ExampleComponent