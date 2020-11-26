import React from "react";
import Lottie from "react-lottie";
import '../../assets/css/App.css'
import magicMinistry from '../../assets/images/magicMinistry.png'


const ElectionCounter = ({electionCount}) => {
    switch(electionCount){
        case 1:
            return (
                <div>
                   <img className='ministry-token-solid' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                   <img className='ministry-token-transparent' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                   <img className='ministry-token-transparent' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                </div>
            );
        case 2:
            return (
                <div>
                   <img className='ministry-token-solid' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                   <img className='ministry-token-solid' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                   <img className='ministry-token-transparent' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                </div>
            );
        default:
            return (
                <div>
                   <img className='ministry-token-transparent' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                   <img className='ministry-token-transparent' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                   <img className='ministry-token-transparent' src={magicMinistry} alt="Magic Ministry Token" width="30" height="30"/>
                </div>
            );
    }
}


export default ElectionCounter;
