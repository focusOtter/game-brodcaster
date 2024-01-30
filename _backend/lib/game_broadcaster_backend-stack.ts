import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createAuth } from './auth/cognito'
import { createAppSyncAPI } from './api/appsync'
import { createEventBridge } from './choreography/eventbridge'
import { CfnGraphQLApi } from 'aws-cdk-lib/aws-appsync'
import { createGameTable } from './tables/dynamodb'
import { updateAndPublishGameEvent } from './api/codegen/mutations'

export class GameBroadcasterBackendStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)
		const appName = 'gameBroadcast'
		const defaultBusArn = `arn:aws:events:${this.region}:${this.account}:event-bus/default`
		const auth = createAuth(this, { appName })

		const gameTable = createGameTable(this, { appName })

		const api = createAppSyncAPI(this, {
			appName,
			gameTable,
			userPool: auth.userPool,
			defaultBusArn,
		})

		const cfnAPI = api.node.defaultChild as CfnGraphQLApi

		const eventbridge = createEventBridge(this, {
			defaultBusArn,
			appsyncApiArn: api.arn,
			appsyncEndpointArn: cfnAPI.attrGraphQlEndpointArn,
			graphQlOperation: updateAndPublishGameEvent,
		})
	}
}
