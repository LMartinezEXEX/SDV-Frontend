import React, { useState} from 'react'
import axios from 'axios'
import '../../assets/css/game.css'
import MortifagoBoard from './mortifagoBoard';
import OrderBoard from './orderBoard';
import PopUp from './PopUp'
import { useParams } from 'react-router-dom';
import { updateMinister, updateGameState } from "../../redux/actions";
import { connect } from 'react-redux';
import useInterval from '../../useInterval'

const Game= (props) => {
    const {actualMinister, gameId, actualDirector, finished,
            fenix_promulgations, death_eater_promulgations, updateGameState} = props

    const getGameState = async() => {
        await axios.get("http://127.0.0.1:8000/game/"+gameId+"/check_game", { 
        method:'GET',
        headers: {
            'accept': 'application/json',
        }}).then(res => {
            var data = res.data
            // alert(JSON.stringify(data))
            updateGameState({
                actualMinister: data["current minister id"],
                actualDirector: data["current director id"],
                finished: data["finished"],
                fenix_promulgations: data["fenix promulgations"],
                death_eater_promulgations: data["death eater promulgations"]})
            })
    }

    useInterval(async () => {
        console.log("Checking...")
        await getGameState()
    }, 2000)


    return(
    <div className="gameView">
        <div className="gameBox">
            <div className="gameSection">
                <MortifagoBoard 
                    death_eater_promulgations= {death_eater_promulgations}/>
            </div>
            <div className="gameSection">
                <div className="buttonSection">
                    <div><PopUp type="Cargos"/></div>
                    <div><PopUp type="Votar"/></div>
                    <div><PopUp type="Cartas"/></div>
                </div>
            </div>
            <div className="gameSection">
                <OrderBoard
                    fenix_promulgations= {fenix_promulgations}/>
            </div>
        </div>
    </div>);
}

const mapStateToProps = (state) => {
    return {
        actualMinister: state.game.actualMinister,
        gameId: state.game.gameId,
        actualDirector: state.game.actualDirector,
        finished: state.game.finished,
        fenix_promulgations: state.game.fenix_promulgations,
        death_eater_promulgations: state.game.death_eater_promulgations,
    };
}

const mapDispatchToProps = {
    updateGameState
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

