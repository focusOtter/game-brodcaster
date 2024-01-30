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
				detailType: ctx.stash.eventBridgeDetailType,
				detail: { ...ctx.prev.result },
			},
		],
	}
}

export function response(ctx: Context) {
	console.log('the result of the publish to eb', ctx.result)
	return ctx.prev.result
}
