import React, { useState, useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Button, Radio } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

import './Main.less'

export type SizeType = 'small' | 'middle' | 'large' | undefined
interface UsefulDataObject {
  active_cryptocurrencies: number,
  upcoming_icos: number,
  ended_icos: number,
  markets: number,
  market_cap_change_percentage_24h_usd: number,
  updated_at: number
}

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const Main = () =>  {
  const [collapsed, setCollapsed] = useState<boolean>()
  const [size, setSize] = useState<SizeType>()
  const [usefulData, setUsefulData] = useState<UsefulDataObject>()

  useEffect(() => {
    fetch("http://localhost:8000/gecko/global")
    .then(res => res.json())
    .then(res => {
      let { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at } = res.data
      let obj = { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at }
      setUsefulData(obj)
    })
  }, [])

  const mpla = () => {
    let lis = []
    if (!usefulData) return
    for (const [key, value] of Object.entries(usefulData)) {
      lis.push(<li key={Math.random()}>{key}: {value}</li>)
    }
    return lis
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(collapsed)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
              <br />
              <br />
              <Button type="primary" size={size}>
                Primary
              </Button>
              <Button size={size}>Default</Button>
              <Button type="dashed" size={size}>
                Dashed
              </Button>
              <br />
              <Button type="link" size={size}>
                Link
              </Button>
              <ul>
                {mpla()}
              </ul>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{(new Date()).getFullYear()} - Created by me</Footer>
      </Layout>
    </Layout>
  )
}

export default Main
