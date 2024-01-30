import { Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { GetGameQueryVariables, Game } from '../codegen/API'

export function request(ctx: Context<GetGameQueryVariables>) {
	return ddb.get({ key: { id: ctx.args.id } })
}

export function response(ctx: Context) {
	return ctx.result as Game
}
