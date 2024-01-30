import { aws_events as events } from 'aws-cdk-lib'

import { EventBus } from 'aws-cdk-lib/aws-events'
import {
	Effect,
	PolicyDocument,
	PolicyStatement,
	Role,
	ServicePrincipal,
} from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'

type EventBridgeBusProps = {
	appsyncApiArn: string
	appsyncEndpointArn: string
	graphQlOperation: string
	defaultBusArn: string
}
export const createEventBridge = (
	scope: Construct,
	props: EventBridgeBusProps
) => {
	const bus = EventBus.fromEventBusArn(scope, 'defaultBus', props.defaultBusArn)

	// Create the Policy Statement
	const policyStatement = new PolicyStatement({
		effect: Effect.ALLOW,
		actions: ['appsync:GraphQL'],
		resources: [`${props.appsyncApiArn}/types/Mutation/*`],
	})

	// Create the Role and attach the policy
	const ebRuleRole = new Role(scope, 'AppSyncInvokeRole', {
		assumedBy: new ServicePrincipal('events.amazonaws.com'),
		inlinePolicies: {
			PolicyStatement: new PolicyDocument({
				statements: [policyStatement],
			}),
		},
	})

	const gameBroadcastEBRule = new events.CfnRule(scope, 'gameBroadcastEBRule', {
		eventBusName: bus.eventBusName,
		name: 'gameBroadcastEBRule',
		eventPattern: {
			source: ['game.broadcast'],
			detailType: ['GameUpdated'],
		},
		targets: [
			{
				id: 'gameBroadcastAppSyncAPI',
				arn: props.appsyncEndpointArn,
				roleArn: ebRuleRole.roleArn,
				appSyncParameters: {
					graphQlOperation: props.graphQlOperation,
				},
				inputTransformer: {
					inputPathsMap: {
						id: '$.detail.id',
						time: '$.time',
						updatedAt: '$.detail.updatedAt',
						homeTeamScore: '$.detail.homeTeamScore',
						awayTeamScore: '$.detail.awayTeamScore',
						currentMessage: '$.detail.currentMessage',
					},
					inputTemplate: JSON.stringify({
						id: '<id>',
						updatedAt: '<updatedAt>',
						homeTeamScore: '<homeTeamScore>',
						awayTeamScore: '<awayTeamScore>',
						currentMessage: '<currentMessage>',
					}),
				},
			},
		],
	})

	return { bus, gameBroadcastEBRule }
}
