/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGameInput = {
  name: string,
  homeTeam: TeamIput,
  awayTeam: TeamIput,
};

export type TeamIput = {
  teamId: string,
  name: string,
  picId: string,
};

export type Game = {
  __typename: "Game",
  id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  homeTeam: Team,
  awayTeam: Team,
  homeTeamScore?: number | null,
  awayTeamScore?: number | null,
};

export type Team = {
  __typename: "Team",
  teamId: string,
  name: string,
  picId: string,
};

export type PublishGameEventInput = {
  id: string,
  homeTeamScore?: number | null,
  awayTeamScore?: number | null,
  currentMessage?: string | null,
};

export type CreateGameMutationVariables = {
  input?: CreateGameInput | null,
};

export type CreateGameMutation = {
  createGame?:  {
    __typename: "Game",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    homeTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    awayTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    homeTeamScore?: number | null,
    awayTeamScore?: number | null,
  } | null,
};

export type UpdateAndPublishGameEventMutationVariables = {
  input?: PublishGameEventInput | null,
};

export type UpdateAndPublishGameEventMutation = {
  updateAndPublishGameEvent?:  {
    __typename: "Game",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    homeTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    awayTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    homeTeamScore?: number | null,
    awayTeamScore?: number | null,
  } | null,
};

export type GetGameQueryVariables = {
  id: string,
};

export type GetGameQuery = {
  getGame?:  {
    __typename: "Game",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    homeTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    awayTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    homeTeamScore?: number | null,
    awayTeamScore?: number | null,
  } | null,
};

export type ListGamesQueryVariables = {
};

export type ListGamesQuery = {
  listGames:  Array< {
    __typename: "Game",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    homeTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    awayTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    homeTeamScore?: number | null,
    awayTeamScore?: number | null,
  } | null >,
};

export type OnUpdateAndPublishGameEventSubscriptionVariables = {
};

export type OnUpdateAndPublishGameEventSubscription = {
  onUpdateAndPublishGameEvent?:  {
    __typename: "Game",
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    homeTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    awayTeam:  {
      __typename: "Team",
      teamId: string,
      name: string,
      picId: string,
    },
    homeTeamScore?: number | null,
    awayTeamScore?: number | null,
  } | null,
};
