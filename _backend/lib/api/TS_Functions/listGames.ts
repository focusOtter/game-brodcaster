import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { ListGamesQueryVariables, Game } from '../codegen/API'

// list only your todos
export function request(ctx: Context<ListGamesQueryVariables>) {
	console.log('the context req for listGames', ctx)
	return ddb.scan({})
}

export function response(ctx: Context) {
	console.log('the context res for listGames', ctx)

	const { items: games = [] } = ctx.result
	return games as [Game]
}
