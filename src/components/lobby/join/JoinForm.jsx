import React from 'react'
import axios from 'axios';
import { joinGame } from "../../../redux/actions";
import { connect } from "react-redux";

const JoinForm = (props) => {
    const { email, joinGame, gameList } = props
  

    const handleClick = async (gameId) => {        
        const result = await axios.put('http://127.0.0.1:8000/game/' + gameId +'/join', {
            email: email
        }).then(response => {
            return response.data
        }).catch(error => {
            return error
        });
        if (result.Player_Id) {
            joinGame({ gameId: gameId, playerId: result.Player_Id })
        }
    }

    
    if (gameList.length === 0) {
        return (
            <div>
                <li> NO HAY PARTIDAS ACCESIBLES </li>
            </div>
        )
    } else {
        return (
            <div>
                <ul className="game-list">
                    {gameList.map(game =>
                        <li key={game.id}><button className="buttonTaker" onClick={() =>
                        handleClick(game.id)}> {game.name} </button></li>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email
    };
}
const mapDispatchToProps = {
    joinGame
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinForm);
