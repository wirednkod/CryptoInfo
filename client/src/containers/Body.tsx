import React, { useState, useEffect } from 'react'
import { Layout, Row, Col } from 'antd'
import { Switch, Route } from 'react-router-dom'
import { GithubFilled, LinkedinFilled } from '@ant-design/icons';
//@ts-ignore
import { Formatter } from '@helpers/Utils'
//@ts-ignore
import { Label } from '@components'
//@ts-ignore
import { Charts, News } from '@containers/index.tsx'
import './Body.less'

interface UsefulDataObject {
  active_cryptocurrencies: number,
  upcoming_icos: number,
  ended_icos: number,
  markets: number,
  market_cap_change_percentage_24h_usd: number,
  updated_at: number
}

type BodyProps = {
  global: UsefulDataObject,
  actions: Function
}

const Body = ({ global, actions } : BodyProps) =>  {
  const [active, setActive] = useState<number>()
  const [upcomingIcos, setUpcomingIcos] = useState<number>()
  const [endedIcos, setEndedIcos] = useState<number>()
  const [marks, setMarks] = useState<number>()
  const [marketCap, setMarketCap] = useState<number>()

  useEffect(() => {
    let { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd } = global
    setActive(active_cryptocurrencies)
    setUpcomingIcos(upcoming_icos)
    setEndedIcos(ended_icos)
    setMarks(markets)
    setMarketCap(market_cap_change_percentage_24h_usd)
  }, [global])

  return (
    <Layout className="site-layout">
      <Row className="top-info">
        <Col span={24}>
          <Label title="Active crypto" value={Formatter(active, undefined, 'decimal')} />
          <Label title="Markets" value={Formatter(marks, undefined, 'decimal')} />
          <Label title="Market Cap Change" value={Formatter(marketCap, 2, 'percent')} />
          <Label title="Upcoming ICOs" value={Formatter(upcomingIcos, undefined, 'decimal')} />
          <Label title="Ended ICOs" value={Formatter(endedIcos, undefined, 'decimal')} />
        </Col>
      </Row>
      <Layout.Content style={{ flex: 'unset' }}>
        <Switch>
          <Route exact path="/charts">
            <div className="site-layout-background">
              <Charts />
            </div>
          </Route>
          <Route path="/">
            <News />
          </Route>
          <Route path="/users">
            <div>Users</div>
          </Route>
        </Switch>
      </Layout.Content>
      <div className="footer">
        <Row>
          <Col span={24}>CryptoInfo - All rights reserved {(new Date()).getFullYear()}</Col>
        </Row>
        <Row>
          <Col span={24}>Created by wirednkod</Col>
        </Row>
        <Row>
          <Col span={24}>
            <a href="https://github.com/wirednkod" rel="noopener noreferrer" target="_blank" className="profile-icons"><GithubFilled /></a>
            <a href="https://www.linkedin.com/in/nikolaoskontakis/" rel="noopener noreferrer" target="_blank" className="profile-icons"><LinkedinFilled /></a>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default Body
