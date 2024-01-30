import { Context } from '@aws-appsync/utils'

export function request(ctx: Context) {
	ctx.stash.eventBridgeSource = 'game.broadcast'
	return {}
}

export function response(ctx: Context) {
	return ctx.prev.result
}
