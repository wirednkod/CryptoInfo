import React, { useState, useEffect } from 'react'
import { Layout, Button, Radio, Row, Col, Skeleton } from 'antd'
import { Switch, Route } from 'react-router-dom'
import Label from '../components/Label'
import moment from 'moment'
import './MainContent.less'

type SizeType = 'small' | 'middle' | 'large' | undefined

interface UsefulDataObject {
  active_cryptocurrencies: number,
  upcoming_icos: number,
  ended_icos: number,
  markets: number,
  market_cap_change_percentage_24h_usd: number,
  updated_at: number
}

type MainContentProps = {
  global: UsefulDataObject,
  markets: Array<any>,
  globalLoading: boolean,
  marketsLoading: boolean
}

const { Footer } = Layout

const MainContent = ({ global, markets, globalLoading, marketsLoading } : MainContentProps) =>  {
  const [size, setSize] = useState<SizeType>()
  const [active, setActive] = useState<number>()
  const [upcomingIcos, setUpcomingIcos] = useState<number>()
  const [endedIcos, setEndedIcos] = useState<number>()
  const [marks, setMarks] = useState<number>()
  const [marketCap, setMarketCap] = useState<number>()
  const [updatedAt, setUpdatedAt] = useState<number>()
  const [incomingMarkets, setIncomingMarkets] = useState<Array<any>>([])

  useEffect(() => {
    let { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at } = global
    setActive(active_cryptocurrencies)
    setUpcomingIcos(upcoming_icos)
    setEndedIcos(ended_icos)
    setMarks(markets)
    setMarketCap(market_cap_change_percentage_24h_usd)
    setUpdatedAt(updated_at)
  }, [global])

  useEffect(() => {
    console.log('markets', markets)
    setIncomingMarkets(markets)
  }, [markets])

  console.log('globalLoading', globalLoading, 'marketsLoading', marketsLoading)
  let markRes = incomingMarkets.forEach(m => (<div>{m.name}</div>))

  return (
    <Layout className="site-layout">
      <Skeleton active loading={globalLoading}>
        <Row>
          <Col span={24}>
            <Label title="Latest Update" align="center" value={updatedAt && moment.unix(updatedAt).format('dddd MMMM Do YYYY, h:mm:ss a')} />
          </Col>
        </Row>
        <Row className="top-info">
          <Col span={12}>
            <Label title="Active crypto" value={active} />
            <Label title="Markets" value={marks} />
            <Label title="Market Cap %Ch" value={marketCap} />        
          </Col>
          <Col span={12}>
            <Label title="ICOs" seperator="" align="right" />
            <Label title="Upcoming" value={upcomingIcos} align="right" />
            <Label title="Ended" value={endedIcos} align="right" />
          </Col>
        </Row>
      </Skeleton>
      <Layout.Content style={{ margin: '0 16px' }}>
        <Switch>
            <Route path="/about">
              <div>About</div>
            </Route>
            <Route path="/users">
              <div>Users</div>
            </Route>
            <Route path="/">
              <div>Main one "/"</div>
            </Route>
          </Switch>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: 'calc(100vh - 140px)' }}>
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
          <Skeleton active loading={marketsLoading}>
            123
          </Skeleton>
        </div>
      </Layout.Content>
      <Footer style={{ textAlign: 'center' }}>CryptoInfo - {(new Date()).getFullYear()} - Created by me</Footer>
    </Layout>
  )
}

export default MainContent
