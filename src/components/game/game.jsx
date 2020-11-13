import React from 'react'
import axios from 'axios'
import '../../assets/css/game.css'
import MortifagoBoard from './mortifagoBoard';
import OrderBoard from './orderBoard';
import Envelope from './Envelope'
import PopUp from './PopUp'
import { updateGameState, enableSpell} from "../../redux/actions";
import { connect } from 'react-redux';
import useInterval from '../../useInterval'
import Drawer from '@material-ui/core/Drawer';
import SpellsList from './SpellsList'

const Game= (props) => {
    const {actualMinister, gameId, actualDirector, finished,
            fenix_promulgations, death_eater_promulgations, updateGameState,
            playerId, enabledSpell, enableSpell,spell, amountPlayers, playerRole} = props
    
    const changeMinister = async () => {
        await axios.put("http://127.0.0.1:8000/game/"+gameId+"/select_MM")
        .then(res => {
        })
    }
    
    const getGameState = async() => {
        await axios.get("http://127.0.0.1:8000/game/"+gameId+"/check_game", { 
        method:'GET',
        headers: {
            'accept': 'application/json',
        }}).then(res => {
            var data = res.data
            if(death_eater_promulgations === 6) 
                {alert("GANARON LOS MORTIFAGOS")}
            else if( fenix_promulgations === 5)
                {alert("GANO LA ORDEN DEL FENIX")}
            updateGameState({
                actualMinister: data["current minister id"],
                actualDirector: data["current director id"],
                finished: data["finished"],
                fenix_promulgations: data["fenix promulgations"],
                death_eater_promulgations: data["death eater promulgations"]})
            })
    }

    const spellsAvaliable = async() => {
        const spellsAvaliable_url = "http://127.0.0.1:8000/game/"
        await axios.get(spellsAvaliable_url + gameId + '/spell'
        ).then(res => {
            if(res.data.Spell != "" && playerId === actualMinister){
                enableSpell({enabledSpell:true, spell:res.data.Spell})
            }
        })
    }
 
    useInterval(async () => {
        console.log("Checking...")
        await spellsAvaliable()
        await getGameState()
    }, 2000)


    return(
        <div>
            <Envelope playerRole={playerRole}/>
            <div className="gameView">
                <div className="gameBox">
                    <div className="gameSection">
                        <MortifagoBoard 
                            amountPlayers={amountPlayers}
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
                <Drawer className="Drawer" anchor='bottom' open={enabledSpell} 
                    onClose={()=>{enableSpell({enabledSpell:false}); changeMinister()}}>
                        <SpellsList spell={spell}/>
                </Drawer>
            </div>    
    </div>);
}

const mapStateToProps = (state) => {
    return {
        actualMinister: state.game.actualMinister,
        playerId:state.game.playerId,
        playerRole: state.game.playerRole,
        gameId: state.game.gameId,
        actualDirector: state.game.actualDirector,
        finished: state.game.finished,
        fenix_promulgations: state.game.fenix_promulgations,
        death_eater_promulgations: state.game.death_eater_promulgations,
        enabledSpell: state.game.enabledSpell,
        spell: state.game.spell,
        amountPlayers: state.game.amountPlayers
    };
}

const mapDispatchToProps = {
    updateGameState,
    enableSpell
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

