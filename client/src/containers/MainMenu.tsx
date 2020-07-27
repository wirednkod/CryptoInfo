import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  LineChartOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './MainMenu.less'

const { Sider } = Layout
const { SubMenu } = Menu

const MainMenu = () =>  {
  const [collapsed, setCollapsed] = useState<boolean>()

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(col) => setCollapsed(col)}>
      <div className="logo">
        <img alt="logo" style={{ width: collapsed ? '50px' : '100px' }} src="/logo.png" />
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DesktopOutlined />}>
          <Link to="/">News</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LineChartOutlined />}>
          <Link to="/charts">Charts</Link>
        </Menu.Item>
        {/*
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
