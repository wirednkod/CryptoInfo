import { Chart, Tooltip, Axis, Line, Point } from 'viser-react'
import React, { Fragment, useState } from 'react'
import { Popover, Radio, message } from 'antd'
import { FundTwoTone } from '@ant-design/icons'
import { toUpper } from 'lodash'
import moment from 'moment'
import axios from 'axios'

const scale = [{
  dataKey: 'value',
  min: 0
},{
  dataKey: 'date',
  min: 0,
  max: 200
}]

type CharterProps = {
  symbol: any
}

const currentDate = moment().format('YYYY-MM-DDTHH:mm')

const Charter = ({ symbol } : CharterProps) => {
  const [data, setData] = useState<any>([])

  const getData = async (window: string = moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm')) => {
    let fin = []
    try {
      let res = await axios.get(`https://production.api.coindesk.com/v2/price/values/${toUpper(symbol)}?start_date=${window}&end_date=${currentDate}&ohlc=false`)
      let entries = res?.data?.data?.entries
      if (entries.length) {
        let i = 0
        entries.forEach((entry: Array<number>) => {
          if (i === 20) {
            i = 0
            fin.push({date: moment.unix(entry[0]/1000).format(), value: entry[1]})
          } else {
            i++
          }
        })
      }
      console.log('fin is', fin)
    } catch (err) {
      message.error(`There was an error while retrieving the data: ${err.details}`)
    }
    setData(fin)
  }

  const changeDate = (val: string) => {
    let back
    switch (val) {
      case '12H':
        back = moment().subtract(12, 'hours')
        break
      case '1D':
        back = moment().subtract(1, 'days')
        break
      case '1W':
        back = moment().subtract(1, 'weeks')
        break
      case '1M':
        back = moment().subtract(1, 'months')
        break
      case '3M':
        back = moment().subtract(3, 'months')
        break
      default:
        back = moment().subtract(1, 'days')
    }
    console.log('now', typeof back.format('YYYY-MM-DDTHH:mm'), currentDate)
    getData(back.format('YYYY-MM-DDTHH:mm'))
  }

  let chartContent = (
    <Fragment>
      <Radio.Group
        defaultValue="1D"
        buttonStyle="solid"
        onChange={
          e => changeDate(e.target.value)
        }>
        <Radio.Button value="12H">12H</Radio.Button>
        <Radio.Button value="1D">1D</Radio.Button>
        <Radio.Button value="1W">1W</Radio.Button>
        <Radio.Button value="1M">1M</Radio.Button>
        <Radio.Button value="3M">3M</Radio.Button>
      </Radio.Group>
      <Chart forcefit height={400} data={data} scale={scale}>
        <Tooltip />
        <Axis dataKey="date" />
        <Axis dataKey="value" />
        <Line position="date*value" />
        <Point position="date*value" shape="circle"/>
      </Chart>
    </Fragment>
  )

  return (
    <Popover placement="left" title={symbol} content={chartContent} trigger="click">
      <FundTwoTone onClick={() => getData()} />
    </Popover>
  )
}

export default Charter
