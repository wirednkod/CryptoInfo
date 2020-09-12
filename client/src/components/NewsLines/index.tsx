import React from 'react'
import { Row, Col } from 'antd'
import { ClockCircleTwoTone,
  // CommentOutlined, DislikeOutlined, ExclamationOutlined, LikeOutlined, SmileOutlined, MinusCircleOutlined, PlusCircleOutlined, SaveOutlined
 } from '@ant-design/icons'
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
    key: string

}

const NewsLine = ({ newItem, spans, key } : NewsLineProps) =>  {
  let { domain, title } = newItem?.source
  // let comments, disliked, important, liked, lol, negative, positive, saved
  // if (newItem.votes) {
  //   comments = newItem?.votes?.comments
  //   disliked = newItem?.votes?.disliked
  //   important = newItem?.votes?.important
  //   liked = newItem?.votes?.liked 
  //   lol = newItem?.votes?.lol
  //   negative = newItem?.votes?.negative
  //   positive = newItem?.votes?.positive
  //   saved = newItem?.votes?.saved
  // }
  return (
    <>
    <Row key={key} justify="space-around" align="middle" gutter={[0, 12]}>
      <Col
        span={spans[0]}
        style={
          !newItem?.titles ? { fontSize: '10px', textAlign: 'center'} : { textAlign: 'center' }}>
            {!newItem?.titles ?
            moment(newItem?.published_at).format('HH:mm DD/MM')
            :  <ClockCircleTwoTone />}
      </Col>
      <Col span={spans[1]} style={newItem?.titles && { fontWeight: 'bold'}}>
        {!newItem?.titles ?
          (<a href={newItem?.url} target="_blank" rel="noopener noreferrer" key={Math.random()}>{newItem?.title}</a>) :
          newItem?.title}
      </Col>
      <Col span={spans[2]} style={newItem?.titles ? { fontWeight: 'bold', textAlign: 'center' } : { textAlign: 'center' }}>{upperFirst(newItem?.kind)}</Col>
      <Col span={spans[3]} style={newItem?.titles && { fontWeight: 'bold' }}>
        {!newItem?.titles ?
        (<a href={'http://' + domain} target="_blank" rel="noopener noreferrer">{title}</a>) :
        title}
      </Col>
    </Row>
    {/*
    <Row>
      {!newItem?.titles ?
      (<Col span={spans[4]} style={newItem?.titles ? { fontWeight: 'bold', textAlign: 'center' } : { textAlign: 'center', fontSize: '10px' }}>
        {comments}<CommentOutlined />{disliked}<DislikeOutlined />{important}<ExclamationOutlined />{liked}<LikeOutlined />{lol}<SmileOutlined />{negative}<MinusCircleOutlined />{positive}<PlusCircleOutlined />{saved}<SaveOutlined />
      </Col>)
      : (<Col span={spans[4]}></Col>)
      }
    </Row>
    */}
    </>
  )
}

export default NewsLine