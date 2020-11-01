import React, { 
    useState 
} from 'react'
import Input from '../Input'
//import { useHistory } from "react-router-dom";
import dropdown from './Dropdown'
import axios from 'axios'



const CreateGameForm = () => {
    const [gamename, setGamename] = useState('');
    const [email, setEmail] = useState('');
    const min_players_list= [5, 6, 7, 8, 9, 10]
    const max_players_list= [5, 6, 7, 8, 9, 10]
    const [minplayers, PlayersDropdownMin] = dropdown("Mínimo de Jugadores ", "", min_players_list);
    const [maxplayers, PlayersDropdownMax] = dropdown("Máximo de Jugadores ", "", max_players_list);
    //const history = useHistory();
    //history.push("/pregame", { from: "Lobby" })

    function handleChange(name, value) {
        if (name === 'gamename') {
            setGamename(value)
        } 
    }

    const handleSubmit = async(event) => {
        const result = await axios("http://127.0.0.1:8000/game/create/", {
        method: 'POST',
        data: JSON.stringify({
            email: 'user@example.com',
            name: gamename,
            min_players: 5,
            max_players: 5
        }),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then(response => {
            return response
        }).catch(error => {
        return error
        });
       
        alert(JSON.stringify(result))
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
                            required: 'true',
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

export default CreateGameForm;