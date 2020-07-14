import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './MainMenu.less'

const { Sider } = Layout
const { SubMenu } = Menu

const MainMenu = () =>  {
  const [collapsed, setCollapsed] = useState<boolean>()

  useEffect(() => {
  }, [])

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(col) => setCollapsed(col)}>
      <div className="logo">
        <img alt="logo" style={{ width: '100%' }} src="/logo.png" />
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6"><Link to="/">Option 6</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/">Option 7</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default MainMenu
