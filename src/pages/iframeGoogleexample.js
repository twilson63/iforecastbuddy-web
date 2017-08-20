import React from 'react'
import { connect } from 'react-redux'

class PageWidget extends React.Component {
  componentDidMount() {
    console.log('did mount')
    //window.addEventListener('message', this.handleFrameTasks)
    this.ifr.onload = () => {
      this.ifr.contentWindow.postMessage('hello', '*')
    }
  }

  componentWillReceiveProps(nextProps) {
    for (const [objectid, liveData] of Object.entries(nextProps.objectsLive)) {
      const prevOn = this.props.objectsLive[objectid]
        ? this.props.objectsLive[objectid].on
        : null
      if (prevOn !== liveData.on) {
        this.ifr.contentWindow.postMessage(
          { event: 'onoff', object: objectid, value: liveData.on },
          '*'
        )
      }
    }
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameTasks)
  }

  sendToFrame(data) {
    if (this.ifr) this.ifr.contentWindow.postMessage(data, '*')
  }

  handleFrameTasks = e => {
    if (e.data.type === 'bookmark') {
      this.sendToFrame({
        event: 'bookmark',
        data: window.location.hash ? window.location.hash.substr(1) : null
      })
    }
  }

  render() {
    return (
      <div>
        <hello />
        <iframe
          sandbox="allow-scripts"
          style={{ width: '100%' }}
          src="https://www.google.com/maps/d/u/0/embed?mid=16I_qV_OyavrzVrCAYoKh4xes1T4" //width="640" height="480"
          ref={f => {
            this.ifr = f
          }}
        />
      </div>
    )
  }
}

export default PageWidget
