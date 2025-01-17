import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  LineChartOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import './MainMenu.less'

const { Sider } = Layout

const MainMenu = () =>  {
  const [collapsed, setCollapsed] = useState<boolean>()
  let location = useLocation()
  let selectedKeys
  switch (location.pathname) {
    case '/charts':
      selectedKeys = ['2']
      break;
    default:
      selectedKeys = ['1']
  }
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(col) => setCollapsed(col)}>
      <div className="logo">
        <img alt="logo" style={{ width: collapsed ? '50px' : '100px' }} src="/logo.png" />
      </div>
      <Menu theme="dark" defaultSelectedKeys={selectedKeys} mode="inline">
      <Menu.Item key="1" icon={<DesktopOutlined />}>
          <Link to="/">News</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LineChartOutlined />}>
          <Link to="/charts">Charts</Link>
        </Menu.Item>
        {/*
        <Menu.Item key="3" icon={<LineChartOutlined />}>
          <Link to="/Wallet">Wallet</Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6"><Link to="/">Option 6</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/">Option 7</Link></Menu.Item>
        </SubMenu>
        */}
      </Menu>
    </Sider>
  )
}

export default MainMenu
