# usepubsub

> 

[![NPM](https://img.shields.io/npm/v/@cactuslab/usepubsub.svg)](https://www.npmjs.com/package/@cactuslab/usepubsub) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @cactuslab/usepubsub
```

## Usage

```tsx
import * as React from 'react'

import { usePubSub } from '@cactuslab/usepubsub'

/* Add a top-level PubSubProvider to your app to initialise the PubSub context */
const App = () => {
   return (
    <PubSubProvider>
      ...
    </PubSubProvider>
  )
}

const ExampleSubscriber = () => {
  const { subscribe } = usePubSub()
  React.useEffect(function() {
    return subscribe('CHANNEL', function(message) {
      ...
    })
  })
}

const ExamplePublisher = () => {
  const { publish } = usePubSub()
  
  function sendMessage() {
    publish('CHANNEL', nextMessage)
  }
}
```

## License

MIT © [Cactuslab](https://github.com/cactuslab)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
