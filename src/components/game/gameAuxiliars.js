export const playersUsernamesListExcluding = (playersInfo, playerId) => {
    let players_list = []
    playersInfo.map(player => {
        if (player["is alive"] && player.player_id !== playerId) {
            players_list.push(player.username)
        }
    })
    return players_list
}

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

export const equalLists = (lhList, rhList) => {
    return JSON.stringify(lhList) === JSON.stringify(rhList)
}