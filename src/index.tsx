import * as React from 'react'

interface PubSubProviderProps {
	context?: PubSubContext
}

export type Handler = (message: unknown) => void

export function createPubSubContext(): PubSubContext {
	const channels: {
		[name: string]: Handler[]
	} = {}

	function publish(channel: string, message: unknown) {
		const handlers = channels[channel] || []
		for (const handler of handlers) {
			handler(message)
		}
	}

	function subscribe(channel: string, handler: Handler) {
		const handlers = channels[channel] ? [...channels[channel]] : []
		handlers.push(handler)
		channels[channel] = handlers
		return () => unsubscribe(channel, handler)
	}

	function unsubscribe(channel: string, handler: Handler) {
		const handlers = channels[channel] || []
		const i = handlers.indexOf(handler)
		if (i !== -1) {
			const newHandlers = [...handlers]
			newHandlers.splice(i, 1)
			channels[channel] = newHandlers
		}
	}

	return {
		publish,
		subscribe,
		unsubscribe,
	}
}

export interface PubSubContext {
	publish: (channel: string, message: unknown) => void
    subscribe: (channel: string, handler: Handler) => () => void
    unsubscribe: (channel: string, handler: Handler) => void
}

const ReactPubSubContext = React.createContext<PubSubContext | null>(null)

export const PubSubProvider: React.FC<PubSubProviderProps> = function(props) {
	const { children, context } = props
	return (
		<ReactPubSubContext.Provider value={context || createPubSubContext()}>
			{children}
		</ReactPubSubContext.Provider>
	)
}

export const usePubSub = (): PubSubContext => {
	const context = React.useContext(ReactPubSubContext)
	if (!context) {
		throw new Error('usePubSub called outside of PubSubProvider')
	}

	return context
}
