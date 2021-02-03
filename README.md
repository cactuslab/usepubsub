# usePubSub

> A React hook to add Publish and Subscribe to a React application.

[![NPM](https://img.shields.io/npm/v/@cactuslab/usepubsub.svg)](https://www.npmjs.com/package/@cactuslab/usepubsub) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The `usePubSub` hook provides your React component with access to the current `PubSubContext`, on
which you can `publish` messages to channels, and `subscribe` to channels to receive messages.

You provide a `PubSubContext` to your application using the `<PubSubProvider>` at the root level of your application (or wherever).

You may also explicitly create a `PubSubContext` using `createPubSubContext()` and provide it to `<PubSubProvider context={myContext}>`, and then use the `publish`, `subscribe` and `unsubscribe` methods of the `PubSubContext` anywhere in your application.

## Install

```shell
npm install --save @cactuslab/usepubsub
```

## Usage

```tsx
import * as React from 'react'

import { usePubSub, PubSubProvider } from '@cactuslab/usepubsub'

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

### Provide a custom context

Use `createPubSubContext()` to create the `PubSubContext`, and then call `publish`, `subscribe` and `unsubscribe` on it from anywhere in your application.

```tsx
import { createPubSubContext, PubSubProvider } from '@cactuslab/usepubsub'

const myContext = createPubSubContext()

myContext.subscribe('ALERT_CHANNEL', function(message) {
  alert(message)
})

const App = () => {
  return (
    <PubSubProvider context={myContext}>
      ...
    </PubSubProvider>
  )
}
```

## API Reference

```tsx
type Handler = (message: unknown) => void

interface PubSubContext {
  publish: (channel: string, message: unknown) => void
  subscribe: (channel: string, handler: Handler) => () => void
  unsubscribe: (channel: string, handler: Handler) => void
}

/* Functions */
function createPubSubContext(): PubSubContext

/* Hooks */
function usePubSub(): PubSubContext

/* Components */
<PubSubProvider />
<PubSubProvider context={PubSubContext} />
```

## License

MIT © [Cactuslab](https://github.com/cactuslab)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
