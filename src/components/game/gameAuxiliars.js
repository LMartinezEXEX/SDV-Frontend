export const getUsername = (player, playerId) => {
    if (player.player_id === playerId) {
        return player.username
    }
}


export const getUsernameFromList = (playersInfo, playerId) => {
    let username = "" 
    playersInfo.forEach(player => {
        if (player.player_id === playerId) {
            username =player.username
        }
    })
    return username
}