import { createStore } from "redux";
import { USER, userInitialState } from "./reducers/user";
import { GAME, gameInitialState } from "./reducers/game";
import rootReducer from "./reducers";

/* Save states values */
const saveUser = (userState) => {
    localStorage.setItem(USER, (JSON.stringify(userState)?JSON.stringify(userState):{}))
}

const saveGame = (gameState) => {
    localStorage.setItem(GAME, (JSON.stringify(gameState)?JSON.stringify(gameState):{}))
}

/* Load states values */
const loadUser = () => {
    return (localStorage.getItem(USER) ? JSON.parse(localStorage.getItem(USER)) : {})
}

const loadGame = () => {
    return (localStorage.getItem(GAME) ? JSON.parse(localStorage.getItem(GAME)) : {})
}

/* Default store */
const initialData = () => {
    var user = loadUser()
    var game = loadGame()
    if (Object.keys(user).length === 0 && user.constructor === Object) {
        saveUser(userInitialState)
        user = loadUser()
    }
    if (Object.keys(game).length === 0 && game.constructor === Object) {
        saveGame(gameInitialState)
        game = loadGame()
    }
    return {
        user: user,
        game: game
    }
}

const store = createStore(rootReducer, initialData());

/* Listeners */
store.subscribe(
    function () {
        saveUser(store.getState().user)
        saveGame(store.getState().game)
    }
)

/* Export */
export default store;