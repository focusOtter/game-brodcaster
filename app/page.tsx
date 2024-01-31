'use client'
import { listGames } from '@/_backend/lib/api/codegen/queries'
import { updateAndPublishGameEvent } from '@/_backend/lib/api/codegen/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { generateClient } from 'aws-amplify/api'
import { FormEvent, useEffect, useState } from 'react'
import { Game } from '@/_backend/lib/api/codegen/API'

const client = generateClient()
function Home() {
	const [currentGame, setCurrentGame] = useState<null | Game>()
	const [awayTeamScore, setAwayTeamScore] = useState<number>(0)
	const [homeTeamScore, setHomeTeamScore] = useState<number>(0)
	const [currentMessage, setCurrentMessage] = useState<string>('')

	useEffect(() => {
		client
			.graphql({
				query: listGames,
			})
			.then(({ data }) => {
				console.log({ data })

				const currentGame = data.listGames[0]
				if (!currentGame) return
				console.log({ currentGame })
				setCurrentGame(currentGame)
				setAwayTeamScore(currentGame.awayTeamScore)
				setHomeTeamScore(currentGame.homeTeamScore)
			})
	}, [])

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!currentGame) return
		const updatedGame = await client.graphql({
			query: updateAndPublishGameEvent,
			variables: {
				input: {
					id: currentGame.id,
					awayTeamScore,
					homeTeamScore,
					currentMessage,
				},
			},
		})
		console.log({ updatedGame })
		setCurrentGame(updatedGame.data.updateAndPublishGameEvent)
		setCurrentMessage('')
		return updatedGame.data.updateAndPublishGameEvent
	}

	if (!currentGame) {
		return <div>Loading...</div>
	}
	return (
		<div className="flex justify-center align-middle">
			<form
				className="flex flex-col gap-6"
				onSubmit={(e) => {
					handleSubmit(e)
				}}
			>
				<div>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Home Team Score</span>
						</div>

						<input
							className="input input-bordered input-secondary w-full max-w-xs"
							type="number"
							value={homeTeamScore}
							onChange={(e) => setHomeTeamScore(e.target.valueAsNumber)}
						/>
					</label>
				</div>
				<div>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Away Team Score</span>
						</div>
						<input
							className="input input-bordered input-secondary w-full max-w-xs"
							type="number"
							value={awayTeamScore}
							onChange={(e) => setAwayTeamScore(e.target.valueAsNumber)}
						/>
					</label>
				</div>
				<div>
					<label className="form-control w-full max-w-xs">
						<div className="label">
							<span className="label-text">Broadcast message:</span>
						</div>
						<input
							className="input input-bordered input-accent w-full max-w-xs"
							type="text"
							value={currentMessage}
							onChange={(e) => setCurrentMessage(e.target.value)}
						/>
					</label>
				</div>
				<div className="flex justify-end w-full max-w-xs">
					<button className="btn btn-primary" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}
export default withAuthenticator(Home)
