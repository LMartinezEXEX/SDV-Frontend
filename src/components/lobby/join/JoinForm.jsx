import React, { useState } from 'react'
import Input from '../../Input'
import axios from 'axios';
import { joinGame } from "../../../redux/actions";
import { connect } from "react-redux";

const JoinForm = (props) => {
    const { email, joinGame }= props
    const [gameId, setGameId] = useState(0);

    function handleChange(name, value) {
        if (name === 'gameId') {
            setGameId(value)
        }
    }

    const handleSubmit = async (event) => {
        let game = { gameId, email }
        if (game) {
            console.log('game', game);
        }
        event.preventDefault();

        const result = await axios.put('http://127.0.0.1:8000/game/join/' + gameId, {
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

    
    return (
        <div>
            <form className='join-container' onSubmit={handleSubmit}>
                <div>
                    <label>
                        <Input attribute={{
                            id: 'gameId',
                            name: 'gameId',
                            type: 'number',
                            required: 'required',
                            placeholder: 'ID de la partida'
                        }}
                            handleChange={handleChange}
                        />
                    </label>
                </div>

                <input type="submit"  name="createGame"  className="app-btn small-btn" value="Unirse" />
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    joinGame
}

export default connect(
    null,
    mapDispatchToProps
)(JoinForm);