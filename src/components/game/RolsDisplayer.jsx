import React from 'react'
import {connect} from 'react-redux'
import {MinisterLogo, DirectorLogo} from './ChargesLogos'

const RolsDisplayer = (props) => {
    const {playersInfo, playerId, gameId,
        actualMinister, actualDirector, playerRole,
        amountPlayers} = props

    const charge = (player) => {
        if (player.player_id == actualMinister) {
            return <MinisterLogo className="ChargeLogo"/>
        } else if (player.player_id == actualDirector) {
            return <DirectorLogo className="ChargeLogo"/>
        } else {
            return ""
        }
    }

    const displayer = () => {
        if(playerRole === "Death Eater" || (playerRole === "Voldemort" && amountPlayers<=6)){
            const list = playersInfo.map(player=> {  
                if(player.loyalty === "Death Eater"){
                    return(
                        <li>
                            <p className="usernameDeath">{player.username}</p>{charge(player)}
                        </li>)
                } else{
                    return(
                        <li>
                            <p className="usernameFenix">{player.username}</p>{charge(player)}
                        </li>)
                }
                    
                })
            return list
        } else if(playerRole === "Voldemort" && amountPlayers>6){
            alert("inside")
            const list = playersInfo.map(player=> {
                return(
                    <li>
                        <p className="usernameFenix">{player.username}</p>{charge(player)}
                    </li>)})
            return list
        }
        
        
        
        else{
            const list = playersInfo.map(player=> 
                        <li>
                            <p className="usernameFenix">{player.username}</p>{charge(player)}
                        </li>)
            return list
        }
    }

    return (
        <div className= "rolsDisplayer">
            <ul>
                {displayer()}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        amountPlayers: state.game.amountPlayers,
        playerRole: state.game.playerRole,
        playersInfo: state.game.playersInfo,
        playerId: state.game.playerId,
        gameId: state.game.gameId,
        actualMinister: state.game.actualMinister,
        actualDirector: state.game.actualDirector
    };
}

export default connect(mapStateToProps, null)(RolsDisplayer);

