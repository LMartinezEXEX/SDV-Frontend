import React, { useState } from 'react'
import { connect } from 'react-redux'
import Modal from '../../Modal'
import axios from 'axios'
import JoinForm from './JoinForm'

const JoinGame= () => {
    const [isOpen, setIsOpen] = useState(false)
    const [games, setGames] = useState([])

    const getAvailableGames = async () => {
    
        await axios.get('http://127.0.0.1:8000/game/list_games', { 
        method:'GET',
        headers: {
            'accept': 'application/json',
        }}).then(response => {
            var data = response.data
            // Descartamos las partidas que alcanzaron el máximo de jugadores
            data = data.filter(game => game.players < game.max_players)
            setGames(data)
        })        
    }

    return (
        <div >
            <button className= "app-btn " onClick={() =>
            {getAvailableGames(); setIsOpen(true)}}> Unirse a Partida </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <JoinForm gameList={games} />
            </Modal>
        </div>
    )
}

export default JoinGame

