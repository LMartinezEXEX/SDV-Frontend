import React from 'react'
import {connect} from 'react-redux'
import '../../assets/css/game.css'


const ChargesTable = (props) => {
    const {actualMinister, actualDirector} = props
    // const players = ['Harry54', 'Hermione21', 'Hagrid666', 'Draco55', 'Ron12']

    return (
        <div className="chargeTable">
            <ul>
                <li>Ministro: {actualMinister} </li>
                <li>Presidente:{actualDirector} </li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        actualMinister: state.game.actualMinister,
        actualDirector: state.game.actualDirector
    };
}

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(ChargesTable);
