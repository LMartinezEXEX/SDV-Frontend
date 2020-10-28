import React, {useState} from 'react'
import '../../assets/css/game.css'
import axios from 'axios';


const ChargesTable = () => {
    const [actualMinister, setNextMinister] = useState(0)
    const setMinistro = async () => {
        await axios.put("http://127.0.0.1:8000/game/1/select_MM", {
        method:'PUT',
        headers: {
            'accept': 'application/json',
        }}).then(res => {
            setNextMinister(res.data.candidate_minister_id)
        })
    }

    return (
        <div className="chargeTable">
            <ul>
                <button onClick={setMinistro}>Elegir ministro</button>
                <li>Ministro: {actualMinister} </li>
                <li>Presidente: {"-"} </li>
            </ul>
        </div>
    )
}

export default ChargesTable

// {"data":{"candidate_minister_id":1},"status":200,"statusText":"OK",