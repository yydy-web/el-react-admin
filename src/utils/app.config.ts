interface IAppRouteItem {
  icon: string
  path: string
  title: string
  auth?: boolean
  children?: IAppRouteItem[]
}

export interface IAppConfig {
  routers: IAppRouteItem[]
  apptitle: string
  appVersion: string
}

export default {
  routers: [
    { path: '/', title: '首页', icon: 'icon-[line-md--home]' },
    { path: '/table', title: 'react table', icon: 'icon-[hugeicons--table]' },
    { path: '/form', title: 'react form', icon: 'icon-[fluent--form-48-regular]' },
    { path: '/store', title: 'zustand 缓存', icon: 'icon-[octicon--cache-24]' },
    { path: '/user', title: 'react query', icon: 'icon-[logos--react-query]' },
    {
      path: '/layout-test',
      title: '嵌套路由',
      icon: 'icon-[ant-design--layout-outlined]',
      children: [
        { path: '/layout-test', title: '子路由1', icon: 'icon-[ant-design--layout-outlined]' },
        {
          path: '/test2',
          title: '子路由2',
          icon: 'icon-[ant-design--layout-outlined]',
          children: [
            { path: '/test2', title: '子路由2-1', icon: 'icon-[ant-design--layout-outlined]' },
            { path: '/test3/1', title: '子路由2-2', icon: 'icon-[ant-design--layout-outlined]' },
          ],
        },
      ],
    },
    { path: '/group2', title: '分组', icon: 'icon-[icons8--group]' },
    { path: '/page', title: '用户鉴权', icon: 'icon-[arcticons--microsoft-authenticator]' },
    { path: '/icon', title: '自定义图标', icon: 'icon-[simple-icons--iconify]' },
    { path: '/jotai', title: 'jotai', icon: 'icon-[solar--ghost-smile-linear]' },
    { path: '/404', title: 'not found page', icon: 'icon-[tabler--error-404]' },
    { path: '/about', title: '关于', icon: 'icon-[ix--about]' },
  ],
  apptitle: APP_TITLE,
  appVersion: `v${APP_VERSION}`,
} as IAppConfig
