/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createGame = /* GraphQL */ `mutation CreateGame($input: CreateGameInput) {
  createGame(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateGameMutationVariables,
  APITypes.CreateGameMutation
>;
export const updateAndPublishGameEvent = /* GraphQL */ `mutation UpdateAndPublishGameEvent($input: PublishGameEventInput) {
  updateAndPublishGameEvent(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateAndPublishGameEventMutationVariables,
  APITypes.UpdateAndPublishGameEventMutation
>;
