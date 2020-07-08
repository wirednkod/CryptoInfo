import React, { PureComponent } from 'react'
import './App.less'
import Main from './containers/Main'

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    )
  }
}

export default App
