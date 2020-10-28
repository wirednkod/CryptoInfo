import React, { useState, useEffect } from 'react'
import { Spin, message } from 'antd'
import axios from 'axios'
//@ts-ignore
import { NewsLines } from '@components'

interface NewLineObject {
  titles: Boolean,
  url: string,
  title: string,
  kind: string,
  published_at: string,
  source: {
    domain: string,
    title: string
  },
  votes: {
    comments: number,
    disliked: number,
    important: number,
    liked: number,
    lol: number,
    negative: number,
    positive: number,
    saved: number,
    toxic: number
  }
}

const News = () =>  {

  const [news, setNews] = useState([])
  const [spinLoading, setsSpinLoading] = useState(true)

  useEffect(() => {
    const bringNews = async () => {
      try {
        let res =  await axios.get("/news/get")
        setNews(res?.data?.data)
      } catch (err) {
        message.error(`Error while retrieving market data: ${err}`)
      } finally {
        setsSpinLoading(false)
      }
    }
    setsSpinLoading(true)
    bringNews()
  }, [])

  const colSpan = [1, 6, 12, 2, 3]
  const titles = {
    titles: true,
    publishedAt: 'Published',
    coins: 'Coins',
    title: 'Title',
    description: 'Description',
    primaryCategory: 'Category',
    source: {
      name: 'Source'
    }
  }

  const createNewsList = (news: Array<NewLineObject>, colSpan: Array<number>) => {
    let arr = []
    news?.map(n => {
      console.log(n)
      arr.push(<NewsLines newItem={n} spans={colSpan} />)
    })
    return arr
  }

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div style={{ fontSize:'11px', display: 'block', width: '100%', textAlign: 'center', height: '20px', fontWeight: 'bold'}}>
        News by <a href="https://cryptocontrol.io/" target="_blank" rel="noopener noreferrer">CryptoControl.io</a>
      </div>
      <NewsLines newItem={titles} spans={colSpan} />
      <Spin spinning={spinLoading} style={{ paddingTop: '40%'}}>
        {createNewsList(news, colSpan)}
      </Spin>
    </div>
    )
}

export default News
