import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Spin, Table } from 'antd'
import { Switch, Route } from 'react-router-dom'
import Label from '../components/Label'
import './Body.less'

type SizeType = 'small' | 'middle' | 'large' | undefined

interface UsefulDataObject {
  active_cryptocurrencies: number,
  upcoming_icos: number,
  ended_icos: number,
  markets: number,
  market_cap_change_percentage_24h_usd: number
}

type MainContentProps = {
  global: UsefulDataObject,
  markets: Array<any>,
  globalLoading: boolean,
  marketsLoading: boolean
}

const columns = [{
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (a: Array<string>) => (<div><img alt={a[1]} className="crypto-logo" src={a[0]} />{a[1]}</div>)
  }, {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
  }, {
    title: 'Market Cap',
    dataIndex: 'market_cap',
    key: 'market_cap',
  }, {
    title: 'Price',
    dataIndex: 'current_price',
    key: 'current_price',
  }, {
    title: 'Circ. Supply',
    dataIndex: 'circulating_supply',
    key: 'circulating_supply',
  }, {
    title: 'Price Change %(24h)',
    dataIndex: 'price_change_percentage_24h',
    key: 'price_change_percentage_24h'
  }]

const { Footer } = Layout

const Body = ({ global, markets, globalLoading, marketsLoading } : MainContentProps) =>  {
  const [active, setActive] = useState<number>()
  const [upcomingIcos, setUpcomingIcos] = useState<number>()
  const [endedIcos, setEndedIcos] = useState<number>()
  const [marks, setMarks] = useState<number>()
  const [marketCap, setMarketCap] = useState<number>()
  const [data, setData] = useState<Array<any>>([])

  useEffect(() => {
    let { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd } = global
    setActive(active_cryptocurrencies)
    setUpcomingIcos(upcoming_icos)
    setEndedIcos(ended_icos)
    setMarks(markets)
    setMarketCap(market_cap_change_percentage_24h_usd)
  }, [global])

  useEffect(() => {
    const mostFamous = (markets: Array<any>, howMany?: number) => {
      let a = markets && markets.map(m => ({
        'key': m.market_cap_rank,
        'rank': m.market_cap_rank,
        'name': [m.image, m.name],
        'symbol': m.symbol,
        'market_cap': m.market_cap,
        'current_price': m.current_price,
        'circulating_supply': m.circulating_supply,
        'price_change_percentage_24h': m.price_change_percentage_24h
      }))
      setData(a)
    }
    mostFamous(markets)
  }, [markets])
  
  return (
    <Layout className="site-layout">
      <Spin spinning={globalLoading}>
        <Row className="top-info">
          <Col span={24}>
            <Label title="Active crypto" value={active} />
            <Label title="Markets" value={marks} />
            <Label title="Market Cap %Ch" value={marketCap?.toFixed(2)} />
            <Label title="Upcoming ICOs" value={upcomingIcos} />
            <Label title="Ended ICOs" value={endedIcos} />
          </Col>
        </Row>
      </Spin>
      <Layout.Content style={{ margin: '0 16px' }}>
        <Switch>
          <Route path="/">
            <div className="site-layout-background">
              <Table
                loading={marketsLoading}
                dataSource={data}
                columns={columns}
                size="small"
                pagination={false} />
            </div>
          </Route>
          <Route path="/about">
            <div>About</div>
          </Route>
          <Route path="/users">
            <div>Users</div>
          </Route>
        </Switch>
      </Layout.Content>
      <Footer style={{ textAlign: 'center' }}>CryptoInfo - {(new Date()).getFullYear()} - Created by me</Footer>
    </Layout>
  )
}

export default Body
