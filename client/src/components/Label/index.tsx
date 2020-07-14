import React, { Fragment } from 'react'
import './index.less'
type PosType = "left" | "right" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "center" | "end" | "justify" | "match-parent" | "start" | undefined

type LabelProps = {
    title: string,
    value?: any,
    seperator?: string,
    align?: PosType
}

const Label = ({ title, value, seperator = '', align = 'left'}: LabelProps) =>  {
  let i = []
  if (align !== 'right') {
    i.push(<Fragment key={Math.random()}>
      <span key="a" className="label" style={{ marginRight: '10px'}}>{title}{seperator}</span>
      <span key="b" className="label-value">{value}</span>
    </Fragment>)
  } else {
    i.push(<Fragment key={Math.random()}>
      <span key="a" className="label-value">{value}</span>
      <span key="b" className="label" style={{ marginLeft: '10px'}}>{seperator}{title}</span>
    </Fragment>)
  }
  return (
    <div key={i} className="main-label">{i}</div>
  )
}

export default Label