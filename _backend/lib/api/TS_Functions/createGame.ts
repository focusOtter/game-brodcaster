import { CreateGameMutationVariables, Game } from './../codegen/API'
import { Context, util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx: Context<CreateGameMutationVariables>) {
	const id = util.autoId()
	const now = util.time.nowISO8601()

	const item = {
		__typename: 'Game',
		id,
		createdAt: now,
		updatedAt: now,
		...ctx.args.input,
		awayTeamScore: 0,
		homeTeamScore: 0,
	} as Game

	return ddb.put({
		key: { id },
		item,
	})
}

export function response(ctx: Context) {
	return ctx.result as Game
}
