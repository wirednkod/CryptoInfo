import React, { useState, useEffect } from 'react'
import { Table, message } from 'antd'
import axios from 'axios'
import { upperCase, toUpper, indexOf } from 'lodash'
//@ts-ignore
import { Formatter } from '@helpers/Utils'
//@ts-ignore
import { Charter } from '@components'
import './Body.less'

const validCharts = ['BTC', 'ETH', 'XRP', 'BCH', 'ADA', 'XLM', 'NEO', 'LTC', 'EOS', 'XEM', 'IOTA', 'DASH', 'XMR', 'TRX', 'ETC', 'QTUM', 'BTG', 'LSK', 'USDT', 'ZEC', 'ZRX', 'DCR', 'BAT', 'LINK', 'DAI', 'XTZ', 'BSV', 'DOGE', 'USDC']

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

const Charts = () =>  {
  const [marketsLoading, setMarketsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Array<any>>([])
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true)

  useEffect(() => {
    const callMarkets = async () => {
      try {
        let res =  await axios.get("/gecko/coins/markets")
        let a = Array.prototype.map.call(res?.data, m => ({
          'key': m.market_cap_rank,
          'rank': m.market_cap_rank,
          'name': [m.image, m.name],
          'symbol': m.symbol,
          'market_cap': m.market_cap,
          'current_price': m.current_price,
          'circulating_supply': m.circulating_supply,
          'price_change_percentage_24h': m.price_change_percentage_24h
        }))
        isSubscribed && setData(a)
      } catch (err) {
        message.error(`Error while retrieving market data: ${err}`)
      } finally {
        isSubscribed && setMarketsLoading(false)
      }
    }

    callMarkets()
    return () => setIsSubscribed(false)
  }, [data, isSubscribed])

  return (
    <Table
      loading={marketsLoading}
      dataSource={data}
      columns={columns}
      size="small"
      pagination={false} />
  )
}

export default Charts
