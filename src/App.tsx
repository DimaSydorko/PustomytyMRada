import React from 'react'
import { compose } from 'redux'
import { useSelector } from 'react-redux'
import { Link, withRouter, Route, Switch} from 'react-router-dom'
import { Button, Layout, Menu } from 'antd'
import {
  SolutionOutlined,
  TeamOutlined,
  MessageOutlined,
  HomeOutlined,
} from '@ant-design/icons'

import { withSuspense } from './components/hoc/withSuspense'
import { AdminLogin } from './components/AdminPage/login'
import { logout } from './redux/adminAuth-reducer'
import HomePage from './components/UserPage/HomePage/HomePage'
import { AppStateType } from './redux/redux-store'

const { Header, Content, Footer } = Layout;

const AdminPostsPage = React.lazy(() => import ('./components/AdminPage/PostsAdmin'))
const AdminEventPage = React.lazy(() => import ('./components/AdminPage/EventAdmin'))
const AdminMembersPage = React.lazy(() => import ('./components/AdminPage/MembersAdmin'))
const SuspendedAdminPostsPage = withSuspense(AdminPostsPage)
const SuspendedAdminEventPage = withSuspense(AdminEventPage)
const SuspendedAdminMembersPage = withSuspense(AdminMembersPage)


const App = React.memo(() => {
  const isAdmin = useSelector((state:AppStateType) => state.adminAuth.isAuth)
  return(
    <Layout>
      <Layout>
        <Header>
          <div/>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined/>}>
              <Link to={'/about'}>Про нас</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SolutionOutlined/>}>
              <Link to={'/projects'}>Наші проекти</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<MessageOutlined/>}>
              <Link to={'/event'}>Анонси</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TeamOutlined/>}>
              <Link to={'/members'}>Учасники</Link>
            </Menu.Item>
          </Menu>
          {isAdmin ? <Button danger onClick={()=>logout()}>Log out</Button> : null}
        </Header>
        <Content>
          <div>
            <Content style={{ margin: '24px 16px 0', overflow: 'revert' }}>
              <Switch>
                <Route exact path='/admin' render={() => <AdminLogin/>}/>
                <Route path='/event' render={() => <SuspendedAdminEventPage/>}/>
                <Route path='/members' render={() => <SuspendedAdminMembersPage/>}/>
                <Route path='/projects' render={() => <SuspendedAdminPostsPage/>}/>
                <Route path='*' render={() => <HomePage/>}/>
              </Switch>
            </Content>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>MRada Pustomyty 2021</Footer>
      </Layout>
    </Layout>
  )
})

export default compose<React.ComponentType>(
  withRouter
) (App)