import { Chart, Tooltip, Axis, Line, Point } from 'viser-react'
import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Table, Button, Popover } from 'antd'
import { FundTwoTone } from '@ant-design/icons'
import { Switch, Route } from 'react-router-dom'
import { upperCase, toUpper, indexOf } from 'lodash'
import moment from 'moment'
import { Formatter } from '@helpers/Utils'
import { Label } from '@components'
import axios from 'axios'
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

const scale = [{
  dataKey: 'value',
  min: 0,
},{
  dataKey: 'date',
  min: 0,
  max: 200,
}]

const columns = [{
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

type CharterProps = {
  symbol: any
}

const Charter = ({ symbol } : CharterProps) => {
  const [data, setData] = useState<object>()

  useEffect(() => {
    const func = async () => {
      let fin = []
      let res = await axios.get(`https://production.api.coindesk.com/v2/price/values/${toUpper(symbol)}?start_date=2020-01-22T14:38&end_date=2020-07-23T14:38&ohlc=false`)
      let entries = res?.data?.data?.entries
      if (entries.length) {
        entries.forEach((entry: Array<number>) => {
          fin.push({date: moment.unix(entry[0]/1000).format(), value: entry[1]})
        })
      }
      setData(fin)
    }
    func()
  }, [symbol])

  return (
    <Popover placement="left" title={symbol} content={(
      <Chart width={1000} height={400} data={data} scale={scale}>
        <Tooltip />
        <Axis dataKey="date" />
        <Axis dataKey="value" />
        <Line position="date*value" />
        <Point position="date*value" shape="circle"/>
      </Chart>
    )} trigger="click">
      <FundTwoTone />
    </Popover>
  )
}

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
      <Footer style={{ textAlign: 'center' }}>CryptoInfo - {(new Date()).getFullYear()} - Created by me</Footer>
    </Layout>
  )
}

export default Body
