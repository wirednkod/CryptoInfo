import React, { useState, useEffect} from 'react'
import { Layout, message } from 'antd'
import axios from 'axios'
import MainMenu from './MainMenu'
import MainContent from './MainContent'
import { BrowserRouter } from 'react-router-dom'

interface UsefulDataObject {
  active_cryptocurrencies: number,
  upcoming_icos: number,
  ended_icos: number,
  markets: number,
  market_cap_change_percentage_24h_usd: number,
  updated_at: number
}

const Main = () =>  {
  const [marks, setMarks] = useState([])
  const [globalLoading, setGlobalLoading] = useState<boolean>(true)
  const [marketsLoading, setMarketsLoading] = useState<boolean>(true)
  const [usefulData, setUsefulData] = useState<UsefulDataObject>({
    active_cryptocurrencies: 0,
    upcoming_icos: 0,
    ended_icos: 0,
    markets: 0,
    market_cap_change_percentage_24h_usd: 0,
    updated_at: 0
  })


  useEffect(() => {
    const callGlobal = async () => {
      let data: UsefulDataObject = usefulData
      try {
        let res = await axios.get("http://localhost:8000/gecko/global")
        let { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at } = res && res.data && res.data.data
        data = { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at }
      } catch (err) {
        message.error(`Error while retrieving market data: ${err}`)
      } finally {
        setUsefulData(data)
        setGlobalLoading(false)
      }
    }

    const callMarkets = async () => {
      let data = []
      try {
        let res =  await axios.get("http://localhost:8000/gecko/coins/markets")
        data = res && res.data
      } catch (err) {
        message.error(`Error while retrieving market data: ${err}`)
      } finally {
        setMarks(data)
        setMarketsLoading(false)
      }
    }
    callMarkets()
    callGlobal()
  }, [])
  
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <MainMenu />
        <MainContent
          global={usefulData}
          markets={marks}
          globalLoading={globalLoading}
          marketsLoading={marketsLoading} />
      </Layout>
    </BrowserRouter>
  )
}

export default Main
