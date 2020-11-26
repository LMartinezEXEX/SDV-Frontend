import React from 'react';
import { connect } from 'react-redux';
import '../../assets/css/game.css';

const ChargesTable = (props) => {
    const { playersInfo, lumosVotes } = props  
        
    const vote = (player) => {
        if (player["is alive"]) {
            if (lumosVotes.length > 0 && lumosVotes.includes(player.player_id)) {
                return "Lumos"
            }
            return "Nox"
        }
        return ""
    }

    const maxUsernameLength = Math.max(...playersInfo.map(player => player.username.length))
    const votationList = playersInfo.map(player => 
        Object.assign({}, { username: player.username, vote: vote(player), "is alive": player["is alive"] })
    )

    return (
        <div className="chargeTable">
            <ul>
                {votationList.map(player => {
                    return (
                    <li key={player.username}>
                        {(player["is alive"])
                        ?(
                            <pre>
                                {player.username + " ".repeat(maxUsernameLength - player.username.length + 1) + "    " + player.vote}
                            </pre>
                        ):(
                            <pre className="deathPlayer">
                                {player.username}
                            </pre>
                        )
                        }
                    </li>)
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        playersInfo: state.game.playersInfo,
        lumosVotes: state.game.lumosVotes
    };
}


export default connect(mapStateToProps)(ChargesTable);

