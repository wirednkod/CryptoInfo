import React from 'react'
import { Row, Col, Tooltip } from 'antd'
import { ClockCircleTwoTone } from '@ant-design/icons'
import moment from 'moment'
import * as Icon from 'react-cryptocoins'
import { upperFirst } from 'lodash'

interface NewLineObject {
  publishedAt: string,
  titles: Boolean,
  url: string,
  coins: Array<CoinsArray>,
  title: string,
  description: string,
  primaryCategory: string,
  source: {
    name: string,
    url: string
  }
}

type CoinsArray = {
  _id: string,
  name: string,
  slug: string,
  tradingSymbol: string
}

type NewsLineProps = {
    newItem: NewLineObject
    spans: Array<number>

}

const NewsLine = ({ newItem, spans } : NewsLineProps) =>  {
  let { url, name } = newItem?.source
  let coins = []
  if (typeof newItem?.coins !== 'string') {
    newItem?.coins.forEach(c => {
      coins.push(
        <Tooltip title={c.name}>
          <div style={{margin: '0 2px', float: 'left'}}>
            <Icon.Btc size={16} />
          </div>
        </Tooltip>
        )
    })
  }

  return (
    <>
    <Row justify="space-around" align="middle" gutter={[0, 12]}>
      <Col
        span={spans[0]}
        style={
          !newItem?.titles ? { fontSize: '10px', textAlign: 'center'} : { textAlign: 'center' }}>
            {!newItem?.titles ?
            moment(Date.parse(newItem?.publishedAt)).format('HH:mm DD/MM')
            :  <ClockCircleTwoTone />}
      </Col>
      {/* <Col span={spans[1]}>
        {!newItem?.titles ? coins : newItem?.coins}
      </Col> */}
      <Col span={spans[1]} style={newItem?.titles && { fontWeight: 'bold'}}>
        {!newItem?.titles ?
          (<a href={newItem?.url} target="_blank" rel="noopener noreferrer" key={Math.random()}>{newItem?.title}</a>) :
          newItem?.title}
      </Col>
      <Col span={spans[2]} style={newItem?.titles && { fontWeight: 'bold'}}>
        {newItem?.description}
      </Col>
      <Col span={spans[3]} style={newItem?.titles ? { fontWeight: 'bold', textAlign: 'center' } : { fontWeight: 'bold', textAlign: 'center', fontSize: '11px',  }}>
        {upperFirst(newItem?.primaryCategory)}
      </Col>
      <Col span={spans[4]} style={newItem?.titles && { fontWeight: 'bold' }}>
        {!newItem?.titles ?
        (<a href={url} target="_blank" rel="noopener noreferrer">{name}</a>) : name}
      </Col>
    </Row>
    </>
  )
}

export default NewsLine