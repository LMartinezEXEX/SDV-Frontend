import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Input from '../../Input';
import dropdown from './Dropdown';
import { setMessageTopCenter, setMessageTopCenterOpen } from '../../../redux/actions';
import { SERVER_URL, GAME_PATH, CREATE } from '../../constantsEndpoints';
import errorTranslate from '../../errorTranslate';

const CreateGameForm = (props) => {
    const { callbackSubmit, email, setMessageTopCenter, setMessageTopCenterOpen } = props
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        await axios(
            SERVER_URL + GAME_PATH + CREATE, {
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
            if (error.response && error.response.data["detail"] !== undefined) {
                setMessageTopCenter({ 
                    messageSeverity: "warning", 
                    messageTopCenter: errorTranslate(error.response.data["detail"]) 
                })
                setMessageTopCenterOpen({ messageTopCenterOpen: true })
            } else {
                console.log("Error", error.message);
            }
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
    email: state.user.email,
  };
}

const mapDispatchToProps = { 
    setMessageTopCenter, setMessageTopCenterOpen 
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CreateGameForm);