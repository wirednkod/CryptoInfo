import React, { Fragment } from 'react'
import { Col } from 'antd'
import { ClockCircleTwoTone } from '@ant-design/icons'
import moment from 'moment'
import { upperFirst } from 'lodash'

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

type NewsLineProps = {
    newItem: NewLineObject
    spans: Array<number>

}

const NewsLine = ({ newItem, spans } : NewsLineProps) =>  {
  let { domain, title } = newItem?.source
  return (
    <Fragment>
      <Col
        offset={1}
        span={spans[0]}
        style={
          !newItem?.titles ? { fontSize: '10px'} : { textAlign: 'center' }}>
            {!newItem?.titles ?
            moment(newItem?.published_at).format('HH:mm DD/MM')
            :  <ClockCircleTwoTone />}
      </Col>
      <Col span={spans[1]} style={newItem?.titles && { fontWeight: 'bold'}}>
        {!newItem?.titles ?
          (<a href={newItem?.url} target="_blank" key={Math.random()}>{newItem?.title}</a>) :
          newItem?.title}
      </Col>
      <Col span={spans[2]} style={newItem?.titles ? { fontWeight: 'bold', textAlign: 'center' } : { textAlign: 'center' }}>{upperFirst(newItem?.kind)}</Col>
      <Col span={spans[3]} style={newItem?.titles && { fontWeight: 'bold' }}>
        {!newItem?.titles ?
        (<a href={'http://' + domain} target="_blank">{title}</a>) :
        title}
      </Col>
    </Fragment>
  )
}

export default NewsLine