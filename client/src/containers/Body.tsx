import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Table, Button, } from 'antd'
import { Switch, Route } from 'react-router-dom'
import { upperCase, toUpper, indexOf } from 'lodash'
//@ts-ignore
import { Formatter } from '@helpers/Utils'
//@ts-ignore
import { Label, Charter } from '@components'
import './Body.less'

type SizeType = 'small' | 'middle' | 'large' | undefined

const validCharts = ['BTC', 'ETH', 'XRP', 'BCH', 'ADA', 'XLM', 'NEO', 'LTC', 'EOS', 'XEM', 'IOTA', 'DASH', 'XMR', 'TRX', 'ETC', 'QTUM', 'BTG', 'LSK', 'USDT', 'ZEC', 'ZRX', 'DCR', 'BAT', 'LINK', 'DAI', 'XTZ', 'BSV', 'DOGE', 'USDC']

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
  marketsLoading: boolean,
  actions: Function
}

const columns: any[] = [{
    title: '#',
    dataIndex: 'rank',
    key: 'rank',
    align: 'center',
    sorter: (a: any, b: any) => a.rank - b.rank,
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (a: Array<string>) => (<div><img alt={a[1]} className="crypto-logo" src={a[0]} />{a[1]}</div>)
  }, {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
    align: 'center',
    render: (r: string) => upperCase(r)
  }, {
    title: 'Market Cap',
    dataIndex: 'market_cap',
    key: 'market_cap',
    align: 'right',
    sorter: (a: any, b: any) => a.market_cap - b.market_cap,
    render: (k: number) => Formatter(k, 0)
  }, {
    title: 'Price',
    dataIndex: 'current_price',
    key: 'current_price',
    align: 'right',
    sorter: (a: any, b: any) => a.current_price - b.current_price,
    render: (k: number) => Formatter(k)
  }, {
    title: 'Circ. Supply',
    dataIndex: 'circulating_supply',
    key: 'circulating_supply',
    align: 'right',
    sorter: (a: any, b: any) => a.circulating_supply - b.circulating_supply,
    render: (k: number) => Formatter(k)
  }, {
    title: 'Price Change %(24h)',
    dataIndex: 'price_change_percentage_24h',
    key: 'price_change_percentage_24h',
    align: 'center',
    sorter: (a: any, b: any) => a.price_change_percentage_24h - b.price_change_percentage_24h,
    render: (k: number) => {
      let result = 'green'
      if (k < 0) {
        result= 'red'
      } else if (k === 0) {
        result = 'black'
      }
      return (<span style={{ fontWeight: 'bold', color: result}}>{ Formatter(k, 2, 'percent') }</span>)
    }
  }, {
    title: 'Chart',
    dataIndex: 'chart',
    key: 'chart',
    align: 'center',
    render:  (value: string, row: any, index: number) => {
      let symb = toUpper(row.symbol)
      if (indexOf(validCharts, symb) !== -1 ) {
        return <Charter symbol={symb} />
      } else {
        return null
      }
    }
  }]

const { Footer } = Layout

const Body = ({ global, markets, globalLoading, marketsLoading, actions } : MainContentProps) =>  {
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
      let a = Array.prototype.map.call(markets, m => ({
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
      <Row className="top-info">
        <Col span={24}>
          <div style={{ margin: '0 30px 16px 0', float: 'right', zIndex: 50 }}>
            <Button size="small" type="primary" onClick={() => { actions() }} className='reload-button' loading={marketsLoading}>
              Reload
            </Button>
          </div>
          <Label title="Active crypto" value={Formatter(active, undefined, 'decimal')} />
          <Label title="Markets" value={Formatter(marks, undefined, 'decimal')} />
          <Label title="Market Cap Change" value={Formatter(marketCap, 2, 'percent')} />
          <Label title="Upcoming ICOs" value={Formatter(upcomingIcos, undefined, 'decimal')} />
          <Label title="Ended ICOs" value={Formatter(endedIcos, undefined, 'decimal')} />
        </Col>
      </Row>
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
      <Footer style={{ textAlign: 'center' }}>CryptoInfo - {(new Date()).getFullYear()} - Created by <a href="https://github.com/wirednkod" target="_blank">wirednkod</a></Footer>
    </Layout>
  )
}

export default Body
