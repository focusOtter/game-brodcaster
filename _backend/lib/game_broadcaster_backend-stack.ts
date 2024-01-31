import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createAuth } from './auth/cognito'
import { createAppSyncAPI } from './api/appsync'
import { createGameTable } from './tables/dynamodb'

export class GameBroadcasterBackendStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)
		const appName = 'gameBroadcast'
		const defaultBusArn = `arn:aws:events:${this.region}:${this.account}:event-bus/default`

		// Cognito to allow users to login and make API calls
		const auth = createAuth(this, { appName })

		// DynamoDB table to store Game data
		const gameTable = createGameTable(this, { appName })

		// AppSync API to create a game. Will also update a game by putting details on EventBridge.
		const api = createAppSyncAPI(this, {
			appName,
			gameTable,
			userPool: auth.userPool,
			defaultBusArn,
		})

		new cdk.CfnOutput(this, 'GraphQLAPIURL', {
			value: api.graphqlUrl,
		})
		new cdk.CfnOutput(this, 'GraphQLAPIID', {
			value: api.apiId,
		})
		new cdk.CfnOutput(this, 'UserPoolId', {
			value: auth.userPool.userPoolId,
		})
		new cdk.CfnOutput(this, 'UserPoolClientId', {
			value: auth.userPoolClient.userPoolClientId,
		})
		new cdk.CfnOutput(this, 'IdentityPoolId', {
			value: auth.identityPool.identityPoolId,
		})

		new cdk.CfnOutput(this, 'Region', {
			value: this.region,
		})
	}
}
