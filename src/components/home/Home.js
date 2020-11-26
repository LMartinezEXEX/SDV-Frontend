import React from 'react'
import Title from "../Title"
import SignUp from "./register/SignUp"
import LogIn from "./login/LogIn"
import "../../assets/css/buttons.css"
import "../../assets/css/form.css"

const Home = () => {
    return (
        <div>
           < Title name="Secret Voldemort" />
           <div className="btn-group">
                < SignUp />
                < LogIn />
           </div>
        </div>
    );
}

export default Home

