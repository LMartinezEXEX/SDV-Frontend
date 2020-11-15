import React from 'react'
import {connect} from 'react-redux'
import '../../assets/css/game.css'


const ChargesTable = (props) => {
    const {candidateMinister, candidateDirector,playersInfo, lumosVotes } = props  //VER QUÉ HACER CON lumosVotes
    
    // const voteResult = () => {
    //     axios.put('http://127.0.0.1:8000/game/'+gameId+'/result')
    //     .then(res =>{
        // lumosVotes = res.data.voted_lumos
    //     })
    // }

    return (
        <div className="chargeTable">
            <ul>
                
            </ul>
        </div>
    )
}

/*
    lumosVotes te devuelve el id de los que votan Lumos  ----- player_id votaron que si

    playersInfo = 
    [{"player_id":1,"username":"aguschapuis","loyalty":"Death Eater"}, 
    {"player_id":2,"username":"lala1","loyalty":"Fenix Order"},
    {"player_id":3,"username":"lala2","loyalty":"Fenix Order"},
    {"player_id":4,"username":"lala3","loyalty":"Death Eater"},
    {"player_id":5,"username":"lala4","loyalty":"Death Eater"}]

    username | qué votó | si es Ministro o DIrector

    votedLumosInfo = playersInfo.filter(votedLumos.includes(playersInfo.player_id))
    votedNoxInfo = playersInfo.filter(!votedLumos.includes(playersInfo.player_id))

    votationList = []
    for(player in playersInfo) {
        entry = {}
        if (votedLumos.includes(player.player_id)) {
            entry = {username: player.username, vote: "lumos", charge: null}
        }
        if (player.player_id == candidateMinister) {
            entry = {...entry, charge: Minister}
        }
        if (player.player_id == candidateDirector) {
            entry = {...entry, charge: Director}
        }
        votationList.push(entry) 
    }
    -----------------------------
    votationList = playersInfo.map(player => Object.assign({}, {username: player.username,
                                             vote: vote(player), charge: charge(player)}))

    const vote = (player) => {
        if(lumosVotes.includes(player.player_id)) {
            return "Lumos"
        } else {
            return "Nox"
        }
    }

    const charge = (player) => {
        if (player.player_id == candidateMinister) {
            return "Ministro"
        } else if (player.player_id == candidateDirector) {
            return "Director"
        } else {
            return ""
        }
    }
*/
const mapStateToProps = (state) => {
    return {
        candidateMinister: state.game.candidateMinister,
        candidateDirector: state.game.candidateDirector,
        playersInfo: state.game.playersInfo
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChargesTable);

