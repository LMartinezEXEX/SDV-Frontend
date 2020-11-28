import { createStore } from "redux";
import { USER, userInitialState } from "./reducers/user";
import { GAME, gameInitialState } from "./reducers/game";
import { NOTIFICATIONS, notificationsInitialState } from "./reducers/notifications";
import rootReducer from "./reducers";

/* Save states values */
const saveState = (state, storeType) => {
    try {
        const serializedState = JSON.stringify(state)
        switch (storeType) {
            case USER: {
                sessionStorage.setItem(USER, serializedState)
                break
            }
            case GAME: {
                sessionStorage.setItem(GAME, serializedState)
                break
            }
            case NOTIFICATIONS: {
                sessionStorage.setItem(NOTIFICATIONS, serializedState)
                break
            }
            default:
                break
        }
    } catch (error) {
        // Ignore
    }
}

/* Load states values */
const loadState = (storeType) => {
    try {
        var serializedState = null
        switch (storeType) {
            case USER: {
                serializedState = sessionStorage.getItem(USER)
                if (!serializedState) {
                    return undefined
                }
                return JSON.parse(serializedState)
            }
            case GAME: {
                serializedState = sessionStorage.getItem(GAME)
                if (!serializedState) {
                    return undefined
                }
                return JSON.parse(serializedState)
            }
            case NOTIFICATIONS: {
                serializedState = sessionStorage.getItem(NOTIFICATIONS)
                if (!serializedState) {
                    return undefined
                }
                return JSON.parse(serializedState)
            }
            default:
                return undefined
        }
    } catch (error) {
        return undefined
    }
}

/* Default store */
const initialData = () => {
    var user = loadState(USER)
    var game = loadState(GAME) 
    var notifications = loadState(NOTIFICATIONS)
    if (user === null || user === undefined) {
        saveState(userInitialState, USER)
        user = loadState(USER)
    }
    if (game === null || game === undefined) {
        saveState(gameInitialState, GAME)
        game = loadState(GAME)
    }
    if (notifications === null || notifications === undefined) {
        saveState(notificationsInitialState, NOTIFICATIONS)
        notifications = loadState(NOTIFICATIONS)
    }
    
    return {
        user: user,
        game: game,
        notifications: notifications
    }
}

const store = createStore(rootReducer, initialData());

/* Listeners */
store.subscribe(
    function () {
        saveState(store.getState().user, USER)
        saveState(store.getState().game, GAME)
        saveState(store.getState().notifications, NOTIFICATIONS)
    }
)

/* Export */
export default store;