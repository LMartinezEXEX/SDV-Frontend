import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    useHistory
} from 'react-router-dom'
import { connect } from "react-redux";
import Home from './components/home/Home'
import Lobby from './components/lobby/Lobby'
import PreGame from './components/pregame/Pregame'
import Game from './components/game/game'
import PageNotFound from './components/PageNotFound'

const Routes = (props) => {
    const { isAuth, type, gameId, init} = props;
    const history = useHistory()

    if (type === "guest" && !isAuth) {
        // alert("As guest!")
        return (
            <Router history={history}>
            <Redirect to="/" />
            <Route exact path="/" component={Home} />
            </Router>
        );
    } else if (type === "private" && isAuth) {
        if (gameId && !init) {
            return (
            <Router history={history}>
                <Redirect from="/lobby" to="/pregame" />
                <Route path="/pregame" component={PreGame} />
            </Router>)
        } else if (gameId && init) {
            return (
                <Router history={history}>
                <Redirect from="/pregame" to={"/game/" + gameId} />
                <Route path={"/game/" + gameId} component={Game} />
                </Router>
            )
        } else {
            alert("Private dashboard!")
            return (
            <Router history={history}>
                <Redirect from="/" to="/lobby" />
                <Route path="/lobby" component={Lobby} />
            </Router>
            );
        }
    }
    return (
        <Router history={history}>
            <Route component={PageNotFound}/>
        </Router>
    );
}
   
const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth,
        type: state.user.type,
        gameId: state.game.gameId,
        init: state.game.init
    };
}

export default connect(mapStateToProps)(Routes);