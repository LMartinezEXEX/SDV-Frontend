import { createStore } from "redux";
import { USER, userInitialState } from "./reducers/user";
import rootReducer from "./reducers";

/* Save states values */
const saveUser = (userState) => {
    localStorage.setItem(USER, (JSON.stringify(userState)?JSON.stringify(userState):{}))
}


/* Load states values */
const loadUser = () => {
    return (localStorage.getItem(USER) ? JSON.parse(localStorage.getItem(USER)) : {})
}

/* Default store */
const initialData = () => {
    var user = loadUser()
    if (Object.keys(user).length === 0 && user.constructor === Object) {
        saveUser(userInitialState)
        user = loadUser()
    }
    return {
        user: user
    }
}

const store = createStore(rootReducer, initialData());

/* Listeners */
store.subscribe(
    function () {
        saveUser(store.getState().user)
    }
)

/* Export */
export default store;