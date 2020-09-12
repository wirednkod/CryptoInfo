import React, { useState, useEffect } from 'react'
import { 
  // Table, 
  message } from 'antd'
import axios from 'axios'
//@ts-ignore
import { NewsLines } from '@components'
const News = () =>  {

  const [news, setNews] = useState()
  const [next, setNext] = useState()
  const [previous, setPrevious] = useState()

  const sample = [
    {
      created_at: "2020-08-27T08:00:00Z",
      domain: "coindesk.com",
      id: 9797578,
      kind: "news",
      published_at: "2020-08-27T08:00:00Z",
      slug: "Is-This-the-Blockchain-Firm-That-Will-Get-Enterprise-to-Finally-Embrace-Open-Networks",
      source: {
        title: "CoinDesk",
        region: "en",
        domain: "coindesk.com",
        path: null
      },
      title: "Is This the Blockchain Firm That Will Get Enterprise to Finally Embrace Open Networks?",
      url: "https://cryptopanic.com/news/9797578/Is-This-the-Blockchain-Firm-That-Will-Get-Enterprise-to-Finally-Embrace-Open-Networks",
      votes: {
        comments: 0,
        disliked: 0,
        important: 0,
        liked: 0,
        lol: 0,
        negative: 0,
        positive: 0,
        saved: 0,
        toxic: 0
      }
    }
  ]

  useEffect(() => {
    const bringNews = async () => {
      try {
        let res =  await axios.get("/news/get")
        let { results, next, previous } = res?.data?.data 
        setNews(results)
      } catch (err) {
        message.error(`Error while retrieving market data: ${err}`)
      } finally {
        console.log('final')
      }
    }
    bringNews()
  }, [])

  const createNewsList = (news) => {
    let arr = []
    // sample?.map(n => {
    //   console.log('n', n)
    //   arr.push(<NewsLines new={n} />)
    // })
    return arr
  }

  return (createNewsList(news))
}

export default News
