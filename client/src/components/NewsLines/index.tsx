import React
// , { Fragment } 
from 'react'
// import './index.less'
// type PosType = "left" | "right" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "center" | "end" | "justify" | "match-parent" | "start" | undefined

interface NewLineObject {
  url: string,
  title: string
}

type NewsLineProps = {
    newItem: NewLineObject
}

const NewsLine = ({ newItem } : NewsLineProps) =>  {
  return (
    <li><a href={newItem?.url} target="_blank" key={Math.random()}>{newItem?.title}</a></li>
  )
}

export default NewsLine