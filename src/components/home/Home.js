import React from 'react'
import Title from "../Title";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const Home = () => {
    return (
        <div>
           < Title />
           <div className="btn-group">
                < SignUp />
                < LogIn />
           </div>
        </div>
    );
}

export default Home;

