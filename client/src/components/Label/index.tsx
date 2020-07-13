import React from 'react'
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
    i.push(<>
      <span className="label" style={{ marginRight: '10px'}}>{title}{seperator}</span>
      <span>{value}</span>
    </>)
  } else {
    i.push(<>
      <span>{value}</span>
      <span className="label" style={{ marginLeft: '10px'}}>{seperator}{title}</span>
    </>)
  }
  return (
    <p style={{ textAlign: align }}>
      {i}
    </p>
  )
}

export default Label