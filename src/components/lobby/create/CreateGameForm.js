import React, { useState } from 'react'
import { connect } from 'react-redux';
import Input from '../../Input'
import dropdown from './Dropdown'
import axios from 'axios';

const CreateGameForm = (props) => {
    const { callbackSubmit, email } = props
    const [gameName, setGameName] = useState('');
    const min_players_list= [5, 6, 7, 8, 9, 10]
    const max_players_list= [5, 6, 7, 8, 9, 10]
    const [minPlayers, PlayersDropdownMin] = dropdown("Mínimo de Jugadores ", "", min_players_list);
    const [maxPlayers, PlayersDropdownMax] = dropdown("Máximo de Jugadores ", "", max_players_list);

    function handleChange(name, value) {
        if (name === 'gamename') {
            setGameName(value)
        } 
    }

    /* Verdadero handleSubmit */
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const create_game_url = "http://127.0.0.1:8000/game/create/"
        await axios(create_game_url, {
            method: 'POST',
            data: JSON.stringify({
                email: email,
                name: gameName,
                min_players: minPlayers,
                max_players: maxPlayers
            }),
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 201) {
                callbackSubmit(response.data.Game_Id, response.data.Player_Id, minPlayers, maxPlayers)
            }
        }).catch(error => {
            if (error.response) {
                alert(JSON.stringify(error.response.data));
                console.log("Error (response)", error.response.status);
                console.log("Error (response)", error.response.headers);
                console.log("Error (response)", error.response.data);
            } else if (error.request) {
                alert(JSON.stringify(error.request));
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            alert(error)
        });
    }

    return (
        <div>
            <form className='create-game-container' onSubmit={handleSubmit}>
                <div> 
                    <label>
                        <Input attribute={{
                            id: 'gamename',
                            name: 'gamename',
                            type: 'text',
                            required: 'required',
                            placeholder: 'Nombre del juego'
                        }}
                            handleChange={handleChange}
                        />
                    </label>
                </div>
              
                    <PlayersDropdownMin/>
                    <PlayersDropdownMax/>
              
                <input type="submit" name="createGame"  className="app-btn small-btn" value="Aceptar" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    email: state.authorization.email,
  };
}

export default connect(mapStateToProps)(CreateGameForm);