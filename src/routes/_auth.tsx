import { AppShell, Avatar, Burger, Group, Menu, NavLink, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createFileRoute, Link, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { useAuthStore } from '~/store'
import appConfig from '~/utils/app.config'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  async beforeLoad({ context: { cookie }, location }) {
    if (!cookie) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  async loader() {
    const { userInfo, infoUser } = useAuthStore.getState()
    if (!userInfo) {
      await infoUser()
    }
    return userInfo
  },
  pendingComponent: () => <div>用户信息获取中...</div>,
})

function RouteComponent() {
  const router = useRouter()
  const { userInfo, logoutUser } = useAuthStore()
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  async function handleLogoutUser() {
    logoutUser()
    await router.invalidate()
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
        {
          appConfig.routers.map(item => (
            <NavLink
              key={item.path}
              description={`${item.title} description`}
              leftSection={<i className={item.icon} />}
              label={item.title}
              to={item.path}
              component={Link}
            />
          ))
        }
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
