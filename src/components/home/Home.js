import React from 'react'
import Title from "../Title"
import SignUp from "./SignUp"
import LogIn from "./LogIn"
import "../../assets/css/buttons.css"
import "../../assets/css/LoginForm.css"

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

export default Home

