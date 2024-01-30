import { Context, util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import {
	UpdateAndPublishGameEventMutationVariables,
	Game,
} from '../codegen/API'

export function request(
	ctx: Context<UpdateAndPublishGameEventMutationVariables>
) {
	const { id, ...rest } = ctx.args.input
	const now = util.time.nowISO8601()

	return ddb.update({
		key: { id },
		update: { ...rest, updatedAt: now },
	})
}

export function response(ctx: Context) {
	return ctx.result as Game
}
