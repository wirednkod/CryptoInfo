import React, { PureComponent } from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Radio } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

type SizeState = {
  size: String
}

class App extends PureComponent<{}, SizeState> {
  constructor(props) {
    super(props)
    this.state = {
      size: 'large'
    }
  }

  componentDidMount () {
    this.setState({ size: 'large' })
  }

  handleSizeChange = (e:any) => {
    this.setState({ size: e.target.value });
  }
  render() {
    let size = this.state.size
    return (
      <div className="App">
        <header className="App-header">
        <div>
          <Radio.Group value={size} onChange={this.handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
          <br />
          <br />
          <Button type="primary" size={size}>
            Primary
          </Button>
          <Button size={size}>Default</Button>
          <Button type="dashed" size={size}>
            Dashed
          </Button>
          <br />
          <Button type="link" size={size}>
            Link
          </Button>
          <br />
          <Button type="primary" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
          <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
            Download
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} size={size}>
            Download
          </Button>
        </div>
        </header>
      </div>
    )
  }
}

export default App
