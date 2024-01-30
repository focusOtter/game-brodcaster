/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getGame = /* GraphQL */ `query GetGame($id: ID!) {
  getGame(id: $id) {
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
` as GeneratedQuery<APITypes.GetGameQueryVariables, APITypes.GetGameQuery>;
export const listGames = /* GraphQL */ `query ListGames {
  listGames {
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
` as GeneratedQuery<APITypes.ListGamesQueryVariables, APITypes.ListGamesQuery>;
