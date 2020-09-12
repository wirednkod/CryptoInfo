import React, { Fragment, useState, useEffect } from 'react'
import { Spin, message } from 'antd'
import axios from 'axios'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
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
  const [page, setPage] = useState(1)

  useEffect(() => {
    const bringNews = async () => {
      try {
        const params = { page }
        let res =  await axios.get("/news/get", { params })
        let { results } = res?.data?.data 
        setNews(results)
      } catch (err) {
        message.error(`Error while retrieving market data: ${err}`)
      } finally {
        setsSpinLoading(false)
      }
    }
    setsSpinLoading(true)
    bringNews()
  }, [page])

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

  const createNewsList = (news: Array<NewLineObject>, colSpan: Array<number>) => {
    let arr = []
    let i = 0
    news?.map(n => {
      arr.push(<NewsLines newItem={n} spans={colSpan} />)
      i++
    })
    return arr
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <Spin spinning={spinLoading} style={{ paddingTop: '40%'}}>
        <NewsLines newItem={titles} spans={colSpan} />
        {createNewsList(news, colSpan)}
      </Spin>
      <div style={{ float: 'right', padding: '20px' }}>
          <span style={{ paddingRight: '50px' }}>Current page: {page}</span>
          {page <= 1 ? (<Fragment>previous<LeftOutlined /></Fragment>) : (<a href='#' onClick={() => setPage(page - 1)}>previous<LeftOutlined /></a>)}
          <a href='#' style={{ paddingLeft: '20px' }} onClick={() => setPage(page + 1)}><RightOutlined />next</a>
        </div>
    </div>
    )
}

export default News
