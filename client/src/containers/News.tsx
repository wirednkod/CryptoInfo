import React, { useState, useEffect } from 'react'
import { Row, Col, Spin, message } from 'antd'
import axios from 'axios'
//@ts-ignore
import { NewsLines } from '@components'
const News = () =>  {

  const [news, setNews] = useState([])
  const [spinLoading, setsSpinLoading] = useState(true)
  const [next, setNext] = useState()
  const [previous, setPrevious] = useState()

  useEffect(() => {
    const bringNews = async () => {
      try {
        let res =  await axios.get("/news/get")
        let { results, next, previous } = res?.data?.data 
        setNews(results)
      } catch (err) {
        message.error(`Error while retrieving market data: ${err}`)
      } finally {
        setsSpinLoading(false)
        console.log('final', news)
      }
    }
    bringNews()
  }, [])

  const colSpan = [2, 15, 2, 3]
  const titles = {
    titles: true,
    published_at: 'Published',
    title: 'Title',
    kind: 'Kind',
    source: {
      title: 'Source'
    }
  }

  const createNewsList = (news, colSpan) => {
    let arr = []
    let i = 0
    news?.map(n => {
      arr.push(<NewsLines key={i} newItem={n} spans={colSpan} />)
      i++
    })
    return arr
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <Spin spinning={spinLoading} style={{ paddingTop: '40%'}}>
        <Row justify="space-around" align="middle" gutter={[0, 12]}>
          <NewsLines newItem={titles} spans={colSpan} />
          {createNewsList(news, colSpan)}
        </Row>
      </Spin>
    </div>
    )
}

export default News
