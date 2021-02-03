import React from 'react'

import { usePubSub, PubSubProvider } from '@cactuslab/usepubsub'

const Body = () => {
  const { publish, subscribe } = usePubSub()
  const [messages, setMessages] = React.useState([])
  const [nextMessage, setNextMessage] = React.useState('')

  React.useEffect(function() {
    return subscribe('CHANNEL', function(message) {
      setMessages([...messages, message])
    })
  })

  function sendMessage() {
    publish('CHANNEL', nextMessage)
  }

  function updateNextMessage(ev) {
    setNextMessage(ev.target.value)
  }

  return (
    <div>
      <div>
        <input type="text" value={nextMessage} onChange={updateNextMessage} />
        <button onClick={sendMessage}>Publish</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <PubSubProvider>
      <Body />
    </PubSubProvider>
  )
}
export default App
