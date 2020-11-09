import { combineReducers } from "redux";
import authorization from "./authorization";
import game from "./game";

export default combineReducers({ authorization, game });