import React, { useState, useEffect } from 'react'
import { Layout, Button, Radio } from 'antd'
import { Switch, Route } from 'react-router-dom'
import './MainContent.less'

export type SizeType = 'small' | 'middle' | 'large' | undefined
interface UsefulDataObject {
  active_cryptocurrencies: number,
  upcoming_icos: number,
  ended_icos: number,
  markets: number,
  market_cap_change_percentage_24h_usd: number,
  updated_at: number
}

const MainContent = () =>  {
  const [size, setSize] = useState<SizeType>()
  const [usefulData, setUsefulData] = useState<UsefulDataObject>()
  const [marks, setMarks] = useState()

  useEffect(() => {
    fetch("http://localhost:8000/gecko/global")
    .then(res => res.json())
    .then(res => {
      console.log('global', res)
      let { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at } = res.data
      let obj = { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at }
      setUsefulData(obj)
    }, err => console.log('error occured', err))

    fetch("http://localhost:8000/gecko/coins/markets")
    .then(res => res.json())
    .then(res => {
      console.log('markets', res)
      setMarks(res.data)
    }, err => console.log('error occured', err))
  }, [])

  const latestInfo = () => {
    let lis = []
    if (!usefulData) return
    for (const [key, value] of Object.entries(usefulData)) {
      lis.push(<li key={Math.random()}>{key}: {value}</li>)
    }
    return lis
  }

  const latestMarkets = (markets: object) => {
    console.log('marks', markets)
    let lis = []
    markets.forEach(m => {
      console.log('m', m)
      lis.push(<li>{m.name}</li>)
    })
    return lis
  }

  return (
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
        <ul>
          {latestInfo()}
        </ul>
        <ul>{marks && latestMarkets(marks)}</ul>
      </div>
    </Layout.Content>
  )
}

export default MainContent
