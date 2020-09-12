import React, { Fragment, useState, useEffect } from 'react'
import './index.less'
import { LoadingOutlined } from '@ant-design/icons'
type PosType = "left" | "right" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "center" | "end" | "justify" | "match-parent" | "start" | undefined

type LabelProps = {
    title: string,
    value?: any,
    seperator?: string,
    align?: PosType,
    loading: Boolean,
}

const Label = ({ title, value, seperator = '', align = 'left', loading = true}: LabelProps) =>  {

  let i = []
  if (align !== 'right') {
    i.push(<Fragment key={Math.random()}>
      <span key="a" className="label" style={{ marginRight: '10px'}}>{title}{seperator}</span>
      <span key="b" className="label-value">{loading ? <LoadingOutlined /> : value}</span>
    </Fragment>)
  } else {
    i.push(<Fragment key={Math.random()}>
      <span key="a" className="label-value">{loading ? <LoadingOutlined /> : value}</span>
      <span key="b" className="label" style={{ marginLeft: '10px'}}>{seperator}{title}</span>
    </Fragment>)
  }
  return (
    <div className="main-label">{i}</div>
  )
}

export default Label