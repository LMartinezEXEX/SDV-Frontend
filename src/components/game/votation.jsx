import React from 'react'
import '../../assets/css/votation.css'

function Votation() {
    return (
        <div>
            <h3>Candidatos</h3>
            <ul>
                <li>Ministro: -</li>
                <li>Presidente: -</li>
            </ul>
            <button className="votationButton" onClick={() => {alert("Lumus")}}>
                <i class="far fa-thumbs-up fa-3x"></i></button>
            <button className="votationButton" onClick={() => {alert("Nox")}}>
                <i class="far fa-thumbs-down fa-3x"></i></button>
        </div>
    )
}

export default Votation
