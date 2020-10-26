import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from 'react-router-dom'
import Home from './components/home/Home'
import PageNotFound from './components/PageNotFound'
import Game from './components/game/game'
const Routes = () => {
    const history = useHistory()

    return (
        <Router history={history}>
            <Switch>
                <Route exact path = '/' component={Home} />
                <Route exact path = '/game' component={Game} />
                <Route component={PageNotFound}/>
                    
            </Switch>
        </Router>
    )
}
   

export default Routes;