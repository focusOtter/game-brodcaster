import { Construct } from 'constructs'
import * as path from 'path'
import {
	AuthorizationType,
	Definition,
	GraphqlApi,
	FieldLogLevel,
	FunctionRuntime,
	Code,
} from 'aws-cdk-lib/aws-appsync'
import { IUserPool } from 'aws-cdk-lib/aws-cognito'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { EventBus } from 'aws-cdk-lib/aws-events'

type AppSyncAPIProps = {
	appName: string
	userPool: IUserPool
	gameTable: ITable
	defaultBusArn: string
}

export const createAppSyncAPI = (scope: Construct, props: AppSyncAPIProps) => {
	const api = new GraphqlApi(scope, `${props.appName}`, {
		name: props.appName,
		definition: Definition.fromFile(path.join(__dirname, 'schema.graphql')),
		authorizationConfig: {
			defaultAuthorization: {
				authorizationType: AuthorizationType.USER_POOL,
				userPoolConfig: { userPool: props.userPool },
			},
		},
		logConfig: {
			fieldLogLevel: FieldLogLevel.ALL,
		},
	})

	const gameTableDS = api.addDynamoDbDataSource('gameTableDS', props.gameTable)

	const bus = EventBus.fromEventBusArn(scope, 'defaultBus', props.defaultBusArn)
	const eventBridgeDS = api.addEventBridgeDataSource('gameBusDS', bus)

	const updateGameFunc = gameTableDS.createFunction('updateGameFunc', {
		name: 'updateGameFunc',
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_Functions/updateGame.js')),
	})

	const publishToEBFunc = eventBridgeDS.createFunction('publishToEBFunc', {
		name: 'publishToEBFunc',
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_Functions/publishToEB.js')),
	})

	api.createResolver('updateAndPublishGameEventResolver', {
		typeName: 'Mutation',
		fieldName: 'updateAndPublishGameEvent',
		pipelineConfig: [updateGameFunc, publishToEBFunc],
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_Functions/pipeline.js')),
	})

	api.createResolver('getGameResolver', {
		typeName: 'Query',
		fieldName: 'getGame',
		code: Code.fromAsset(path.join(__dirname, 'JS_Functions/getGame.js')),
		runtime: FunctionRuntime.JS_1_0_0,
		dataSource: gameTableDS,
	})

	api.createResolver('listGamesResolver', {
		typeName: 'Query',
		fieldName: 'listGames',
		code: Code.fromAsset(path.join(__dirname, 'JS_Functions/listGames.js')),
		runtime: FunctionRuntime.JS_1_0_0,
		dataSource: gameTableDS,
	})

	api.createResolver('createGameResolver', {
		typeName: 'Mutation',
		fieldName: 'createGame',
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_Functions/createGame.js')),
		dataSource: gameTableDS,
	})

	return api
}
