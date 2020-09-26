import React, { useState, useEffect} from 'react'
import { Layout, message } from 'antd'
import axios from 'axios'
import MainMenu from './MainMenu'
import Body from './Body'
import { BrowserRouter as Router } from 'react-router-dom'

interface UsefulDataObject {
  active_cryptocurrencies: number,
  upcoming_icos: number,
  ended_icos: number,
  markets: number,
  market_cap_change_percentage_24h_usd: number,
  updated_at: number
}

const Main = () =>  {
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
      let data: UsefulDataObject = {
        active_cryptocurrencies: 0,
        upcoming_icos: 0,
        ended_icos: 0,
        markets: 0,
        market_cap_change_percentage_24h_usd: 0,
        updated_at: 0
      }
      try {
        let res = await axios.get("/gecko/global")
        let { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at } = res?.data?.data
        data = { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at }
      } catch (err) {
        message.error(`Error while retrieving market data: ${err}`)
      } finally {
        setUsefulData(data)
      }
    }
  
    callGlobal()
  }, [])

  // const refreshGlobal = async () => {
  //   let data: UsefulDataObject = {
  //     active_cryptocurrencies: 0,
  //     upcoming_icos: 0,
  //     ended_icos: 0,
  //     markets: 0,
  //     market_cap_change_percentage_24h_usd: 0,
  //     updated_at: 0
  //   }
  //   try {
  //     let res = await axios.get("/gecko/global")
  //     let { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at } = res?.data?.data
  //     data = { active_cryptocurrencies, upcoming_icos, ended_icos, markets, market_cap_change_percentage_24h_usd, updated_at }
  //   } catch (err) {
  //     message.error(`Error while retrieving market data: ${err}`)
  //   } finally {
  //     setUsefulData(data)
  //   }
  // }
  
  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <MainMenu />
        <Body global={usefulData} />
      </Layout>
    </Router>
  )
}

export default Main
