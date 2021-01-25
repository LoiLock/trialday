export async function getTeams() {
    try {
        const response = await fetch("https://wamp.owow.app/v2/leagues/hilario-mayert-league/leaderboards/league-groups")
        const body = await response.json()
        return body
    } catch (error) {
        return console.error(error)
    }
}