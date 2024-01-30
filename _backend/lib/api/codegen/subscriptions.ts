/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onUpdateAndPublishGameEvent = /* GraphQL */ `subscription OnUpdateAndPublishGameEvent {
  onUpdateAndPublishGameEvent {
    id
    createdAt
    updatedAt
    name
    homeTeam {
      teamId
      name
      picId
      __typename
    }
    awayTeam {
      teamId
      name
      picId
      __typename
    }
    homeTeamScore
    awayTeamScore
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateAndPublishGameEventSubscriptionVariables,
  APITypes.OnUpdateAndPublishGameEventSubscription
>;
