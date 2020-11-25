export const getUsernameFromList = (playersInfo, playerId) => {
    let username = "" 
    playersInfo.forEach(player => {
        if (player.player_id === playerId) {
            username = player.username
        }
    })
    return username
}

export const isPlayerAliveFromList = (playersInfo, playerId) => {
    for (var i = 0; i < playersInfo.length; i++) {
        if (playersInfo[i].player_id === playerId) {
            return playersInfo[i]["is alive"]
        }
    } 
}