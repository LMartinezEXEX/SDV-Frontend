import React from 'react'
import Title from "../Title";
import CreateGame from './CreateGame'
import JoinGame from './JoinGame'



const Home = () => {
    return (
        <div>
           < Title />
           <div className="btn-group">
                < CreateGame />
                < JoinGame />
           </div>
        </div>
    );
}

export default Home;

