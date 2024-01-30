import { Context } from '@aws-appsync/utils'

// https://docs.aws.amazon.com/appsync/latest/devguide/resolver-reference-eventbridge-js.html
type PutEventsRequest = {
	operation: 'PutEvents'
	events: {
		source: string
		detail: { [key: string]: any }
		detailType: string
		resources?: string[]
		time?: string // RFC3339 Timestamp format
	}[]
}

export function request(ctx: Context): PutEventsRequest {
	console.log('the context to be send to eventbridge', ctx)
	console.log('the previous result', ctx.prev.result)
	return {
		operation: 'PutEvents',
		events: [
			{
				source: ctx.stash.eventBridgeSource,
				detailType: 'GameUpdated',
				detail: { ...ctx.prev.result },
			},
		],
	}
}
