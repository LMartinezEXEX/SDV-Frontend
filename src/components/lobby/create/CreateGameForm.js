import React, { 
    useState 
} from 'react'
import Input from '../../Input'
import { useHistory } from "react-router-dom";
import dropdown from './Dropdown'

const CreateGameForm = () => {
    // const [gamenamme, setGamename] = useState('');
    const min_players_list= [6, 7, 8, 9, 10]
    const max_players_list= [6, 7, 8, 9, 10]
    const [minplayers, PlayersDropdownMin] = dropdown("Mínimo de Jugadores ", "", min_players_list);
    const [maxplayers, PlayersDropdownMax] = dropdown("Máximo de Jugadores ", "", max_players_list);
    const history = useHistory();
    

    function handleChange(name, value) {
        if (name === 'gamename') {
            // setGamename(value)
        } 
    }

    const handleSubmit = async(event) => {
      
        event.preventDefault(); 
        
        
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
              
                <input type="submit" onClick={() => history.push("/pregame/"+1, 
                    { from: "Lobby" })} name="createGame"  className="app-btn small-btn" value="Aceptar" />
           
            </form>

        </div>
    )
}

export default CreateGameForm;