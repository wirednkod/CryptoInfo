import React, { PureComponent } from 'react'
import './App.css'
import { Button, Radio } from 'antd'

class App extends PureComponent {
  state = {
    size: 'large'
  }

  handleSizeChange = (e:any) => {
    this.setState({ size: e.target.value });
  }
  render() {
    let { size } = this.state
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
          <Button type="primary" size={this.state.size}>
            Primary
          </Button>
          <Button size={this.state.size}>Default</Button>
          <Button type="dashed" size={this.state.size}>
            Dashed
          </Button>
          <br />
          <Button type="link" size={this.state.size}>
            Link
          </Button>
        </div>
        </header>
      </div>
    )
  }
}

export default App
