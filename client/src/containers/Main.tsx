import React from 'react'
import { Layout } from 'antd'
import MainMenu from './MainMenu'
import MainContent from './MainContent'
import { BrowserRouter } from 'react-router-dom'
const { Header, Footer } = Layout

const Main = () =>  {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <MainMenu />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <MainContent />
          <Footer style={{ textAlign: 'center' }}>CryptoInfo - {(new Date()).getFullYear()} - Created by me</Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default Main
