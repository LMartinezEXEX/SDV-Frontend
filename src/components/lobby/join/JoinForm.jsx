import React, { useState } from 'react'
import Input from '../../Input'
import { useHistory } from "react-router-dom";
import axios from 'axios';

const JoinForm = () => {
    const [gameId, setGameId] = useState(0);
    const [email, setEmail] = useState('');
    const history = useHistory();

    function handleChange(name, value) {
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'gameId') {
            setGameId(value)
        }
    }


    const handleSubmit = async (event) => {
        let game = { gameId, email }
        if (game) {
            console.log('game', game);
        }
        event.preventDefault();

        await axios.put('http://127.0.0.1:8000/game/join/'+gameId, {
            email: email
        }).then(response => {
            return response
        }).catch(error => {
            return error
        });
    }

    
    return (
        <div>
            <form className='join-container' onSubmit={handleSubmit}>
                <div> 
                    <label>
                        Email:
                        <Input attribute={{
                            id: 'email',
                            name: 'email',
                            type: 'email',
                            required: 'true',
                            placeholder: 'Ingrese su email'
                        }}
                            handleChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        ID Partida:
                        <Input attribute={{
                            id: 'gameId',
                            name: 'gameId',
                            type: 'number',
                            required: 'true',
                            placeholder: 'Ingrese el ID de la partida'
                        }}
                            handleChange={handleChange}
                        />
                    </label>
                </div>

                <input type="submit" onClick={() => history.push("/pregame/"+1, 
                    { from: "Lobby" })} name="createGame"  className="app-btn small-btn" value="¡Únete!" />
            </form>
        </div>
    )
}

export default JoinForm;
