import React from 'react'
import '../../assets/css/gameInformation.css'

// array to simulate the real player of the game 
const provisionalPlayers = [{name:"Jugador 1",online:true}, {name:"Jugador 2",online:true},
                            {name:"Jugador 3",online:false}, {name:"Jugador 4",online:true},
                            {name:"Jugador 5",online:true}]


/*function to paint from a color to the players
depends his state (online) */
const statePlayer = (player) =>{
    if(player.online){
        return (<li className="playerOnline">{player.name}</li>)
    } else {
        return (<li className="playerOffline">{player.name}</li>)
    }
}

function GameInfomation() {
    return (
        <div>
            <h3>Jugadores:</h3>
            <ul>
                {provisionalPlayers.map((player) => 
                    <li>{statePlayer(player)}</li>
                    )}
            </ul>
        </div>
    )
}

export default GameInfomation
