import type { IAppConfig } from '~/utils/app.config'
import { ActionIcon, AppShell, Avatar, Burger, Group, Menu, NavLink, ScrollArea, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createFileRoute, Link, Outlet, redirect, useLocation, useRouter } from '@tanstack/react-router'
import { useAuthStore } from '~/store'
import appConfig from '~/utils/app.config'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  async beforeLoad({ context: { cookie }, location }) {
    if (!cookie) {
      redirectLogin(location.href)
    }
  },
  async loader({ location }) {
    const { userInfo, infoUser, logoutUser } = useAuthStore.getState()
    if (!userInfo) {
      try {
        await infoUser()
      }
      catch {
        logoutUser()
        redirectLogin(location.href)
      }
    }
    return userInfo
  },
  pendingComponent: () => <div>用户信息获取中...</div>,
})

function redirectLogin(currentPath: string) {
  throw redirect({
    to: '/login',
    search: {
      redirect: currentPath,
    },
  })
}

function NestsNavLink({ config: item }: { config: IAppConfig['routers'][0] }) {
  const params = useLocation()
  return (
    <NavLink
      key={item.path}
      defaultOpened={params.pathname.startsWith(item.path)}
      leftSection={<i className={item.icon} />}
      label={item.title}
      to={item.path}
      component={Link}
    >
      {
        item.children?.map(item => (
          <NestsNavLink key={item.path} config={item} />
        ))
      }
    </NavLink>
  )
}

function RouteComponent() {
  const router = useRouter()
  const { userInfo, logoutUser } = useAuthStore()
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const { setColorScheme, colorScheme } = useMantineColorScheme()

  async function handleLogoutUser() {
    logoutUser()
    await router.invalidate()
  }

  function handleToggleTheme() {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="md">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            logo
          </Group>
          <Group>
            <ActionIcon variant="default" size={32} onClick={handleToggleTheme}>
              <i className={colorScheme === 'light' ? 'icon-[icon-park-solid--moon]' : 'icon-[icon-park-solid--sun]'} />
            </ActionIcon>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar src={userInfo?.image} alt={userInfo?.firstName} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>操作</Menu.Label>
                <Menu.Item>个人中心</Menu.Item>
                <Menu.Item onClick={handleLogoutUser}>退出</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" component={ScrollArea}>
        {appConfig.routers.map(item => (<NestsNavLink config={item} key={item.path} />))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
